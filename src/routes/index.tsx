import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-illustration.jpg";
import brandLogo from "@/assets/agroconnect-logo.png";
import {
  Sprout, Users, Truck, Snowflake, ShoppingCart, BarChart3, Wallet,
  ShieldCheck, Leaf, MapPin, ArrowRight, CheckCircle2, TrendingUp,
  PackageX, Package, HandCoins, Route as RouteIcon,
  Star, Facebook, Twitter, Instagram, Linkedin, Phone, Mail
} from "lucide-react";
import { track } from "@/lib/analytics";
import { FAQ } from "@/components/agro/faq";
import { LeadForm } from "@/components/agro/lead-form";
import { WhatsAppFab } from "@/components/agro/whatsapp-fab";
import { StatsPanel } from "@/components/agro/stats-panel";

function scrollToJoin() {
  const el = document.getElementById("join");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ctaClick(label: string, role?: string) {
  track("cta_click", { label, role });
  scrollToJoin();
}

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AgroConnect NG — Buy, Sell & Move Agricultural Products in Nigeria" },
      { name: "description", content: "AgroConnect NG connects farmers, agents, buyers and logistics into one seamless agritech platform — marketplace, cold storage and payments across Nigeria." },
      { property: "og:title", content: "AgroConnect NG — Smart Agriculture for Nigeria" },
      { property: "og:description", content: "One platform for farmers, agents, buyers and logistics. Reduce waste, grow income, move produce nationwide." },
    ],
  }),
});

function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#" className="flex items-center gap-2">
          <img src={brandLogo} alt="agroc-nect logo" className="h-9 w-9 object-contain" />
          <span className="font-[Poppins] text-lg font-bold tracking-tight">
            agroc-<span className="text-primary">nect</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#solution" className="hover:text-foreground">Solution</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#earn" className="hover:text-foreground">Earn</a>
          <a href="#coverage" className="hover:text-foreground">Coverage</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => ctaClick("nav_get_started")}
            className="bg-[image:var(--gradient-primary)] shadow-[var(--shadow-soft)] hover:opacity-95"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-hero)]" />
      <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 -z-10 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
            <Sprout className="h-3.5 w-3.5" /> Nigeria's Agritech Operating System
          </span>
          <h1 className="mt-5 font-[Poppins] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            The Smart Way to <span className="text-primary">Buy</span>, <span className="text-secondary">Sell</span>, and Move Agricultural Products in Nigeria
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Connect farmers, agents and buyers with reliable logistics, cold storage and instant payments — all in one trusted platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => ctaClick("hero_get_started")} className="h-12 bg-[image:var(--gradient-primary)] px-7 text-base shadow-[var(--shadow-glow)] hover:opacity-95">
              Get Started <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => ctaClick("hero_join_agent", "agent")} className="h-12 border-2 px-7 text-base hover:border-secondary hover:text-secondary">
              Join as an Agent
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Secure Payments</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Verified Agents</div>
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Nationwide Logistics</div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[image:var(--gradient-cta)] opacity-20 blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card p-3 shadow-[var(--shadow-card)]">
            <img src={heroImg} alt="Farmer, agent, buyer and logistics flow on AgroConnect NG"
              width={1280} height={1024}
              className="rounded-[1.5rem] object-cover" />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-background p-4 shadow-[var(--shadow-card)] sm:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Farmer income</p>
                <p className="text-base font-bold">+20% this season</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-5 -right-5 hidden rounded-2xl border border-border bg-background p-4 shadow-[var(--shadow-card)] sm:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-soft text-secondary">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active deliveries</p>
                <p className="text-base font-bold">2,431 today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, sub, children, dark }: any) {
  return (
    <section id={id} className={dark ? "bg-muted/40" : ""}>
      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
          <h2 className="font-[Poppins] text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
          {sub && <p className="mt-4 text-muted-foreground md:text-lg">{sub}</p>}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

const problems = [
  { icon: PackageX, title: "50% Post-Harvest Loss", text: "Farmers lose half their produce to poor storage and broken supply chains." },
  { icon: Package, title: "Inconsistent Supply", text: "Buyers can't reliably source quality produce at fair, predictable prices." },
  { icon: HandCoins, title: "Middlemen Control Pricing", text: "Layers of intermediaries squeeze farmer margins and inflate buyer cost." },
  { icon: RouteIcon, title: "No Structured Logistics", text: "Moving produce between farm and market is slow, costly and unreliable." },
];

function Problem() {
  return (
    <Section eyebrow="The Problem" title="Agriculture is Broken — Here's Why"
      sub="Nigerian agriculture loses billions every year to fragmented systems. We're rebuilding the value chain.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {problems.map((p) => (
          <div key={p.title} className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <p.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const solutions = [
  { icon: ShoppingCart, title: "Marketplace", text: "Direct farm-to-buyer trade with transparent pricing and verified listings.", tone: "primary" },
  { icon: Users, title: "Agent Network", text: "Trained local agents help farmers list, package and sell at fair value.", tone: "secondary" },
  { icon: Truck, title: "Logistics System", text: "On-demand transport that moves produce safely from farm to destination.", tone: "primary" },
  { icon: Snowflake, title: "Cold Storage + Analytics", text: "Smart cold-chain hubs and data tools to cut waste and forecast demand.", tone: "secondary" },
];

function Solution() {
  return (
    <Section id="solution" dark eyebrow="The Solution" title="One Platform. Complete Solution."
      sub="Marketplace, agents, logistics and cold-chain — engineered together to work as a single ecosystem.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {solutions.map((s) => {
          const isPrimary = s.tone === "primary";
          return (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${isPrimary ? "bg-primary-soft text-primary" : "bg-secondary-soft text-secondary"}`}>
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const flows = [
  { emoji: "👨‍🌾", role: "Farmers", color: "primary",
    steps: ["Sign up with phone", "List harvest with agent", "Sell at fair price", "Get paid instantly"] },
  { emoji: "🧑‍💼", role: "Agents", color: "secondary",
    steps: ["Register & verify", "Onboard local farmers", "Coordinate pickups", "Earn commissions"] },
  { emoji: "🏪", role: "Buyers", color: "primary",
    steps: ["Browse marketplace", "Order verified produce", "Schedule delivery", "Receive & confirm"] },
];

function HowItWorks() {
  return (
    <Section id="how" eyebrow="How It Works" title="A Flow Built for Every Player"
      sub="Whether you grow it, move it or buy it — AgroConnect is designed around your daily reality.">
      <div className="grid gap-6 md:grid-cols-3">
        {flows.map((f) => (
          <div key={f.role} className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{f.emoji}</div>
              <h3 className="text-xl font-bold">{f.role}</h3>
            </div>
            <ol className="mt-6 space-y-4">
              {f.steps.map((s, i) => (
                <li key={s} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${f.color === "primary" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Earn() {
  const items = [
    { icon: Sprout, title: "Farmers earn more", text: "Skip middlemen, sell to verified buyers at premium rates." },
    { icon: Wallet, title: "Profitable agents", text: "Build a recurring income managing farmers in your community." },
    { icon: Truck, title: "Logistics jobs", text: "Truck owners and riders get steady, well-paying delivery routes." },
  ];
  return (
    <section id="earn" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-cta)]" />
      <div className="absolute inset-0 -z-10 bg-black/35" />
      <div className="mx-auto max-w-7xl px-5 py-20 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-white ring-1 ring-white/40 backdrop-blur-sm">Earn With Us</p>
          <h2 className="font-[Poppins] text-4xl font-black uppercase leading-tight tracking-tight text-white [text-shadow:_0_4px_24px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl lg:text-7xl">
            Real Income <span className="block bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">for Every Role</span>
          </h2>
          <p className="mt-5 text-base text-white/95 drop-shadow md:text-lg">From the farm to the final mile — AgroConnect creates jobs and grows revenue across Nigeria.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl border border-white/40 bg-white/95 p-7 text-foreground shadow-xl backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                <i.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" onClick={() => ctaClick("earn_start_today")} className="h-12 bg-white px-8 text-base font-bold text-primary hover:bg-white/90">
            Start Earning Today <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: CheckCircle2, title: "Truly integrated", text: "Marketplace, logistics, storage and payments — built as one system." },
    { icon: BarChart3, title: "Transparent pricing", text: "Live market rates so every party knows the fair value, every time." },
    { icon: Leaf, title: "Less waste", text: "Cold-chain and smart routing dramatically reduce post-harvest loss." },
    { icon: ShieldCheck, title: "Reliable supply", text: "Verified agents and contracted farmers mean dependable volume." },
  ];
  return (
    <Section dark eyebrow="Why Choose Us" title="Built for Nigerian Agriculture, End-to-End">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <div key={i.title} className="rounded-2xl border border-border bg-card p-6">
            <i.icon className="h-7 w-7 text-primary" />
            <h3 className="mt-4 text-base font-bold">{i.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{i.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Impact() {
  const stats = [
    { value: "40%", label: "Reduction in post-harvest waste" },
    { value: "20%+", label: "Increase in farmer income" },
    { value: "10k+", label: "Farmers onboarded nationwide" },
    { value: "4", label: "States covered & growing" },
  ];
  return (
    <Section eyebrow="Our Impact" title="Numbers That Move the Nation">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-3xl border border-border bg-[image:var(--gradient-hero)] p-8 text-center">
            <p className="font-[Poppins] text-5xl font-extrabold text-primary">{s.value}</p>
            <p className="mt-3 text-sm font-medium text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  const items = [
    { name: "Aisha B.", role: "Tomato farmer, Kano", quote: "I used to lose half my harvest. Now an agent collects the same week and I get paid the next day." },
    { name: "Tunde O.", role: "Agent, Ilorin", quote: "AgroConnect turned my side hustle into a full business. I manage 60 farmers in my LGA." },
    { name: "Chika E.", role: "Restaurant buyer, Lagos", quote: "Consistent supply at fair prices. The cold-chain quality is the best we've sourced." },
  ];
  return (
    <Section dark eyebrow="Voices" title="Trusted by Farmers, Agents & Buyers">
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((t) => (
          <div key={t.name} className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
            <div className="flex gap-0.5 text-secondary">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft font-bold text-primary">
                {t.name[0]}
              </div>
              <div>
                <p className="text-sm font-bold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Coverage() {
  const cities = [
    { name: "Abuja", x: "52%", y: "45%" },
    { name: "Lagos", x: "20%", y: "72%" },
    { name: "Ilorin", x: "38%", y: "55%" },
    { name: "Keffi", x: "55%", y: "48%" },
  ];
  return (
    <Section id="coverage" eyebrow="Coverage" title="Live in 4 Cities. Expanding Nationwide."
      sub="We're rolling out across Nigeria — starting with high-volume agricultural and consumer hubs.">
      <div className="mx-auto max-w-4xl">
        <div className="relative aspect-[4/3] rounded-3xl border border-border bg-[image:var(--gradient-hero)] p-6 shadow-[var(--shadow-card)]">
          {/* Stylized Nigeria silhouette */}
          <svg viewBox="0 0 100 80" className="h-full w-full">
            <path
              d="M15,30 Q12,20 22,15 Q35,10 50,12 Q65,10 75,18 Q88,22 90,35 Q92,48 85,58 Q78,68 65,70 Q50,72 38,68 Q25,65 18,55 Q10,45 15,30 Z"
              fill="oklch(0.62 0.18 145 / 0.15)"
              stroke="oklch(0.62 0.18 145 / 0.6)"
              strokeWidth="0.4"
            />
          </svg>
          {cities.map((c) => (
            <div key={c.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: c.x, top: c.y }}>
              <div className="relative">
                <span className="absolute inset-0 animate-ping rounded-full bg-secondary/60" />
                <span className="relative flex h-3.5 w-3.5 rounded-full bg-secondary shadow-[var(--shadow-soft)]" />
              </div>
              <div className="mt-2 -translate-x-1/2 rounded-full border border-border bg-background px-3 py-1 text-xs font-bold shadow-sm">
                <MapPin className="mr-1 inline h-3 w-3 text-primary" />{c.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto max-w-5xl px-5 py-24 text-center">
        <h2 className="font-[Poppins] text-4xl font-extrabold md:text-5xl">
          Join the Future of Agriculture in Nigeria
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-background/70 md:text-lg">
          Whether you grow, trade, deliver or buy — there's a place for you on AgroConnect NG.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={() => ctaClick("final_farmer", "farmer")} className="h-12 bg-primary px-7 text-base hover:bg-primary/90">Sign Up as Farmer</Button>
          <Button size="lg" onClick={() => ctaClick("final_agent", "agent")} className="h-12 bg-secondary px-7 text-base text-secondary-foreground hover:bg-secondary/90">Become an Agent</Button>
          <Button size="lg" variant="outline" onClick={() => ctaClick("final_buyer", "buyer")} className="h-12 border-2 border-background/30 bg-transparent px-7 text-base text-background hover:bg-background hover:text-foreground">
            Buy Produce
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img src={brandLogo} alt="agroc-nect logo" className="h-9 w-9 object-contain" />
            <span className="font-[Poppins] text-lg font-bold">agroc-<span className="text-primary">nect</span></span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Building Nigeria's most trusted agricultural ecosystem — from farm gate to final mile.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((I, i) => (
              <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
            <li><a href="#" className="hover:text-foreground">Terms</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold">Get in touch</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><span>+234 809 153 9288</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><span>agroconnect504@gmail.com</span></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /><span>Abuja, Nigeria</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AgroConnect NG. All rights reserved.
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Earn />
        <WhyUs />
        <Impact />
        <Testimonials />
        <Coverage />
        <LeadForm />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFab />
      <StatsPanel />
    </div>
  );
}
