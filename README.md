# agroc-nect

A TanStack Start (React 19 + Vite 7) web app for AgroConnect NG — connecting farmers, agents, and buyers in Nigeria. Includes signup/login with email notifications to `agroconnect504@gmail.com`, a Supabase-backed database (profiles, leads, user roles), and WhatsApp lead notifications via Twilio.

---

## 1. Prerequisites

- **Node.js** ≥ 20 (LTS recommended)
- **Bun** ≥ 1.1 — install from <https://bun.sh> (`curl -fsSL https://bun.sh/install | bash`)
- A **Supabase** project (URL + anon key + service role key)
- Optional: **Gmail** API access via Lovable connector (for signup notifications)
- Optional: **Twilio** WhatsApp credentials (for lead WhatsApp pings)

## 2. Unzip and install

```bash
unzip agr-nect.zip -d agr-nect
cd agr-nect
bun install
```

## 3. Configure environment variables

Create a `.env` file in the project root with the following:

```env
# --- Public (shipped to the browser) ---
VITE_SUPABASE_URL="https://<your-project-ref>.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="<your-supabase-anon-key>"
VITE_SUPABASE_PROJECT_ID="<your-project-ref>"

# --- Server-only (used by TanStack server functions) ---
SUPABASE_URL="https://<your-project-ref>.supabase.co"
SUPABASE_PUBLISHABLE_KEY="<your-supabase-anon-key>"
SUPABASE_SERVICE_ROLE_KEY="<your-supabase-service-role-key>"

# --- Lovable AI Gateway (required for Gmail + Twilio connectors) ---
LOVABLE_API_KEY="<your-lovable-api-key>"

# --- Gmail (signup email notifications to agroconnect504@gmail.com) ---
GOOGLE_MAIL_API_KEY="<your-gmail-connection-api-key>"

# --- Twilio (WhatsApp lead notifications) ---
TWILIO_API_KEY="<your-twilio-connection-api-key>"
```

> ⚠️ Never commit `.env`. The `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS — keep it server-side only.

## 4. Apply the database schema

The SQL migrations live in `supabase/migrations/`. Apply them with the Supabase CLI:

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

This creates the `profiles`, `leads`, `user_roles` tables, the `app_role` enum, the `has_role()` function, and all RLS policies.

## 5. Run in development

```bash
bun run dev
```

The app starts on <http://localhost:8080> (or the next available port). File-based routes live in `src/routes/`.

## 6. Production build & run

```bash
bun run build    # builds the Cloudflare Worker bundle into .output/
bun run start    # runs the built server locally
```

## 7. Deploy

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for full deployment instructions (Cloudflare Workers, env vars, custom domains).

---

## Project structure

```
src/
├── routes/              # File-based routes (TanStack Router)
│   ├── __root.tsx       # Root layout
│   ├── index.tsx        # Landing page
│   └── auth.tsx         # Sign up / login
├── components/          # UI + agro components
├── lib/                 # Server functions (*.functions.ts) + utilities
│   ├── notify-signup.functions.ts   # Gmail email on signup
│   └── notify-lead.functions.ts     # Twilio WhatsApp on lead
├── integrations/supabase/  # Auto-generated Supabase clients (do not edit)
└── styles.css           # Tailwind v4 design tokens
supabase/migrations/     # SQL schema
```

## Useful scripts

| Command          | What it does                              |
|------------------|-------------------------------------------|
| `bun run dev`    | Start Vite dev server with HMR            |
| `bun run build`  | Production build (Cloudflare Worker)      |
| `bun run start`  | Run the built server locally              |
| `bun run lint`   | Run ESLint                                |

## Troubleshooting

- **"Missing Supabase environment variable(s)"** → check both `VITE_SUPABASE_*` and `SUPABASE_*` vars are set.
- **"LOVABLE_API_KEY is not configured"** → required for Gmail/Twilio notifications. Get it from Lovable Cloud.
- **Signup works but no email arrives** → verify `GOOGLE_MAIL_API_KEY` and that the Gmail connector is authorized for `agroconnect504@gmail.com`.
- **RLS errors on insert** → confirm migrations ran; check policies on `profiles` / `leads`.
