const KEY = "agroconnect_analytics_v1";

export type AnalyticsEvent = {
  name: string;
  props?: Record<string, string | number | boolean | undefined>;
  ts: number;
};

type Listener = (events: AnalyticsEvent[]) => void;
const listeners = new Set<Listener>();

function read(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(events: AnalyticsEvent[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(events.slice(-500)));
  listeners.forEach((l) => l(events));
}

export function track(name: string, props?: AnalyticsEvent["props"]) {
  const ev: AnalyticsEvent = { name, props, ts: Date.now() };
  const events = [...read(), ev];
  write(events);
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.log("[analytics]", name, props || {});
  }
}

export function getEvents(): AnalyticsEvent[] {
  return read();
}

export function clearEvents() {
  write([]);
}

export function subscribe(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function getStats() {
  const events = read();
  const ctaClicks = events.filter((e) => e.name === "cta_click").length;
  const formStarts = events.filter((e) => e.name === "form_start").length;
  const formSubmits = events.filter((e) => e.name === "form_submit").length;
  const whatsappOpens = events.filter((e) => e.name === "whatsapp_open").length;
  const conversionRate = ctaClicks > 0 ? (formSubmits / ctaClicks) * 100 : 0;
  const byRole = (role: string) =>
    events.filter((e) => e.name === "form_submit" && e.props?.role === role).length;
  return {
    ctaClicks,
    formStarts,
    formSubmits,
    whatsappOpens,
    conversionRate,
    byRole: {
      farmer: byRole("farmer"),
      agent: byRole("agent"),
      buyer: byRole("buyer"),
    },
    total: events.length,
  };
}