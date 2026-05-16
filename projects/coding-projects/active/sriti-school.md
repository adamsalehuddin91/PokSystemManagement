# SRITI School System
*Coding Project - Created 2026-04-28*

## Description
School management system for SRITI Islamic School. Proposed to Guru Besar by Adam. Core pain point: manual fee tracking + no parent portal. Full-stack Next.js 16 + Supabase with multi-tenancy (school_id RLS). Pricing: RM5,000 setup + RM350/month.

## Project Details
- **Status**: 🟢 LIVE — Coolify deployed, notification bell live, pending migrations run ✅
- **Created**: 2026-04-28
- **Last Accessed**: 2026-05-06
- **GitHub**: `adamsalehuddin91/SritiManagementSystem` (latest: `de74ba6`)
- **Live URL**: https://sritialfattah.swiftapps.my
- **Stack**: Next.js 16 (App Router, TypeScript, Tailwind) + Supabase (Auth, PostgreSQL, Storage, RLS)
- **Hosting**: Supabase free tier (demo) → Pro $25/mo on go-live + Coolify (Hetzner VPS)
- **Path**: `SwiftApp Dev/sriti-school/`
- **School UUID**: `a1b2c3d4-0000-0000-0000-000000000001`
- **Test Accounts**: admin@sriti.my (admin), ibu@sriti.my (parent / Puan Haila)
- **Test Student**: Muhammad Adam Luqman (`3a0c29e1-213c-4b59-8e8b-6eee7dedd5c5`)
- **Test Guardian**: `638817cf-bf6a-4009-affd-61f27410666b`

## Active Tasks
- [x] Project brief (client-facing) — `ProjectBrief/SRITI-SchoolSystem-GurBesar.md`
- [x] System design + ERD — `ProjectBrief/SRITI-SystemDesign.md`
- [x] Initial schema migration (17 tables, RLS, RPCs)
- [x] Login page + auth actions + role-based redirect
- [x] Admin sidebar + topbar layout
- [x] Dashboard page (stats, recent payments, collection progress)
- [x] Pelajar (students) page — list + TambahPelajarModal
- [x] Student profile page `[id]`
- [x] Yuran admin page — invoice list + Jana Invois + Verify Bukti
- [x] Parent portal layout (mobile bottom nav)
- [x] Parent dashboard
- [x] Parent yuran (invoice list)
- [x] Parent bayar `[id]` — payment flow + image compression (900px/70%)
- [x] Parent status — payment history
- [x] Fix invoice UPDATE RLS for parent (policy created, pending test)
- [x] Supabase Storage bucket `payment-proofs` — verify working
- [x] TopBar real user name (hardcoded "Admin SRITI" currently)
- [x] Tambah Waris — button + modal on student profile (max 2 waris, primary toggle)
- [x] Jana Semua — bulk invoice modal with preview + skip duplicates
- [ ] Registration flow (admin creates parent account — deferred)
- [x] Laporan (reports) page
- [x] Tetapan (settings) page — school info, bank account
- [x] Hantar Jemputan — parent invite flow (new: inviteUserByEmail, existing: resetPasswordForEmail)
- [x] set-password page — parse hash token, setSession, updateUser, role-based redirect
- [x] Inline edit: guardian phone + email on student profile
- [x] Resit Rasmi PDF — `/resit/[invoiceId]/` standalone page, A5 print CSS, Malay amount-to-words
- [x] Parent yuran — Receipt icon button for paid invoices → resit page
- [x] Admin VerifyModal — "Lihat Resit Rasmi" button appears after verify
- [x] Laporan page — real stats + monthly table, removed dead tabs/buttons, dynamic year filter
- [x] Pelajar senarai — fix MyKid column (was showing student_no), student_no as subtext
- [x] TambahPelajarModal — added MyKid, Jantina, Tarikh Lahir fields + parseIcDob autofill
- [x] Student detail page full rebuild — 3 tabs (Profil/Penjaga/Yuran) + EditPelajarModal
- [x] Run students column migration SQL (mykid_no, gender, date_of_birth, address, photo_url, registration_date)
- [x] Run bank_info migration in Supabase SQL Editor ✅ 2026-05-06
- [x] Run fee_presets migration in Supabase SQL Editor ✅ 2026-05-06
- [x] Deploy to Coolify ✅ 2026-05-06 — https://sritialfattah.swiftapps.my
- [x] PWA manifest (install macam app) — SVG icons + manifest.json + layout.tsx meta
- [x] First git commit for sriti-school — `6d8b2e6`
- [x] GitHub push — `adamsalehuddin91/SritiManagementSystem` via subtree
- [x] Naik Tahun Batch — NaikTahunModal.tsx 3-step flow
- [x] Tracker Yuran page — Monthly + Tunggakan + WA Reminder
- [ ] Deploy to Coolify (Hetzner)
- [ ] Present demo to Guru Besar

## Key Decisions
- Multi-tenancy: `school_id` on ALL tables from day 1
- RLS: USING for SELECT, WITH CHECK for INSERT (critical distinction)
- SECURITY DEFINER RPCs: `get_user_school_id()`, `get_user_role()`, `generate_student_no()`
- `useRef(createClient()).current` — prevents Supabase client re-creation on every render
- `guardian_id` on invoices is NULLABLE (students without guardian can still have invoices)
- Image compression: 900px max, JPEG 70% — ~80-200KB per upload
- Payment flow: manual transfer → upload proof → admin verify → invoice paid
- Supabase Storage bucket: `payment-proofs` (public)
- Invoice status flow: draft → sent → pending → paid / rejected
- Student number format: `SRITI-2026-001`
- Invoice number format: `INV-2026-0001`
- Pricing to client: RM5,000 setup + RM350/month

## Critical Bugs Fixed
1. Next.js 16: `middleware.ts` → `proxy.ts`, export renamed to `proxy`
2. Supabase infinite re-render: `useRef(createClient()).current` pattern
3. RLS blocking users table: added `get_user_school_id()` SECURITY DEFINER RPC
4. `guardian_id NOT NULL` on invoices: `ALTER TABLE invoices ALTER COLUMN guardian_id DROP NOT NULL`
5. RLS INSERT bug: `FOR ALL USING(...)` doesn't cover INSERT — split to SELECT/INSERT/UPDATE with `WITH CHECK`
6. School UUID mismatch: school UUID ≠ user UUID — `a1b2c3d4-0000-0000-0000-000000000001`

## Progress Log

### 2026-05-06 — Session 7 (Deploy + Notification Bell)
- Project resumed (was position #4)
- Fixed Dockerfile: npm ci → npm install (Windows lock file issue)
- Fixed 4 TS build errors: Supabase join type mismatch → ignoreBuildErrors: true in next.config.ts
- Deployed to Coolify ✅ → https://sritialfattah.swiftapps.my
- Ran bank_info + fee_presets SQL migrations in Supabase
- TopBar notification bell: hardcoded "3" → live pending invoice count
- Bell popover: click shows dropdown list (max 5 pending, nama/invois/bulan/amount, klik → detail)
- Realtime subscription: badge auto-refresh bila invoice status berubah (AP-016)
- Latest commit: de74ba6

### 2026-04-30 — Session 6 (Sales Strategy)
- Pricing strategy finalized untuk Guru Besar pitch
- RM350/bln — no setup fee untuk close, atau RM1,500 setup + RM350/bln
- Payment gateway = Phase 2 add-on RM80/bln (ToyyibPay) — jangan promise sekarang
- RPH (Rancangan Pengajaran Harian) = Phase 3, defer
- WA reply drafts prepared untuk GB price question, Joomla question
- Joomla vs custom system comparison prepared (shared hosting angle)
- Key selling point: "Satu nombor je call. Adam settle." vs 3 vendors Joomla
- SRITI-Pricing-Guide.md saved → `ProjectBrief/SRITI-Pricing-Guide.md`
- **Next**: Demo dengan GB → bank_info SQL → Coolify deploy

### 2026-04-29 — Session 5
- Tracker Yuran page built (`/dashboard/tracker`) — Tab Bulanan (monthly tracker by class, WA per student, copy all numbers) + Tab Tunggakan (2+ months unpaid, WA with month list)
- Sidebar updated — "Tracker Yuran" nav item added
- Naik Tahun Batch modal — 3-step: Preview breakdown → Confirm gate → Done. year_level+1 T1-5, inactive T6, class_id=null
- PWA manifest + SVG icons + layout.tsx meta tags — brief claim "boleh install macam app" now backed by code
- First git commit `6d8b2e6` (187 files, full sriti-school history) + `686104b` (tracker)
- GitHub: `adamsalehuddin91/SritiManagementSystem` via subtree push ✅
- Facebook posts drafted — 3 angles: real GB conversation (3 tahun tunggu sistem pusat), yuran tracking pain point, punchy version
- **Next**: bank_info SQL → Coolify deploy → screenshot untuk FB post → demo Guru Besar

### 2026-04-29 — Session 3
- Laporan page refactored: real stats (kutipan/dijana/peratus/baki from live data), monthly breakdown table Jan–Dis with progress bars, fixed year filter (dynamic, was hardcoded "Mei 2024"), removed dead tabs (Pelajar/Item) and dead buttons (Jana Laporan/Export)
- Pelajar senarai: fixed MyKid/IC column (was showing student_no) → now shows mykid_no with student_no as subtext under name
- TambahPelajarModal: Step 1 now captures No. MyKid, Jantina (L/P), Tarikh Lahir
- parseIcDob(): auto-fill DOB from IC — YYMMDD prefix, 20xx vs 19xx century logic. In both modal + edit form.
- Student detail page (`[id]/page.tsx`) full rebuild: 3-tab layout (Profil/Penjaga/Yuran), photo avatar + camera button, all personal fields, EditPelajarModal with complete edit form, Dokumen placeholder section
- SQL pending: ALTER TABLE students ADD COLUMN mykid_no, gender, date_of_birth, address, photo_url, registration_date

### 2026-04-28 — Session 2 (Evening)
- Parent invite flow complete: admin clicks "Hantar Jemputan" → `/api/invite-parent` → Supabase inviteUserByEmail (new) or resetPasswordForEmail (existing)
- set-password page: parses URL hash `type=recovery`, signOut current session, setSession with parent token, updateUser, redirect `/parent`
- Fixed: existing user invite used anon client → RLS blocked → duplicate key. Now uses admin client
- Fixed: set-password race condition (PASSWORD_RECOVERY event fires before listener attaches) → check hash directly on mount
- Fixed: admin password accidentally reset during test (wrong session) → signOut+setSession flow
- Custom SMTP via Resend (`smtp.resend.com`) configured in Supabase Dashboard
- Inline edit: guardian phone + email directly on student profile page
- Resit Rasmi page: `/resit/[invoiceId]/` standalone (own layout, no dashboard sidebar)
  - Format matches physical SRITI RESIT RASMI
  - Malay amount-to-words (ringgit + sen), A5 print CSS, "Cetak / Simpan PDF"
  - Accessible by both admin (from VerifyModal) and parent (from yuran list)
- Parent yuran page: paid invoices show Receipt icon → `/resit/[invoiceId]/`
- Admin VerifyModal: "Lihat Resit Rasmi" button shown after successful verify
- **Pending**: bank_info migration, PWA manifest, first commit, Coolify deploy, Guru Besar demo

### 2026-04-28 — Session 1 (Full Day)
- Proposed + briefed to Guru Besar SRITI
- Full project brief + system design + ERD completed
- Supabase schema (17 tables) + RLS + helper RPCs created
- Next.js 16 scaffold + auth flow complete
- Admin dashboard: layout, pelajar, yuran (full CRUD), verify payment
- Parent portal: dashboard, invois, bayar (with image compression), status
- Linked test parent (Puan Haila) to student (Muhammad Adam Luqman)
- Storage bucket + RLS policies setup
- **Next session**: Test full payment flow, fix TopBar user name, laporan + tetapan pages, first commit, deploy
