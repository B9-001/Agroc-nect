import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { track } from "@/lib/analytics";
import { Sprout, Users, ShoppingCart, ArrowRight, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { TEAM_WHATSAPP } from "./whatsapp-fab";
import { notifyLeadWhatsApp } from "@/lib/notify-lead.functions";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?234|0)[789]\d{9}$/, "Enter a valid Nigerian phone number")
    .max(20),
  location: z.string().trim().min(2, "Enter your city or state").max(80),
});

const roles = [
  {
    id: "farmer",
    label: "Farmer",
    icon: Sprout,
    headline: "Sell your harvest at a fair price",
    locationLabel: "Farm location (LGA, State)",
  },
  {
    id: "agent",
    label: "Agent",
    icon: Users,
    headline: "Earn commissions onboarding farmers in your community",
    locationLabel: "LGA you cover",
  },
  {
    id: "buyer",
    label: "Buyer",
    icon: ShoppingCart,
    headline: "Source verified produce with reliable delivery",
    locationLabel: "Business location",
  },
] as const;

type Role = (typeof roles)[number]["id"];

function buildTeamWhatsAppUrl(role: Role, data: { name: string; email: string; phone: string; location: string }) {
  const msg =
    `New AgroConnect NG lead\n\n` +
    `Role: ${role}\n` +
    `Name: ${data.name}\n` +
    `Phone: ${data.phone}\n` +
    `Email: ${data.email}\n` +
    `Location: ${data.location}`;
  return `https://wa.me/${TEAM_WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function RoleForm({ role }: { role: Role }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [waUrl, setWaUrl] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        const k = i.path[0];
        if (typeof k === "string") fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      track("form_error", { role, fields: Object.keys(fieldErrors).join(",") });
      return;
    }
    setErrors({});
    setLoading(true);
    track("form_submit", { role });
    const { error } = await supabase.from("leads").insert({
      role,
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      location: result.data.location,
      source: "landing_page",
    });
    setLoading(false);
    if (error) {
      toast.error("Couldn't submit — please try again.");
      track("form_error", { role, fields: "db_insert" });
      return;
    }
    const url = buildTeamWhatsAppUrl(role, result.data);
    setWaUrl(url);
    setSubmitted(true);
    toast.success("You're on the list! Our team has been notified on WhatsApp.");
    // Send automated WhatsApp to the team via Twilio.
    try {
      await notifyLeadWhatsApp({ data: { role, ...result.data } });
      track("whatsapp_sent", { role });
    } catch (err) {
      console.error(err);
      track("whatsapp_send_failed", { role });
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-primary/30 bg-primary-soft p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <h3 className="text-lg font-bold">You're in.</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Our team will contact you within 24 hours to complete your onboarding as a {role}.
        </p>
        {waUrl && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_open", { role, source: "lead_success_button" })}
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[oklch(0.7_0.17_150)] px-5 py-2.5 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition hover:opacity-90"
          >
            Notify team on WhatsApp
          </a>
        )}
      </div>
    );
  }

  const r = roles.find((x) => x.id === role)!;

  return (
    <form onSubmit={onSubmit} onFocus={() => track("form_start", { role })} className="space-y-4">
      <p className="text-sm text-muted-foreground">{r.headline}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${role}-name`}>Full name</Label>
          <Input id={`${role}-name`} name="name" placeholder="Aisha Bello" maxLength={80} />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor={`${role}-phone`}>Phone</Label>
          <Input id={`${role}-phone`} name="phone" placeholder="08012345678" maxLength={20} />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div>
          <Label htmlFor={`${role}-email`}>Email</Label>
          <Input id={`${role}-email`} name="email" type="email" placeholder="you@example.com" maxLength={255} />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor={`${role}-location`}>{r.locationLabel}</Label>
          <Input id={`${role}-location`} name="location" placeholder="e.g. Ikeja, Lagos" maxLength={80} />
          {errors.location && <p className="mt-1 text-xs text-destructive">{errors.location}</p>}
        </div>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-full bg-[image:var(--gradient-primary)] text-base shadow-[var(--shadow-soft)] hover:opacity-95 sm:w-auto"
      >
        {loading ? "Submitting…" : `Join as ${r.label}`} <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </form>
  );
}

export function LeadForm() {
  return (
    <section id="join" className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-20">
        <div className="text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Join</p>
          <h2 className="font-[Poppins] text-3xl font-extrabold tracking-tight md:text-4xl">
            Get Onboarded in Under 2 Minutes
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Pick your role and we'll guide you through the rest.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-10">
          <Tabs
            defaultValue="farmer"
            onValueChange={(v) => track("role_tab_change", { role: v })}
          >
            <TabsList className="grid w-full grid-cols-3">
              {roles.map((r) => (
                <TabsTrigger key={r.id} value={r.id} className="gap-2">
                  <r.icon className="h-4 w-4" /> {r.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {roles.map((r) => (
              <TabsContent key={r.id} value={r.id} className="mt-6">
                <RoleForm role={r.id} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}