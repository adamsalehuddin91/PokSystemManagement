# SwiftBiz
*Coding Project - Created 2026-02-23 | Rebranded 2026-04-12 (was: PokSystem)*

## Description
Business management system untuk contractor/construction dan trading company. Modules: Invoicing, Purchase Orders, Quotations, Delivery Orders, Supplier Invoices, Inventory, Customers, Suppliers, Finance. Part of SwiftApps ecosystem.

## Project Details
- **Status**: 🟢 LIVE — biz.swiftapps.my (Coolify + Hetzner)
- **Created**: 2026-01 (approx)
- **Last Accessed**: 2026-04-14
- **Position**: #2

## Stack
- **Framework**: Laravel 12 + React 18 + Inertia.js
- **Styling**: Tailwind CSS
- **Database**: Supabase PostgreSQL (pooler, transaction mode)
- **Auth**: Laravel Auth
- **Deploy**: Coolify (Hetzner VPS) — migrating from Railway
- **Repo**: `adamsalehuddin91/SwiftBiz`
- **URL**: `https://biz.swiftapps.my` ✅ LIVE
- **Branch**: `main`

## Resume
```bash
cd "SwiftApp Dev/SwiftBiz"
php artisan serve
npm run dev
```

## Active Tasks
- [x] Rename local folder PokSystemManagement → SwiftBiz ✅ 2026-04-14
- [x] Coolify: APP_KEY generated ✅ 2026-04-14
- [x] Coolify: PostgreSQL container created ✅ 2026-04-14
- [x] Coolify: set env vars + deploy app dari GitHub ✅ 2026-04-14
- [x] Cloudflare DNS: A record biz → Hetzner VPS IP ✅ 2026-04-14
- [ ] Daftar myInvois sandbox → dapat CLIENT_ID + CLIENT_SECRET (mytax.hasil.gov.my)
- [ ] Set MYINVOIS_CLIENT_ID + MYINVOIS_CLIENT_SECRET in Coolify env vars
- [ ] Test e-Invoice submit dari Invoice show page (sandbox)
- [ ] Daftar MDEC approved vendor (untuk grant RM5K pitch ke clients)
- [ ] Upload screenshots ke shots.so → post Facebook/Threads (draft siap)
- [ ] Authorization policies (role-based access)
- [ ] Dashboard N+1 query optimization

## Progress Log
### 2026-04-14 — Coolify Live + Settings Page + Company Info

**Coolify LIVE**
- DB env vars fixed (full URL dalam DB_HOST → pecah kepada individual vars)
- App accessible: `biz.swiftapps.my` ✅
- Demo: `demo@swiftbiz.my` / `SwiftBiz2026`

**App Icon (commit `1655cae`)**
- Default SVG icon — dark indigo + lightning bolt
- `CompanySetting` model + `company_settings` table
- `SettingsController` — upload, remove icon
- `HandleInertiaRequests` — share `appIcon` globally
- `app.blade.php` — dynamic favicon dari DB
- `Pages/Settings/Index.jsx` — upload UI + preview
- `docker/entrypoint.sh` — `storage:link` on deploy

**Company Info Settings (uncommitted)**
- Migration `2026_04_14_000002` — 8 new fields (company_name, reg_no, tin, doc_prefix, address, phone, email)
- `CompanySetting` — fillable + firstOrCreate fallback dari config
- `PdfService` — pass `$company` ke semua 4 PDF views
- 4 PDF blade templates — guna `$company->field` (bukan `config('company.*')`)
- `SettingsController::updateCompany()` — validate + update
- `Settings/Index.jsx` — company info form (nama, SSM, TIN, prefix, alamat, telefon, emel)
- Route: `POST /settings/company`

**Security Review**
- `.gitignore` updated — `.env.*` + `screenshot/output/` blocked
- Full GitHub scan: tiada real password / secret leak

**Next steps**
- Commit + push company info changes
- `php artisan migrate` dalam Coolify (migration baru)
- Daftar myInvois sandbox → dapat CLIENT_ID + CLIENT_SECRET

### 2026-04-14 — Coolify Setup (Partial)
- Folder local renamed: `PokSystemManagement` → `SwiftBiz` ✅
- APP_KEY generated: `base64:Q8aZHBRLO8Uh1eWMy5kSZV6oRzSog6r4osia9kovbZM=`
- PostgreSQL container created dalam Coolify ✅
- **Next**: set env vars dalam Coolify → deploy app → Cloudflare DNS

### 2026-04-13 — Coolify Migration + Demo Account + GitHub Rename + Screenshots

**Coolify Deploy Prep**
- `Dockerfile` — PHP-FPM + Nginx + Supervisor + pdo_pgsql (Alpine)
- `docker/nginx.conf`, `docker/supervisord.conf`, `docker/entrypoint.sh`
- Entrypoint: auto config:cache + migrate + demo:setup on every deploy
- Migration from Railway → Coolify (Hetzner). Supabase paused — move to Coolify PostgreSQL.

**Demo Account**
- `app/Console/Commands/SetupDemoAccount.php` — `php artisan demo:setup`
- Credentials: `demo@swiftbiz.my` / `SwiftBiz2026` — full access

**GitHub**
- Repo renamed: `PokSystemManagement` → `SwiftBiz`
- Local remote updated to `https://github.com/adamsalehuddin91/SwiftBiz.git`
- Commit `6e885b3` pushed — all e-Invoice + Docker changes

**Screenshot Generator**
- Fixed login selector (`form button` instead of `button[type="submit"]`)
- Generated 11 files: 6 web screens + 5 social cards (1080×1080 + 1080×1350)
- PWA install guide tool: `tools/pwa-guide/generate.js` (Android + iOS)

**Folder rename pending** — `PokSystemManagement` → `SwiftBiz` (after VS Code closed)

### 2026-04-13 — e-Invoice Integration + Mockup Generator + Social Media Strategy

**e-Invoice LHDN myInvois — Phase 1 + 2 COMPLETE**
- Migration: `2026_04_13_000001_add_einvoice_fields_to_invoices_table.php` — 6 new columns (uuid, long_id, status, qr_code, submitted_at, error)
- `app/Services/EInvoiceService.php` — OAuth2 token, 55-field JSON builder, submit, checkStatus
- `config/einvoice.php` — sandbox/prod URL config
- `Invoice.php` — +6 fillable, `canSubmitEInvoice()`, `isEInvoiceSubmitted()` helpers
- `InvoiceController.php` — `submitEInvoice()`, `checkEInvoiceStatus()`, `bulkSubmitEInvoice()`
- `routes/web.php` — 3 new routes (submit, check, bulk-submit)
- `Invoices/Show.jsx` — EInvoicePanel: Hantar ke LHDN button, status badge, error display, QR link
- `Invoices/Index.jsx` — checkbox + bulk submit button + e-Invoice status column
- `pdf/invoice.blade.php` — QR code block bila status = valid
- `.env.example` — MYINVOIS_BASE_URL, CLIENT_ID, CLIENT_SECRET
- **Pending**: php artisan migrate + daftar myInvois sandbox credentials

**Mockup Generator**
- `screenshot/generate-screenshots.js` — Puppeteer auto-login (form-based), 6 screens (dashboard, invoices, quotations, DO, finance, inventory), social cards (square 1080×1080 + portrait 1080×1350) dengan SwiftBiz dark indigo branding
- **Pending**: run generator (PHP server kena start dulu)

**Social Media**
- Facebook client hook runbook created + updated dengan mockup generator integration
- 3 versi draft post SwiftBiz (Story, Threads, MDEC grant angle)
- Research: MDEC grant angle = biggest selling point (50% subsidi, up to RM5K)
- **Pending**: run mockup generator → upload shots.so → post

### 2026-04-12 — Rebranding: PokSystem → SwiftBiz
- Project renamed from "PokSystem" to "SwiftBiz" (SwiftApps ecosystem consistency)
- `projects/coding-projects/active/pok-system.md` → `swiftbiz.md` (file renamed)
- `projects/project-list.md` — row updated to SwiftBiz + new file reference
- `main/current-session.md` — Project Status table updated
- `.env.example` — `APP_NAME` changed from `"PokSystemManagement"` to `"SwiftBiz"`
- No hardcoded branding in JSX/PHP — all flows via `VITE_APP_NAME` env var
- **Pending (manual)**: Update `APP_NAME=SwiftBiz` in Railway environment variables

### 2026-02-23
- Project added to LRU system

### 2026-02-19 (5 commits)
- `2674755` — Force HTTPS (`URL::forceScheme('https')`) in AppServiceProvider
- `654a2df` — Trust all proxies for Railway
- `53fd087` — Redirect root `/` to login
- `12fed4e` — Fix Invoice Record Payment (wrong route + payment method)
- `85b0e29` — Fix blank PO & Inventory (PostgreSQL sum() returns string → parseFloat)

### 2026-02-19 (Env fixes)
- `APP_URL` had trailing space → "Invalid URI: Host is malformed"
- `APP_KEY` missing `base64:` prefix

## Known Issues
- Railway free tier discontinued — needs $5/month or migration
- Dynamic Tailwind classes (purged in build)

## Memory Patterns
- PostgreSQL `sum()` returns string → always `parseFloat()` before `.toFixed()`
- `URL::forceScheme('https')` + `trustProxies(at: '*')` for Railway HTTPS
- Supabase pooler in transaction mode for Laravel
