# SwiftApp OS
*Coding Project - Created 2026-03-27*

## Description
Internal business OS for Adam's SwiftApps freelance operation. Manages client projects (Drafting→Dev→UAT→Live), invoicing, quotations, receipts, and business analytics — all in one self-hosted dashboard. Single-user, password-gated.

## Project Details
- **Status**: Active (Deploying to Coolify — TS fixes in progress)
- **Created**: 2026-02-18
- **Last Accessed**: 2026-05-06
- **Position**: #1

## Stack
- **Framework**: Next.js + TypeScript + Tailwind CSS
- **Database**: PostgreSQL (self-hosted via Coolify) + Prisma ORM
- **Auth**: Env-based password gate + login page (middleware.ts)
- **Deploy**: Hetzner VPS + Coolify (Docker)
- **Branch**: main

## Resume
```bash
cd "SwiftApp Dev/SwiftAppOS"
npm run dev
# Access: localhost:3000
```

## Active Tasks
- [x] Initial build — projects, billing, analytics, settings pages
- [x] v2.0 upgrade — P1 (Zod validation, sequential numbering, status guards, pagination, toast, auth)
- [x] v2.0 upgrade — P2 (search/filter, quotation→invoice, receipt recording, overdue alerts, progress bar)
- [x] v2.0 upgrade — P3 (bank details, CSV export, duplicate quotation, project archiving, mobile responsive)
- [x] Dockerfile + Next.js standalone mode for Coolify deployment
- [x] Fix Docker build — prisma schema copy order
- [x] Switch Neon → standard PostgreSQL adapter (pg + @prisma/adapter-pg) for self-hosted DB
- [x] Sequence upsert fix (no seed data on production)
- [x] Billing: quotation→invoice stage selector (Deposit/Progress/Final/Monthly)
- [x] Billing: mark as paid → generate receipt → PDF download
- [x] Schema: Invoice.projectId made optional (String? + migration)
- [x] Coolify deploy TS cascade fix — verified working ✅
- [x] Login test after deploy: SwiftOS@Adam2026 ✅
- [x] Milestone form — grouped presets + datalist autocomplete
- [x] Delete invoice (any status, Paid shows warning)
- [x] Delete quotation
- [x] Company logo upload — Settings page + /api/settings/logo
- [x] Logo in PDF — Image component, absolute URL, hide company name when logo set
- [x] Dockerfile EACCES fix — chown uploads dir to nextjs user
- [ ] Quick-fill presets: expense form

## Progress Log

### 2026-05-05 (Session 4 — Billing Complete + Coolify TS Cascade Fixes)

**Billing flow fully implemented:**
- Quotation PDF T&C → amber left-border box (Nota & Syarat, split by `\n`)
- Preset redesign: HMS removed → 6 system types (POS/CRM/Sekolah/Inventori/HR/Bisnes Full)
- Billing actions from project page auto-load client details via `?projectId=` URL param
- Convert quotation → invoice: stage selector UI (Deposit 50%, Progress 25%, Baki 50%, Bulanan)
- Mark invoice paid → generate receipt → PDF download via `@react-pdf/renderer`
- Receipt numbers in Payment History = clickable links to `/billing/receipts/:id`
- Edit quotation description: Input → Textarea (min-h-[120px])

**Prisma schema change — Invoice.projectId optional:**
- `String` → `String?` in schema + migration `20260505000001`
- `onDelete: Cascade` → `onDelete: SetNull`
- Cascade TS fixes: `inv.project.name` → `inv.project?.name ?? "-"` in 3 files
- `Invoice.project_id: string` → `project_id?: string` in types/index.ts
- Mapper: `inv.projectId ?? undefined`

**Coolify deploy — 5 TS errors fixed in sequence:**
- `aa9ca80` → `8b78861` → `6016384` → `1b7053f` → `73452e0` → `3e10feb` → `c2def69` → `2eda4d9`
- Root: each TS error hidden until previous one resolved (TypeScript compile stops at first file)
- Latest push: `2eda4d9` — awaiting Coolify rebuild result

**Commits this session**: `0863db7`, `aa9ca80`, `8b78861`, `6016384`, `1b7053f`, `73452e0`, `3e10feb`, `c2def69`, `2eda4d9`

**Next steps:**
- Verify Coolify build passes on `2eda4d9`
- Login test: `SwiftOS@Adam2026`
- If more TS errors → grep full codebase for remaining `inv.project` non-optional access

### 2026-03-28 (Session 2 — Coolify Docker Prisma Fixes)
- **4 Dockerfile fixes** chasing Prisma v7 deploy errors:
  - `03fa05d` — `prisma: not found` → copy `node_modules/.bin/prisma` to runner
  - `c131d9c` — `.wasm not found` → use `node node_modules/prisma/build/index.js` instead of npx
  - `0509dfa` — `valibot missing` (first attempt) → removed migrate from CMD temporarily
  - `4403e64` — **root fix** → `prisma.config.ts` was triggering `@prisma/dev` → `valibot` chain. Removed config from runner stage. CLI falls back to `prisma/schema.prisma` directly — no dep chain.
- **Lesson**: Prisma v7's `prisma.config.ts` is a TypeScript config loader that pulls `@prisma/dev` at runtime. Never copy it to production Docker runner — use classic schema.prisma approach.
- **Next step**: Verify Coolify deploy succeeds with latest fix. Set `DATABASE_URL` + `APP_PASSWORD` env vars.

### 2026-03-27 (Session 1 — v2.0 + Coolify Deploy Prep)
- **SwiftAppOS v2.0 COMPLETE** (commit `b034298`):
  - **P1 Critical**: Zod validation on all 11 API routes, sequential numbering (Sequence table), status workflow guards, pagination (projects/invoices/quotations), toast notifications (sonner), auth middleware + login page
  - **P2 High Value**: Search/filter on billing + projects, quotation→invoice conversion, full draft edit, receipt/payment recording (auto-mark Paid), overdue invoice alerts, project progress bar (milestone %), receipt view + PDF template
  - **P3 QoL**: Bank details in settings + invoice PDF footer, CSV export (invoices + quotations), duplicate quotation, project archiving, mobile-responsive table component, logo URL with preview, audit trail (updatedAt)
  - Schema: Added Sequence table, bank/logo fields, isArchived, updatedAt columns
  - Packages: +zod +sonner | 20 new files, ~33 modified
- **Dockerfile added** (commit `315557b`): Node 20 Alpine, multi-stage build, standalone mode, `prisma migrate deploy` on startup
- **Docker build fix** (commit `b2e132c`): Copy prisma schema before `npm ci` (was failing)
- **Neon → pg adapter** (commit `52d6440`): Replace `@neondatabase/serverless` + `@prisma/adapter-neon` with `@prisma/adapter-pg` + `pg` for self-hosted PostgreSQL compatibility
- **Next step**: Deploy to Coolify, verify DB connection, set env vars

### 2026-05-05 (Session 5 — Logo Upload + PDF + Delete Features)

**Features shipped:**
- Milestone name presets: 30+ grouped entries (Billing/Fasa/Modul/Support) + 40-item datalist autocomplete (`66d5fb2`)
- Delete invoice — any status, Paid shows ⚠️ warning about cascading receipt delete (`bb9698b`)
- Delete quotation — no status restriction (`08fd92e`)
- Company logo file upload — Settings page: drag/click zone, preview, clear, fallback URL input
- `/api/settings/logo` POST handler — validates type (JPG/PNG/WebP/SVG) + size (max 2MB), saves to `public/uploads/logo.{ext}` (`7c523e8`)
- Dockerfile: `RUN mkdir -p /app/public/uploads && chown -R nextjs:nodejs` — fix EACCES on upload (`1aa9a32`)
- PDF logo render — `Image` component from `@react-pdf/renderer`, absolute URL conversion (`b478d7e`)
- Logo size tuned: 80×40 → 160×70 → 220×100 (`83a768d`, `8c91402`)
- Company name hidden in PDF when logo exists (logo replaces name)
- `validations.ts`: removed `.url()` from logoUrl so relative paths pass Zod

**Key lessons:**
- react-pdf renders in Web Worker — relative URLs don't resolve. Must convert to `window.location.origin + path` in page component (not in pdf-generator).
- Coolify volume mount (`/app/public/uploads`) needed for logo to survive redeploy
- Docker EACCES: `public/` copied as root → switch to `nextjs` user → uploads dir must be chowned before `USER nextjs`

**Commits**: `66d5fb2`, `bb9698b`, `08fd92e`, `7c523e8`, `1aa9a32`, `b478d7e`, `83a768d`, `8c91402`
**Latest**: `8c91402`

## Known Issues
- Expense form quick-fill presets — not yet built
- Coolify volume `/app/public/uploads` should be set as persistent volume so logo survives redeploy

## Resources & References
- Deploy: Hetzner VPS + Coolify, same pattern as LorryTech OS
- DB: Self-hosted PostgreSQL via Coolify (not Neon)
- Schema: `prisma/schema.prisma` — Project, Milestone, Client, Quotation, Invoice, Receipt, Cost, Sequence, Settings

## Memory Patterns
*AI records discoveries here during sessions:*
- Prisma adapter: `@prisma/adapter-pg` + `pg` (NOT Neon) for self-hosted PostgreSQL
- Docker CMD: `sh -c "node node_modules/prisma/build/index.js migrate deploy && node server.js"`
- Copy prisma schema BEFORE `npm ci` in Dockerfile deps stage
- **DO NOT copy `prisma.config.ts` to runner** — triggers `@prisma/dev` dep chain → valibot crash
- Runner needs: `node_modules/prisma` + `node_modules/@prisma` (NO prisma.config.ts)
- Sequential numbering via Sequence table (not UUID) for invoices/quotations

---
*Coding Project Template v1.1 — Tokwi Adapted*
