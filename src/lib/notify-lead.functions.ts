import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/twilio";
const TEAM_WHATSAPP = "+2348103528355";
// Twilio WhatsApp Sandbox sender (default). Replace with approved sender for production.
const FROM_WHATSAPP = "whatsapp:+14155238886";

const inputSchema = z.object({
  role: z.enum(["farmer", "agent", "buyer"]),
  name: z.string().min(1).max(120),
  email: z.string().email().max(255),
  phone: z.string().min(5).max(30),
  location: z.string().min(1).max(160),
});

export const notifyLeadWhatsApp = createServerFn({ method: "POST" })
  .inputValidator((input) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const TWILIO_API_KEY = process.env.TWILIO_API_KEY;
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!TWILIO_API_KEY) throw new Error("TWILIO_API_KEY is not configured");

    const body =
      `🌱 New AgroConnect NG lead\n\n` +
      `Role: ${data.role}\n` +
      `Name: ${data.name}\n` +
      `Phone: ${data.phone}\n` +
      `Email: ${data.email}\n` +
      `Location: ${data.location}`;

    const res = await fetch(`${GATEWAY_URL}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": TWILIO_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: `whatsapp:${TEAM_WHATSAPP}`,
        From: FROM_WHATSAPP,
        Body: body,
      }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Twilio WhatsApp send failed", res.status, json);
      throw new Error(`Twilio error [${res.status}]: ${JSON.stringify(json)}`);
    }
    return { ok: true, sid: json.sid as string | undefined };
  });
