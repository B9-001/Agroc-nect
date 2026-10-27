import { useState } from "react";
import { MessageCircle, Sprout, Users, ShoppingCart, X } from "lucide-react";
import { track } from "@/lib/analytics";

export const TEAM_WHATSAPP = "2348103528355";

const ROLES = [
  {
    id: "farmer",
    label: "I'm a Farmer",
    icon: Sprout,
    phone: TEAM_WHATSAPP,
    message:
      "Hello AgroConnect NG, I'm a farmer and I'd like to list my produce for sale. Please help me get onboarded.",
  },
  {
    id: "agent",
    label: "I'm an Agent",
    icon: Users,
    phone: TEAM_WHATSAPP,
    message:
      "Hello AgroConnect NG, I'd like to become a verified agent in my LGA. Please share next steps.",
  },
  {
    id: "buyer",
    label: "I'm a Buyer",
    icon: ShoppingCart,
    phone: TEAM_WHATSAPP,
    message:
      "Hello AgroConnect NG, I'm a buyer looking to source verified produce with reliable delivery. Please assist.",
  },
] as const;

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);

  function openChat(role: (typeof ROLES)[number]) {
    track("whatsapp_open", { role: role.id });
    const url = `https://wa.me/${role.phone}?text=${encodeURIComponent(role.message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-72 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between bg-[oklch(0.7_0.17_150)] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-bold">Chat with us on WhatsApp</p>
              <p className="text-[11px] opacity-90">Pick your role to get started</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 transition hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-1 p-2">
            {ROLES.map((r) => (
              <button
                key={r.id}
                onClick={() => openChat(r)}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-medium transition hover:bg-muted"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <r.icon className="h-4 w-4" />
                </span>
                <span className="flex-1">{r.label}</span>
                <span className="text-xs text-muted-foreground">Chat</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.7_0.17_150)] text-white shadow-[var(--shadow-glow)] transition hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}