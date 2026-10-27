# Deployment Guide — agroc-nect

This project is a **TanStack Start v1** app (React 19, Vite 7) configured to deploy to **Cloudflare Workers** via `@cloudflare/vite-plugin` and `wrangler`. The SSR entry is `src/server.ts` (referenced by both `vite.config.ts` and `wrangler.jsonc`).

---

## 1. Pre-deployment checklist

- [ ] Supabase project created; migrations in `supabase/migrations/` applied (`npx supabase db push`).
- [ ] Auth providers configured in Supabase dashboard (Email at minimum; Google optional).
- [ ] All env vars (below) ready.
- [ ] `bun run build` succeeds locally.

## 2. Environment variables

### Public (build-time, bundled into client)
| Name | Description |
|------|-------------|
| `VITE_SUPABASE_URL` | `https://<ref>.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon (publishable) key |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ref |

### Server-only (runtime secrets — never bundled)
| Name | Description |
|------|-------------|
| `SUPABASE_URL` | Same as `VITE_SUPABASE_URL` |
| `SUPABASE_PUBLISHABLE_KEY` | Same as `VITE_SUPABASE_PUBLISHABLE_KEY` |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret.** Bypasses RLS. Server only. |
| `LOVABLE_API_KEY` | Auth for Lovable AI Gateway (Gmail/Twilio connectors) |
| `GOOGLE_MAIL_API_KEY` | Gmail connector API key (signup email notifications) |
| `TWILIO_API_KEY` | Twilio connector API key (WhatsApp notifications) |

## 3. Production build

```bash
bun install --frozen-lockfile
bun run build
```

Output: `.output/` (Worker bundle) + `dist/client/` (static assets).

To smoke-test the production server locally:

```bash
bun run start
# → open http://localhost:3000
```

## 4. Deploy to Cloudflare Workers

### One-time setup
```bash
bun add -d wrangler
npx wrangler login
```

### Upload secrets (runtime env)
```bash
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_PUBLISHABLE_KEY
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npx wrangler secret put LOVABLE_API_KEY
npx wrangler secret put GOOGLE_MAIL_API_KEY
npx wrangler secret put TWILIO_API_KEY
```

The `VITE_*` vars are baked in at build time — set them in your shell or CI before `bun run build`, not as Worker secrets.

### Deploy
```bash
bun run build
npx wrangler deploy
```

Wrangler reads `wrangler.jsonc` (`main: src/server.ts`, `compatibility_flags: ["nodejs_compat"]`).

### Custom domain
In the Cloudflare dashboard: **Workers & Pages → your worker → Settings → Triggers → Add Custom Domain**.

## 5. Alternative: deploy via Lovable (recommended)

If you built this in Lovable, just click **Publish** in the editor. Lovable handles the build, Worker upload, and provides a `*.lovable.app` URL. Add a custom domain from **Project Settings → Domains**.

## 6. Post-deployment verification

1. Visit the deployed URL — landing page loads.
2. Go to `/auth`, create an account.
3. Confirm an email arrives at `agroconnect504@gmail.com`.
4. Submit a lead form — verify the row in Supabase `leads` table and the WhatsApp message to the team number.
5. Check Worker logs: `npx wrangler tail`.

## 7. Rollback

Cloudflare keeps prior Worker versions. Roll back via:
```bash
npx wrangler rollback
```
or in the dashboard under **Deployments**.

## 8. Common deployment issues

| Symptom | Fix |
|--------|-----|
| Blank page / 500 on first request | Missing `VITE_SUPABASE_*` at build time → re-build with vars set |
| `Missing Supabase environment variable(s)` in logs | Worker secret not uploaded — re-run `wrangler secret put` |
| Signup succeeds, no email | `LOVABLE_API_KEY` / `GOOGLE_MAIL_API_KEY` missing, or Gmail connector not authorized |
| `Unauthorized: No authorization header provided` on serverFn | Browser session expired; user must re-login |
| `[unenv] X is not implemented` | A Node-only package was added; replace with a Workers-compatible one |

---

**Stack reference:** TanStack Start v1 · React 19 · Vite 7 · Tailwind v4 · Supabase · Cloudflare Workers (`nodejs_compat`).
