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
      text: `Hi ${name},\n\nThanks for joining Sip & Bite! We're excited to have you.\n\nYou can now sign in anytime to manage your account and speed up checkout.\n\nCheers,\nSip & Bite`,
      html: `<!DOCTYPE html><html><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif"><div style="max-width:560px;margin:0 auto;padding:24px"><h1 style="margin:0 0 12px;font-size:22px">Welcome to Sip & Bite</h1><p>Hi ${safeName},</p><p>Thanks for joining <strong>Sip & Bite</strong>. You can sign in anytime to manage your account and speed up checkout.</p><p style="margin-top:24px;color:#64748b;font-size:12px">Cheers,<br/>Sip & Bite</p></div></body></html>`,
    }),
  });

  if (!resp.ok) {
    const message = await resp.text().catch(() => "");
    res.status(500).json({ status: "error", code: resp.status, message });
    return;
  }

  res.status(200).json({ status: "sent" });
}
