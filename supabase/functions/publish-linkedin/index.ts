import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function refreshAccessToken(
  refreshToken: string,
  clientId: string,
  clientSecret: string,
): Promise<{ access_token: string; expires_in: number; refresh_token?: string }> {
  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Token refresh failed: ${JSON.stringify(data)}`);
  return data;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LINKEDIN_CLIENT_ID = Deno.env.get("LINKEDIN_CLIENT_ID");
    if (!LINKEDIN_CLIENT_ID) throw new Error("LINKEDIN_CLIENT_ID not configured");

    const LINKEDIN_CLIENT_SECRET = Deno.env.get("LINKEDIN_CLIENT_SECRET");
    if (!LINKEDIN_CLIENT_SECRET) throw new Error("LINKEDIN_CLIENT_SECRET not configured");

    const LINKEDIN_ORGANIZATION_ID = Deno.env.get("LINKEDIN_ORGANIZATION_ID");
    if (!LINKEDIN_ORGANIZATION_ID) throw new Error("LINKEDIN_ORGANIZATION_ID not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get delibera ID from request
    const { deliberaId } = await req.json();
    if (!deliberaId) throw new Error("Missing deliberaId");

    // Fetch the delibera
    const { data: delibera, error: deliberaError } = await supabase
      .from("delibere")
      .select("*")
      .eq("id", deliberaId)
      .single();

    if (deliberaError || !delibera) {
      throw new Error(`Delibera not found: ${deliberaError?.message}`);
    }

    // Get LinkedIn token
    const { data: tokenRow, error: tokenError } = await supabase
      .from("linkedin_tokens")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (tokenError || !tokenRow) {
      throw new Error("LinkedIn non collegato. Effettua prima l'autorizzazione OAuth.");
    }

    let accessToken = tokenRow.access_token;

    // Refresh if expired
    if (new Date(tokenRow.expires_at) <= new Date()) {
      if (!tokenRow.refresh_token) {
        throw new Error("Token scaduto e nessun refresh token disponibile. Riautorizza LinkedIn.");
      }

      const refreshed = await refreshAccessToken(
        tokenRow.refresh_token,
        LINKEDIN_CLIENT_ID,
        LINKEDIN_CLIENT_SECRET,
      );

      accessToken = refreshed.access_token;
      const newExpiry = new Date(Date.now() + refreshed.expires_in * 1000).toISOString();

      await supabase
        .from("linkedin_tokens")
        .update({
          access_token: refreshed.access_token,
          refresh_token: refreshed.refresh_token || tokenRow.refresh_token,
          expires_at: newExpiry,
        })
        .eq("id", tokenRow.id);
    }

    // Build post content
    const title = `📋 ${delibera.numero} - ${delibera.titolo}`;
    const summary = delibera.riassunto_ai || "Nuova delibera ARERA pubblicata.";
    const link = delibera.link_originale || `https://delibero.lovable.app/delibere/${delibera.id}`;

    const commentary = `${title}\n\n${summary}\n\n🔗 Leggi di più: ${link}\n\n#ARERA #Energia #Delibere #Regolazione`;

    // Post to LinkedIn
    const postRes = await fetch("https://api.linkedin.com/rest/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "LinkedIn-Version": "202501",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        author: `urn:li:organization:${LINKEDIN_ORGANIZATION_ID}`,
        commentary,
        visibility: "PUBLIC",
        distribution: {
          feedDistribution: "MAIN_FEED",
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
        lifecycleState: "PUBLISHED",
      }),
    });

    if (!postRes.ok) {
      const errBody = await postRes.text();
      throw new Error(`LinkedIn post failed [${postRes.status}]: ${errBody}`);
    }

    // LinkedIn returns 201 with x-restli-id header
    const postId = postRes.headers.get("x-restli-id");
    await postRes.text(); // consume body

    console.log(`Published to LinkedIn: ${postId}`);

    return new Response(
      JSON.stringify({ success: true, linkedinPostId: postId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("LinkedIn publish error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
