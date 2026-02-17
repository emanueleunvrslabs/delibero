import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LINKEDIN_CLIENT_ID = Deno.env.get("LINKEDIN_CLIENT_ID");
    if (!LINKEDIN_CLIENT_ID) throw new Error("LINKEDIN_CLIENT_ID not configured");

    const LINKEDIN_CLIENT_SECRET = Deno.env.get("LINKEDIN_CLIENT_SECRET");
    if (!LINKEDIN_CLIENT_SECRET) throw new Error("LINKEDIN_CLIENT_SECRET not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const url = new URL(req.url);

    // If "action=authorize" → return the LinkedIn authorization URL
    if (url.searchParams.get("action") === "authorize") {
      // Verify service role authentication for authorize action
      const authHeader = req.headers.get("Authorization");
      const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (
        !authHeader?.startsWith("Bearer ") ||
        authHeader.replace("Bearer ", "") !== serviceKey
      ) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const redirectUri = `${SUPABASE_URL}/functions/v1/linkedin-auth`;
      const scope = "w_organization_social openid profile";
      const state = crypto.randomUUID();

      const authUrl =
        `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`;

      return new Response(JSON.stringify({ authUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // OAuth callback — exchange code for tokens
    const code = url.searchParams.get("code");
    if (!code) {
      return new Response("Missing authorization code", { status: 400, headers: corsHeaders });
    }

    const redirectUri = `${SUPABASE_URL}/functions/v1/linkedin-auth`;

    const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      console.error("LinkedIn token exchange failed:", tokenData);
      return new Response(`Token exchange failed: ${JSON.stringify(tokenData)}`, {
        status: 400,
        headers: corsHeaders,
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Delete old tokens
    await supabase.from("linkedin_tokens").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000).toISOString();
    const refreshExpiresAt = tokenData.refresh_token_expires_in
      ? new Date(Date.now() + tokenData.refresh_token_expires_in * 1000).toISOString()
      : null;

    const { error: insertError } = await supabase.from("linkedin_tokens").insert({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token || null,
      expires_at: expiresAt,
      refresh_token_expires_at: refreshExpiresAt,
    });

    if (insertError) {
      console.error("Error saving tokens:", insertError);
      return new Response(`Error saving tokens: ${insertError.message}`, {
        status: 500,
        headers: corsHeaders,
      });
    }

    // Redirect to success page
    return new Response(
      `<html><body><h1>✅ LinkedIn collegato con successo!</h1><p>Puoi chiudere questa finestra.</p></body></html>`,
      { status: 200, headers: { ...corsHeaders, "Content-Type": "text/html" } },
    );
  } catch (error) {
    console.error("LinkedIn auth error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
