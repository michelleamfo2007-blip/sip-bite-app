type OrderEmailBody = {
  email?: string;
  to?: string;
  name?: string;
  message?: string;
  subject?: string;
  heading?: string;
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

  const payload = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) as OrderEmailBody | undefined;
  const recipient = (payload?.to || payload?.email || "").trim();
  const name = (payload?.name || "there").trim();
  const message = (payload?.message || "").trim();
  if (!recipient || !message) {
    res.status(400).json({ error: "email_and_message_required" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY || "";
  const fromName = process.env.FROM_NAME || "Sip & Bite";
  const fromEmail = process.env.FROM_EMAIL || "hello@sipandbite.site";
  if (!apiKey) {
    res.status(200).json({ status: "skipped", reason: "resend_not_configured" });
    return;
  }

  const subject = (payload?.subject || "Your order has been placed").trim();
  const heading = (payload?.heading || "Your order has been successfully placed.").trim();
  const safeName = escapeHtml(name);
  const safeHeading = escapeHtml(heading);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>");
  const from = fromEmail.includes("<") ? fromEmail : `${fromName} <${fromEmail}>`;
  const text = `Dear ${name},\n\n${message}\n\nWith care,\nSip & Bite\nAchimota, Accra`;
  const html = `<!DOCTYPE html><html><body style="margin:0;background:#E7F0EA"><div style="max-width:560px;margin:0 auto;padding:48px 28px;font-family:Georgia,'Times New Roman',serif;color:#0B1F1A"><p style="margin:0;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#C4892A">Achimota</p><h1 style="margin:16px 0 0;font-weight:500;font-size:36px;line-height:1.1">${safeHeading}</h1><p style="margin:28px 0 0;font-size:17px;line-height:1.6">Dear ${safeName},</p><p style="margin:16px 0 0;font-size:17px;line-height:1.7">${safeMessage}</p><p style="margin:36px 0 0;font-size:17px;line-height:1.6">With care,<br/>Sip &amp; Bite</p></div></body></html>`;

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      subject,
      text,
      html,
    }),
  });

  if (!resp.ok) {
    const errorText = await resp.text().catch(() => "");
    res.status(500).json({ status: "error", code: resp.status, message: errorText });
    return;
  }

  res.status(200).json({ status: "sent" });
}
