# Session Archive — April–May 2026
*Auto-archived dari current-session.md pada 2026-05-19*
*Detail penuh ada dalam git log. Ini summary sahaja.*

---

## 2026-05-14 — MessyMates Full Build

**Project:** MessyMates (Next.js 16 + Tailwind + Supabase)
**Achievements:**
- 8 pages built: `/` + `/booking` + `/booking/checkout` + `/admin/login` + `/admin/inquiries` + `/admin/customers/[id]` + `/admin/programs` + `/admin/products`
- Wireframe updated (8 pages) — synced dengan client mockup
- Scope decision: absorb extra 3 pages (RM1.5K locked)
- Dev server running: http://localhost:3000
**Pending:** Supabase setup + client assets + deploy

---

## 2026-05-12 — SwiftTaska Missing Pages + Parent PWA

**Project:** SwiftTaska
**Achievements:**
- 8 admin/parent pages built (Student Details, Tambah Penjaga, Rekod Bayaran, Tetapan, 4 Parent PWA pages)
- Docs: `ProjectBrief/SwiftTaska-System-Guide.md`
**Commits:** Pending (belum commit this session)

---

## 2026-05-11 — SwiftTaska Demo UI Complete

**Project:** SwiftTaska
**Achievements:**
- 11 screens built dari scratch (pixel-perfect dari ChatGPT mockup)
- recharts integrated (AreaChart, BarChart, PieChart)
- First commit: `1321bec` — 106 files
- Wireframe + Demo Guide saved
**Commits:** `1321bec`

---

## 2026-05-08 — Tokwi Diagram Engine v2.0 + SRITI & MessyMates Diagrams

**Project:** Tokwi MemoryCore + SRITI + MessyMates
**Achievements:**
- diagram-generator.md upgraded v1.0 → v2.0 (User Flow + ASCII Wireframe)
- SRITI user flow saved: `SwiftApp Dev/sriti-school/USER-FLOW.md`
- MessyMates user flow + wireframe saved in `ProjectBrief/`

---

## 2026-05-07 — MessyMates Deposit + Design

**Project:** MessyMates
**Achievements:**
- Deposit received RM750 (50% dari RM1,500)
- Design direction confirmed: Teal primary, Coral secondary, Soft Yellow accent
- WA checklist drafted untuk client

---

## 2026-05-06 Session 3 — SRITI Deploy + Notification Bell

**Project:** SRITI School System
**Achievements:**
- First Coolify deploy (4 build rounds)
- Realtime notification bell (live count dari invoices pending)
- AP-015 + P-011 + AP-016 registered
**Live:** https://sritialfattah.swiftapps.my
**Commits:** `18311e8` → `e83ac7d` → `e551ef6` → `d0205ab` → `de74ba6`

---

## 2026-05-06 Session 2 — SwiftAppOS Billing Fixes

**Project:** SwiftAppOS
**Achievements:**
- MessyMates project registered (`projects/coding-projects/active/messymates.md`)
- 6 billing fixes: expense presets, invoice T&C, invoice edit for Sent, project link, billing stat cards
**Commits:** `8bbf14d` → `fe60619` → `6a694f4` → `30b1ccc` → `78d719e`

---

## 2026-05-06 Session 1 — SwiftMoney Register Modal + OOM Fix + Admin Bulk Email

**Project:** SwiftMoney
**Achievements:**
- Register Modal on login page
- Forgot/Reset Password redesign (BM)
- Dockerfile OOM fix (Alpine → Debian)
- Admin bulk email `/admin/users`
- Admin clickable stat cards
**Commits:** `c4110e8` → `0546852` → `dc06e48` → `19b6b7c` → `51f7380`

---

## 2026-05-05 Session 6 — HMS Reports Tally Fix + Customer Import

**Project:** HMS Salon
**Achievements:**
- PWA landscape fix (`orientation: "any"`)
- Customer import: 5,503 unique records dari Excel
- Reports tally fix: revenue dari sale_items (not commissions — double-count fix)
**Commits:** `ab517b7`, `13342ac`

---

## 2026-05-05 Session 5 — SwiftAppOS Logo + PDF + Delete

**Project:** SwiftAppOS
**Achievements:**
- Logo upload (`/api/settings/logo`), PDF logo render
- Delete invoice + quotation
- Dockerfile EACCES fix
- Logo URL fix (relative → absolute for react-pdf)
**Commits:** `66d5fb2` → `83a768d` → `8c91402`

---

## 2026-05-05 Session 4 — SwiftAppOS Billing + Coolify TS Fixes

**Project:** SwiftAppOS
**Achievements:**
- Receipt PDF + receipt numbers clickable
- Convert quotation → invoice (stage selector)
- Invoice.projectId optional (schema change + migration)
- 8 Coolify TS cascade fixes
**Commits:** `2eda4d9` → `0863db7` (8 commits)

---

## 2026-05-04 — HMS Salon + SwiftAppOS Deploy

**Project:** HMS Salon + SwiftAppOS
**Achievements:**
- ConfirmSaleModal: blocks checkout if service has no stylist
- `get_public_receipt` SQL fixed (column names)
- WA resend button fetches fresh data
- SwiftAppOS: Quotation Generator + Coolify Docker fixes (valibot)
**Commits:** `a27fa99` (HMS), `63a3a51` → `74552ec` (SwiftAppOS)

---

## 2026-04-30 — SRITI Sales Strategy + Memory Core v2.0

**Project:** SRITI + Tokwi MemoryCore
**Achievements:**
- SRITI pricing finalized: RM350/bln, demo dulu
- WA reply drafts untuk Guru Besar
- Memory Core v2.0: 4 knowledge registries created (error-registry, anti-patterns, patterns, cross-project-learnings)
- Memory migrated ke portable E:\ drive

---

## 2026-04-30 — HMS Salon Edit Resit + Auditor Void

**Project:** HMS Salon
**Achievements:**
- Second stylist fix in Edit Resit
- Auditor pembantu dropdown editable
- Auditor void button + mandatory remark
- Commission rate fix when pembantu removed
**Commit:** `23309bb`

---

## 2026-04-29 — SRITI Sessions 3-5

**Project:** SRITI School System
**Achievements (combined):**
- Laporan page refactor (real invoice data)
- Pelajar module: IC parse DOB, student detail page 3 tabs
- Diskaun automatik (adik-beradik + Ramadan + manual)
- WA share dengan payment link
- Tracker Yuran (bulanan + tunggakan)
- Naik Tahun batch modal
- PWA manifest
- First git commit `6d8b2e6` (187 files) → pushed to GitHub
- FB posts drafted (3 angles)
**Commits:** `6d8b2e6`, `686104b`

---

## 2026-04-28–29 — SRITI Session 2

**Project:** SRITI School System
**Achievements:**
- Tambah Waris modal + inline edit
- Jana Semua bulk invoice modal
- Parent Invite flow (Resend SMTP via Supabase)
- Resit Rasmi page (A5 print, Arabic bismillah, amountToWords)
- set-password page with hash parse

---

## 2026-04-28 — SRITI Session 1

**Project:** SRITI School System
**Achievements:**
- Full MVP build dari scratch (17 tables, RLS, auth, admin + parent portal)
- Image compression (Canvas API, 900px/70%)
- 6 critical bugs fixed

---

## 2026-04-26 — HMS Salon Facebook Post

**Project:** HMS Salon (Marketing)
**Achievements:**
- 3 Facebook post versions drafted (Story / Threads / MDEC)
- Screenshot guidance untuk shots.so

---

## 2026-04-25 — HMS Salon Sessions 1-2

**Project:** HMS Salon
**Achievements:**
- Auditor Access expansion
- Commission admin-only tab
- WA Share zero download
- Public Receipt Page `/receipt/[saleId]`
- WA Format Option B (warm + personal)
- Edit Resit feature (Auditor)
- SECURITY DEFINER RPC `edit_sale`
**Commits:** `7d8a399` → `32cdd30` (12 commits)

---

## 2026-04-22 — SwiftMoney IAB Detection + HMS Edit Resit

**Project:** SwiftMoney + HMS Salon
**Achievements:**
- BrowserGate refactor: overlay → banner → hidden (3 states)
- WA upgrade link fix
- Mockups generated → `iab-mockup-output/`
- HMS: Auditor Role Expansion, POS Customer History
**Commits:** `f0220f9` → `31620ce` (SwiftMoney)
