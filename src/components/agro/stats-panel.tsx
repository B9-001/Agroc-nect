import { useEffect, useState } from "react";
import { BarChart3, X, Trash2 } from "lucide-react";
import { getStats, subscribe, clearEvents } from "@/lib/analytics";

export function StatsPanel() {
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState(() => getStats());

  useEffect(() => {
    setStats(getStats());
    return subscribe(() => setStats(getStats()));
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {open ? (
        <div className="w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between border-b border-border bg-foreground px-4 py-3 text-background">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <p className="text-sm font-bold">Conversion stats</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  clearEvents();
                  setStats(getStats());
                }}
                className="rounded-full p-1 transition hover:bg-white/20"
                aria-label="Reset"
                title="Reset events"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 transition hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="space-y-3 p-4 text-sm">
            <Row label="CTA clicks" value={stats.ctaClicks} />
            <Row label="Form starts" value={stats.formStarts} />
            <Row label="Form submits" value={stats.formSubmits} highlight />
            <Row label="WhatsApp opens" value={stats.whatsappOpens} />
            <div className="border-t border-border pt-3">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Conversion rate
              </p>
              <p className="font-[Poppins] text-3xl font-extrabold text-primary">
                {stats.conversionRate.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">submits ÷ CTA clicks</p>
            </div>
            <div className="border-t border-border pt-3">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Submits by role
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <RoleStat label="Farmer" value={stats.byRole.farmer} />
                <RoleStat label="Agent" value={stats.byRole.agent} />
                <RoleStat label="Buyer" value={stats.byRole.buyer} />
              </div>
            </div>
            <p className="pt-2 text-[11px] text-muted-foreground">
              Local-only telemetry · {stats.total} events tracked
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold shadow-[var(--shadow-card)] transition hover:-translate-y-0.5"
          aria-label="Open conversion stats"
        >
          <BarChart3 className="h-4 w-4 text-primary" />
          Stats · {stats.conversionRate.toFixed(0)}%
        </button>
      )}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-bold ${highlight ? "text-primary" : ""}`}>{value}</span>
    </div>
  );
}

function RoleStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-2">
      <p className="font-[Poppins] text-lg font-bold">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}