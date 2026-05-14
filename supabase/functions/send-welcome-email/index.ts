const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  let payload: { email?: string; to?: string; name?: string } | null = null;
  try {
    payload = await req.json();
  } catch (_) {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const recipient = (payload?.to || payload?.email || "").trim();
  const name = (payload?.name || "there").trim();
  if (!recipient) {
    return new Response(JSON.stringify({ error: "email_required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const MAILTRAP_TOKEN = Deno.env.get("MAILTRAP_TOKEN") || "";
  const FROM_NAME = Deno.env.get("FROM_NAME") || "Sip & Bite";
  const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "no-reply@sipandbite.test";
  const REPLY_TO = Deno.env.get("REPLY_TO") || "";

  if (!MAILTRAP_TOKEN) {
    return new Response(
      JSON.stringify({ status: "skipped", reason: "mailtrap_not_configured" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const subject = "Welcome to Sip & Bite";
  const text = `Hi ${name},\n\nThanks for joining Sip & Bite! We're excited to have you.\n\nYou can now sign in anytime to manage your account and speed up checkout.\n\nCheers,\nSip & Bite`;
  const html = `<!DOCTYPE html><html><body style=\"font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif\"><div style=\"max-width:560px;margin:0 auto;padding:24px\"><h1 style=\"margin:0 0 12px;font-size:22px\">Welcome to Sip & Bite</h1><p style=\"margin:0 0 16px\">Hi ${name},</p><p style=\"margin:0 0 16px\">Thanks for joining <strong>Sip & Bite</strong>! We're excited to have you.</p><p style=\"margin:0 0 16px\">You can now sign in anytime to manage your account and speed up checkout.</p><p style=\"margin:24px 0 0;color:#64748b;font-size:12px\">Cheers,<br/>Sip & Bite</p></div></body></html>`;

  const body: Record<string, unknown> = {
    from: { email: FROM_EMAIL, name: FROM_NAME },
    to: [{ email: recipient, name }],
    subject,
    text,
    html,
  };
  if (REPLY_TO) {
    body.headers = { "Reply-To": REPLY_TO };
  }

  const resp = await fetch("https://sandbox.api.mailtrap.io/api/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MAILTRAP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const errText = await resp.text().catch(() => "");
    return new Response(
      JSON.stringify({ status: "error", code: resp.status, message: errText }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  return new Response(JSON.stringify({ status: "sent" }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
