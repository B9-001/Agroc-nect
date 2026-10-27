import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";
const NOTIFY_TO = "agroconnect504@gmail.com";

const inputSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().max(120).optional().nullable(),
  role: z.string().max(60).optional().nullable(),
  phone: z.string().max(30).optional().nullable(),
  location: z.string().max(160).optional().nullable(),
});

function toBase64Url(str: string) {
  // btoa works in the Worker runtime for ASCII; encode UTF-8 safely.
  const utf8 = new TextEncoder().encode(str);
  let bin = "";
  utf8.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export const notifySignup = createServerFn({ method: "POST" })
  .inputValidator((input) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const GOOGLE_MAIL_API_KEY = process.env.GOOGLE_MAIL_API_KEY;
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!GOOGLE_MAIL_API_KEY) throw new Error("GOOGLE_MAIL_API_KEY is not configured");

    const subject = `🌱 New AgroConnect signup: ${data.email}`;
    const body = [
      "A new user just signed up on AgroConnect.",
      "",
      `Email:    ${data.email}`,
      `Name:     ${data.name || "—"}`,
      `Role:     ${data.role || "—"}`,
      `Phone:    ${data.phone || "—"}`,
      `Location: ${data.location || "—"}`,
      "",
      `Time: ${new Date().toISOString()}`,
    ].join("\n");

    const rfc2822 = [
      `To: ${NOTIFY_TO}`,
      `Subject: ${subject}`,
      'Content-Type: text/plain; charset="UTF-8"',
      "",
      body,
    ].join("\r\n");

    const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GOOGLE_MAIL_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: toBase64Url(rfc2822) }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Gmail send failed", res.status, json);
      throw new Error(`Gmail error [${res.status}]: ${JSON.stringify(json)}`);
    }
    return { ok: true, id: json.id as string | undefined };
  });
