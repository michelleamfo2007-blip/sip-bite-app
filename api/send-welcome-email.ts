type WelcomeBody = {
  email?: string;
  to?: string;
  name?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const payload = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) as WelcomeBody | undefined;
  const recipient = (payload?.to || payload?.email || "").trim();
  const name = (payload?.name || "there").trim();
  if (!recipient) {
    res.status(400).json({ error: "email_required" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY || "";
  const fromName = process.env.FROM_NAME || "Sip & Bite";
  const fromEmail = process.env.FROM_EMAIL || "hello@sipandbite.site";
  if (!apiKey) {
    res.status(200).json({ status: "skipped", reason: "resend_not_configured" });
    return;
  }

  const safeName = escapeHtml(name);
  const from = fromEmail.includes("<") ? fromEmail : `${fromName} <${fromEmail}>`;
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      subject: "Welcome to Sip & Bite",
      text: `Dear ${name},\n\nWelcome to Sip & Bite.\n\nIt is a pleasure to have you with us. From our grill in Achimota, each plate is cooked to order: chicken, sausage kebabs, and fries, finished while they are still hot.\n\nSign in whenever you return. Your name will be waiting, and the next order will take only a moment.\n\nWith care,\nSip & Bite\nAchimota, Accra`,
      html: `<!DOCTYPE html><html><body style="margin:0;background:#E7F0EA"><div style="max-width:560px;margin:0 auto;padding:48px 28px;font-family:Georgia,'Times New Roman',serif;color:#0B1F1A"><p style="margin:0;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#C4892A">Achimota</p><h1 style="margin:16px 0 0;font-weight:500;font-size:36px;line-height:1.1">Welcome to Sip &amp; Bite.</h1><p style="margin:28px 0 0;font-size:17px;line-height:1.6">Dear ${safeName},</p><p style="margin:16px 0 0;font-size:17px;line-height:1.7">It is a pleasure to have you with us. From our grill in Achimota, each plate is cooked to order: chicken, sausage kebabs, and fries, finished while they are still hot.</p><p style="margin:16px 0 0;font-size:17px;line-height:1.7">Sign in whenever you return. Your name will be waiting, and the next order will take only a moment.</p><p style="margin:36px 0 0;font-size:17px;line-height:1.6">With care,<br/>Sip &amp; Bite</p></div></body></html>`,
    }),
  });

  if (!resp.ok) {
    const message = await resp.text().catch(() => "");
    res.status(500).json({ status: "error", code: resp.status, message });
    return;
  }

  res.status(200).json({ status: "sent" });
}
