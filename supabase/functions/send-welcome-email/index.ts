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
  const safeName = name
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
  if (!recipient) {
    return new Response(JSON.stringify({ error: "email_required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
  const FROM_NAME = Deno.env.get("FROM_NAME") || "Sip & Bite";
  const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "hello@sipandbite.site";
  const REPLY_TO = Deno.env.get("REPLY_TO") || "";

  if (!RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ status: "skipped", reason: "resend_not_configured" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const subject = "Welcome to Sip & Bite";
  const text = `Dear ${name},\n\nWelcome to Sip & Bite.\n\nIt is a pleasure to have you with us. From our grill in Achimota, each plate is cooked to order: chicken, sausage kebabs, and fries, finished while they are still hot.\n\nSign in whenever you return. Your name will be waiting, and the next order will take only a moment.\n\nWith care,\nSip & Bite\nAchimota, Accra`;
  const html = `<!DOCTYPE html><html><body style="margin:0;background:#E7F0EA"><div style="max-width:560px;margin:0 auto;padding:48px 28px;font-family:Georgia,'Times New Roman',serif;color:#0B1F1A"><p style="margin:0;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#C4892A">Achimota</p><h1 style="margin:16px 0 0;font-weight:500;font-size:36px;line-height:1.1">Welcome to Sip &amp; Bite.</h1><p style="margin:28px 0 0;font-size:17px;line-height:1.6">Dear ${safeName},</p><p style="margin:16px 0 0;font-size:17px;line-height:1.7">It is a pleasure to have you with us. From our grill in Achimota, each plate is cooked to order: chicken, sausage kebabs, and fries, finished while they are still hot.</p><p style="margin:16px 0 0;font-size:17px;line-height:1.7">Sign in whenever you return. Your name will be waiting, and the next order will take only a moment.</p><p style="margin:36px 0 0;font-size:17px;line-height:1.6">With care,<br/>Sip &amp; Bite</p></div></body></html>`;

  const from = FROM_EMAIL.includes("<") ? FROM_EMAIL : `${FROM_NAME} <${FROM_EMAIL}>`;
  const body: Record<string, unknown> = {
    from,
    to: [recipient],
    subject,
    text,
    html,
  };
  if (REPLY_TO) {
    body.reply_to = REPLY_TO;
  }

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
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
