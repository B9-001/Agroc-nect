import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How fast is delivery once I place an order?",
    a: "Most intra-city orders in our covered cities (Lagos, Abuja, Ilorin, Keffi) are fulfilled within 24–48 hours. Inter-state and cold-chain shipments arrive within 2–4 working days depending on volume and route.",
  },
  {
    q: "Is your pricing transparent? Are there hidden fees?",
    a: "Yes. Every listing shows live market rates, the platform service fee (5%), and logistics cost upfront before you confirm. Farmers see exactly what they'll be paid; buyers see the all-in landed price — no hidden middleman markups.",
  },
  {
    q: "How do payments work and when do farmers get paid?",
    a: "Buyers pay securely via card, bank transfer or USSD into a protected escrow wallet. Funds are released to the farmer within 24 hours of delivery confirmation. Agents earn their commission automatically in the same payout.",
  },
  {
    q: "How do I onboard as a farmer, agent or buyer?",
    a: "Sign up with your phone number in under 2 minutes. Farmers are paired with a verified local agent who helps list produce. Agents complete a short verification (ID + LGA). Buyers can browse and order immediately after email confirmation.",
  },
  {
    q: "What if produce arrives damaged or below quality?",
    a: "Every shipment is inspected at our cold-chain hub before dispatch. If quality is below the agreed grade on arrival, buyers can dispute within 24 hours and receive a refund or replacement from escrow.",
  },
  {
    q: "Do I need a smartphone or internet to use AgroConnect?",
    a: "No. Farmers can transact entirely through their local agent and via USSD shortcodes. Agents and buyers use the mobile app or web platform.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-muted/40">
      <div className="mx-auto max-w-3xl px-5 py-20">
        <div className="text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Questions
          </p>
          <h2 className="font-[Poppins] text-3xl font-extrabold tracking-tight md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Everything you need to know about delivery, pricing, payments and onboarding.
          </p>
        </div>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-border bg-card px-5 shadow-[var(--shadow-soft)]"
            >
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}