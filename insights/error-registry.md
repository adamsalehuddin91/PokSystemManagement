# Error Registry
*Auto-updated setiap kali Adam share error. Root cause + fix + prevention disimpan.*

---

## Supabase / PostgreSQL

### E-001 — RLS policy blocking INSERT
**Error:** `new row violates row-level security policy for table "X"`
**Root cause:** `FOR ALL USING(...)` tak cover INSERT — kena `WITH CHECK` berasingan
**Fix:** Split policy: SELECT/INSERT WITH CHECK/UPDATE
**Prevention:** AP-001 — jangan guna `FOR ALL` untuk write operations
**Project:** SRITI (2026-04-28)

---

### E-002 — Duplicate key on existing user invite
**Error:** `duplicate key value violates unique constraint "users_email_key"`
**Root cause:** Anon client check users table kena block RLS → assume user tak wujud → cuba insert → conflict
**Fix:** Guna admin client untuk check existing user, pastu `resetPasswordForEmail` instead of `inviteUserByEmail`
**Prevention:** Guna admin client untuk semua auth-related user lookups
**Project:** SRITI invite-parent (2026-04-28)

---

### E-003 — Insufficient stock error dalam complete_sale
**Error:** `Insufficient stock for product [name]`
**Root cause:** Stock quantity dalam DB kurang dari quantity dalam cart
**Fix:** Refresh product list sebelum checkout, atau show clear error to user
**Prevention:** Real-time stock check sebelum allow checkout
**Project:** HMS Salon POS (2026-04)

---

## Next.js / React

### E-004 — Turbopack sibling JSX error
**Error:** `Adjacent JSX elements must be wrapped in an enclosing tag`
**Root cause:** Dua sibling elements dalam ternary operator tanpa fragment
**Fix:** Wrap dengan `<>...</>`
**Prevention:** AP-007
**Project:** HMS Salon (2026-04-22)

---

### E-005 — Supabase infinite re-render
**Error:** Component re-renders infinitely, network tab shows hundreds of requests
**Root cause:** `createClient()` dalam component body — baru setiap render
**Fix:** `const supabase = useRef(createClient()).current`
**Prevention:** AP-005
**Project:** SRITI (2026-04-28)

---

### E-006 — Next.js 16 middleware export error
**Error:** `The Edge Function "middleware" is not exporting a default function`
**Root cause:** Next.js 16 reserved `middleware.ts` — kena rename
**Fix:** Rename ke `proxy.ts`, update export name
**Prevention:** AP-006
**Project:** SRITI (2026-04-28)

---

## Docker / Deploy

### E-007 — Prisma Docker crash
**Error:** `Cannot find module '@prisma/dev'` atau `valibot` related crash dalam Docker
**Root cause:** `prisma.config.ts` di-copy ke Docker runner — trigger dev dependencies
**Fix:** Remove `prisma.config.ts` dari Dockerfile COPY, guna `schema.prisma` je
**Prevention:** AP-009
**Project:** (2026-04)

---

### E-008 — npm ci fail dalam Docker (platform packages)
**Error:** `EBADPLATFORM: Unsupported platform for @emnapi/...`
**Root cause:** `package-lock.json` generate on Windows — lock Linux platform packages yang tak sama
**Fix:** Guna `npm install` instead of `npm ci` dalam Dockerfile
**Prevention:** Jangan commit `package-lock.json` dari Windows untuk Linux deploy
**Project:** Qalbu (2026-04-20)

---

### E-009 — Coolify DB_HOST connection refused
**Error:** `Connection refused` atau `ECONNREFUSED` untuk DB dalam Coolify
**Root cause:** `DB_HOST=localhost` atau service name salah — Coolify guna internal UUID hostname
**Fix:** Guna Coolify internal hostname (UUID format) dari service settings
**Prevention:** Setiap Coolify PostgreSQL deploy, check internal hostname dari dashboard
**Project:** Qalbu backend (2026-04-19)

---

## Commission / Business Logic

### E-010 — Commission rate silap (15% untuk assistant)
**Error:** Assistant dapat 15% instead of 10%
**Root cause:** `staff.role = "Assistant Hairstylist"` — code expect lowercase `'assistant'`
**Fix:** `UPDATE public.staff SET role = 'assistant' WHERE role ILIKE '%assistant%'`
**Prevention:** Normalize role values dalam DB sebelum logic bergantung padanya
**Project:** HMS Salon edit_sale (2026-04-22)

---

### E-011 — edit_sale RPC unknown parameter error
**Error:** `Could not find the function public.edit_sale(p_sale_id, ...) in the schema cache`
**Root cause:** RPC signature dalam DB tak match params yang dihantar dari client
**Fix:** Drop and recreate RPC dengan signature yang betul, atau guna fallback pattern
**Prevention:** Bila add param baru ke RPC, update DB migration dulu sebelum update client code
**Project:** HMS Salon (2026-04-30)

---

## Format Entry Baru
```
### E-XXX — [Nama Pendek Error]
**Error:** [exact error message atau description]
**Root cause:** [kenapa berlaku — 1-2 ayat]
**Fix:** [apa yang di-apply untuk fix]
**Prevention:** [AP-XXX reference atau rule baru]
**Project:** [nama project] (tarikh)
```

---
*Last updated: 2026-04-30 | Total errors registered: 11*
