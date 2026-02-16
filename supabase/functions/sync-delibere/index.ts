import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface DeliberaEntry {
  numero: string;
  titolo: string;
  data: string;
  url: string;
  settori: string[];
}

function parseListingMarkdown(markdown: string): DeliberaEntry[] {
  const entries: DeliberaEntry[] = [];
  
  // Pattern: find delibera blocks with numero, date, title, and URL
  // The markdown has patterns like:
  // **20/2026/R/com**\\\n\\\nTitolo...](https://www.arera.it/atti-e-provvedimenti/dettaglio/26/20-26)
  const regex = /\*\*(\d+\/\d{4}\/R\/\w+)\*\*\\\\\s*\\\\?\s*\n\\\\\s*\\\\?\s*\n(.*?)\]\((https:\/\/www\.arera\.it\/atti-e-provvedimenti\/dettaglio\/\d+\/[\w-]+)\)/gs;
  
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const numero = match[1];
    const titolo = match[2].trim();
    const url = match[3];
    
    entries.push({
      numero,
      titolo,
      data: '', // will be extracted from detail page
      url,
      settori: [],
    });
  }
  
  // Fallback: simpler pattern if the above doesn't match
  if (entries.length === 0) {
    // Try matching URLs and numeros separately
    const urlPattern = /\(https:\/\/www\.arera\.it\/atti-e-provvedimenti\/dettaglio\/(\d+)\/([\w-]+)\)/g;
    const numPattern = /\*\*(\d+\/\d{4}\/R\/\w+)\*\*/g;
    
    const urls: string[] = [];
    const numeros: string[] = [];
    
    let m;
    while ((m = urlPattern.exec(markdown)) !== null) {
      urls.push(`https://www.arera.it/atti-e-provvedimenti/dettaglio/${m[1]}/${m[2]}`);
    }
    while ((m = numPattern.exec(markdown)) !== null) {
      numeros.push(m[1]);
    }
    
    for (let i = 0; i < Math.min(urls.length, numeros.length); i++) {
      entries.push({
        numero: numeros[i],
        titolo: '',
        data: '',
        url: urls[i],
        settori: [],
      });
    }
  }
  
  return entries;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    const anno = body.anno || new Date().getFullYear();
    const settori = body.settori || '4'; // 4=elettricità

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const firecrawlKey = Deno.env.get('FIRECRAWL_API_KEY');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (!firecrawlKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'FIRECRAWL_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const listingUrl = `https://www.arera.it/atti-e-provvedimenti?anno=${anno}&numero=&tipologia=Delibera&keyword=&settore=${encodeURIComponent(settori)}&orderby=&orderbydir=&numelements=50`;
    
    console.log(`Fetching ARERA listing for ${anno}:`, listingUrl);

    // Step 1: Scrape the listing page
    const scrapeRes = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: listingUrl,
        formats: ['markdown'],
        onlyMainContent: true,
        waitFor: 3000,
      }),
    });

    const scrapeData = await scrapeRes.json();
    if (!scrapeRes.ok) {
      console.error('Firecrawl listing scrape error:', scrapeData);
      return new Response(
        JSON.stringify({ success: false, error: `Listing scrape failed: ${scrapeData.error}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const markdown = scrapeData.data?.markdown || scrapeData.markdown || '';
    console.log('Listing markdown length:', markdown.length);

    // Step 2: Parse the listing to extract delibere URLs
    const found = parseListingMarkdown(markdown);
    console.log(`Found ${found.length} delibere in listing`);

    if (found.length === 0) {
      // Log the markdown for debugging
      console.log('Markdown content (first 2000 chars):', markdown.substring(0, 2000));
      return new Response(
        JSON.stringify({ success: true, message: 'No delibere found in listing', processed: 0, found: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Step 3: Check which ones are already in DB
    const numeros = found.map(d => d.numero);
    const { data: existing } = await supabase
      .from('delibere')
      .select('numero')
      .in('numero', numeros);

    const existingNumeros = new Set((existing || []).map((d: any) => d.numero));
    const newDelibere = found.filter(d => !existingNumeros.has(d.numero));

    console.log(`${existingNumeros.size} already in DB, ${newDelibere.length} new to process`);

    // Step 4: Process each new delibera
    const results: { numero: string; success: boolean; error?: string }[] = [];

    for (const delibera of newDelibere) {
      try {
        console.log(`Processing ${delibera.numero} from ${delibera.url}`);
        
        const processRes = await fetch(`${supabaseUrl}/functions/v1/process-delibera`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: delibera.url }),
        });
        
        const processData = await processRes.json();
        
        if (processData.success) {
          results.push({ numero: delibera.numero, success: true });
          console.log(`✅ ${delibera.numero} processed successfully`);
        } else {
          results.push({ numero: delibera.numero, success: false, error: processData.error });
          console.error(`❌ ${delibera.numero} failed:`, processData.error);
        }

        // Small delay between requests to avoid rate limiting
        await new Promise(r => setTimeout(r, 2000));
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'Unknown error';
        results.push({ numero: delibera.numero, success: false, error: errMsg });
        console.error(`❌ ${delibera.numero} error:`, errMsg);
      }
    }

    const successCount = results.filter(r => r.success).length;
    console.log(`Sync complete: ${successCount}/${newDelibere.length} processed successfully`);

    return new Response(
      JSON.stringify({
        success: true,
        found: found.length,
        alreadyInDb: existingNumeros.size,
        processed: newDelibere.length,
        successful: successCount,
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error syncing delibere:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Failed to sync' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
