import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Processing delibera from URL:', url);

    // Step 1: Scrape
    const scrapeRes = await fetch(`${supabaseUrl}/functions/v1/scrape-delibera`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    const scrapeData = await scrapeRes.json();

    if (!scrapeData.success) {
      return new Response(
        JSON.stringify({ success: false, error: `Scrape failed: ${scrapeData.error}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Scrape done, analyzing...');

    // Step 2: Analyze
    const analyzeRes = await fetch(`${supabaseUrl}/functions/v1/analyze-delibera`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: scrapeData.data.markdown,
        title: scrapeData.data.title,
      }),
    });
    const analyzeData = await analyzeRes.json();

    if (!analyzeData.success) {
      return new Response(
        JSON.stringify({ success: false, error: `Analysis failed: ${analyzeData.error}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const analysis = analyzeData.data;
    console.log('Analysis done, saving to DB...');

    // Step 3: Save to DB
    const { data: delibera, error: dbError } = await supabase
      .from('delibere')
      .upsert({
        numero: analysis.numero,
        data_pubblicazione: new Date().toISOString().split('T')[0],
        titolo: analysis.titolo || scrapeData.data.title,
        riassunto_ai: analysis.riassunto,
        punti_salienti: analysis.punti_salienti,
        settori: analysis.settori,
        link_originale: url,
        allegati: scrapeData.data.allegati,
        is_aggiornamento_tariffario: analysis.is_aggiornamento_tariffario || false,
      }, { onConflict: 'numero' })
      .select()
      .single();

    if (dbError) {
      console.error('DB error:', dbError);
      return new Response(
        JSON.stringify({ success: false, error: `DB save failed: ${dbError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Delibera saved:', delibera.id);

    return new Response(
      JSON.stringify({ success: true, data: delibera }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing delibera:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Failed to process' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
