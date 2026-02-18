import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function isValidE164(phone: string): boolean {
  return /^\+[1-9]\d{6,14}$/.test(phone);
}

async function hashOTP(otp: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(otp);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const wasenderKey = Deno.env.get('WASENDER_API_KEY');
    const supabase = createClient(supabaseUrl, serviceKey);

    if (!wasenderKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'WASENDER_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { action, phone_number, otp_code } = body;

    if (!phone_number || !isValidE164(phone_number)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Numero di telefono non valido. Usa il formato internazionale (es. +393331234567)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'send') {
      // Check if already verified
      const { data: existing } = await supabase
        .from('whatsapp_verified_users')
        .select('is_verified')
        .eq('phone_number', phone_number)
        .single();

      if (existing?.is_verified) {
        return new Response(
          JSON.stringify({ success: true, already_verified: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 min

      const hashedOtp = await hashOTP(otp);

      // Upsert hashed OTP
      const { error: upsertError } = await supabase
        .from('whatsapp_verified_users')
        .upsert({
          phone_number,
          otp_code: hashedOtp,
          otp_expires_at: expiresAt,
          is_verified: false,
        }, { onConflict: 'phone_number' });

      if (upsertError) {
        console.error('DB upsert error:', upsertError);
        return new Response(
          JSON.stringify({ success: false, error: 'Errore interno' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Send OTP via WaSender
      const wasenderRes = await fetch('https://www.wasenderapi.com/api/send-message', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${wasenderKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phone_number,
          text: `Il tuo codice di verifica Delibero è: ${otp}\n\nQuesto codice scade tra 10 minuti.`,
        }),
      });

      if (!wasenderRes.ok) {
        const errData = await wasenderRes.text();
        console.error('WaSender error:', errData);
        return new Response(
          JSON.stringify({ success: false, error: 'Errore nell\'invio del messaggio WhatsApp' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`OTP sent to ${phone_number}`);
      return new Response(
        JSON.stringify({ success: true, message: 'OTP inviato su WhatsApp' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else if (action === 'verify') {
      if (!otp_code || typeof otp_code !== 'string' || otp_code.length !== 6) {
        return new Response(
          JSON.stringify({ success: false, error: 'Codice OTP non valido' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data: user } = await supabase
        .from('whatsapp_verified_users')
        .select('*')
        .eq('phone_number', phone_number)
        .single();

      if (!user) {
        return new Response(
          JSON.stringify({ success: false, error: 'Numero non trovato. Richiedi un nuovo codice.' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (user.is_verified) {
        return new Response(
          JSON.stringify({ success: true, already_verified: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (new Date(user.otp_expires_at) < new Date()) {
        return new Response(
          JSON.stringify({ success: false, error: 'Codice scaduto. Richiedi un nuovo codice.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const hashedInputOtp = await hashOTP(otp_code);
      if (user.otp_code !== hashedInputOtp) {
        return new Response(
          JSON.stringify({ success: false, error: 'Codice errato' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Mark as verified
      await supabase
        .from('whatsapp_verified_users')
        .update({
          is_verified: true,
          verified_at: new Date().toISOString(),
          otp_code: null,
          otp_expires_at: null,
        })
        .eq('phone_number', phone_number);

      console.log(`Phone ${phone_number} verified successfully`);
      return new Response(
        JSON.stringify({ success: true, verified: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else if (action === 'check') {
      // Check if a phone number is already verified
      const { data: user } = await supabase
        .from('whatsapp_verified_users')
        .select('is_verified')
        .eq('phone_number', phone_number)
        .single();

      return new Response(
        JSON.stringify({ success: true, verified: user?.is_verified === true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else {
      return new Response(
        JSON.stringify({ success: false, error: 'Azione non valida. Usa: send, verify, check' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('WhatsApp OTP error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Errore interno' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
