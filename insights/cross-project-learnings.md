# Cross-Project Learnings
*Lessons yang apply merentasi semua projects — bukan project-specific*

---

## Architecture Decisions

### CL-001 — Multi-tenancy dari hari pertama
**Learning:** Tambah `school_id` / `salon_id` / `tenant_id` pada SEMUA tables dari awal, walaupun MVP hanya ada 1 tenant.
**Kenapa:** Retrofit multi-tenancy selepas launch = migration nightmare + RLS rewrite.
**Apply to:** Setiap new SaaS project.
**Learned from:** SRITI School System (2026-04-28)

---

### CL-002 — Demo dulu, harga kemudian
**Learning:** Jangan anchor harga sebelum client nampak value. Demo → value visible → harga rasa berbaloi.
**Apply to:** Semua client conversations.
**Learned from:** SRITI GB pricing conversation (2026-04-30)

---

### CL-003 — Setup fee sacrificeable, monthly tidak
**Learning:** Setup fee = one-time, boleh waive untuk close deal. Monthly = recurring income, jangan turun.
**Apply to:** Semua SwiftApps quotations.
**Learned from:** SRITI, Messy Playgroup pricing (2026-04-30)

---

### CL-004 — First client dalam segment baru = portfolio play
**Learning:** Harga first client dalam segment baru boleh lebih rendah — testimoni + case study bernilai lebih dari setup fee.
**Apply to:** Setiap kali masuk market segment baru.
**Learned from:** SRITI (first school client) (2026-04-30)

---

## Coding Patterns

### CL-005 — Atomic operations dalam SECURITY DEFINER RPC
**Learning:** Operations yang involve multiple tables (sales + commissions + stock + points) kena dalam satu RPC dengan proper rollback.
**Why:** Client-side multi-step = race condition + partial failure risk.
**Apply to:** Setiap feature yang touch 3+ tables.
**Learned from:** HMS Salon complete_sale, edit_sale, void_sale (2026-04)

---

### CL-006 — Jangan bina dari scratch kalau SaaS free dah ada
**Learning:** CRM untuk personal use → HubSpot free. Jangan spend 4-5 sesi bina benda yang dah ada percuma.
**Apply to:** Internal tools, personal productivity. Client projects = bina sendiri untuk control + MRR.
**Learned from:** CRM discussion (2026-04-30)

---

### CL-007 — Infra cost target: RM 145/bln per project
**Learning:** Supabase Pro (~RM118) + Hetzner share (~RM20) + Domain (~RM7) = ~RM145/bln.
**Apply to:** Setiap project pricing — margin target minimum RM150-200/bln selepas infra.
**Learned from:** HMS Salon, SRITI pricing calculation (2026-04-30)

---

### CL-008 — Mutable state vs original props untuk visibility
**Learning:** UI visibility yang bergantung pada "original saved data" mesti guna props/original data — bukan mutable state yang user sedang edit.
**Apply to:** Setiap edit modal yang ada conditional rendering.
**Learned from:** HMS Salon EditReceiptModal pembantu dropdown (2026-04-30)

---

## Deployment

### CL-009 — Coolify + Hetzner untuk semua self-hosted projects
**Stack:** Hetzner VPS → Coolify (container management) → Cloudflare (DNS + SSL).
**Next.js:** Deploy as Docker container atau Nixpacks.
**Laravel:** PHP-FPM + Nginx + Supervisor dalam Dockerfile.
**Learned from:** SwiftBiz, Qalbu, SRITI (2026-04)

---

### CL-010 — Vercel untuk Next.js client projects
**Rule:** HMS Salon → Vercel (auto-deploy on push, zero config, free tier cukup).
**Coolify → bila perlu:** Custom domain strict, multiple services, Laravel/PHP.
**Learned from:** HMS Salon production setup

---

## Client Management

### CL-011 — Jangan sebut tech stack kepada non-tech client
**Learning:** "Next.js + Supabase" = confuse GB/client. Cakap capability je: "sistem yang dibina khas, selamat, boleh tambah feature."
**Apply to:** Semua client-facing conversations.
**Learned from:** SRITI GB conversation (2026-04-30)

---

### CL-012 — GB/decision maker sebagai internal champion
**Learning:** Bila keputusan melibatkan AJK/board, kena bagi GB enough ammo untuk jual ke atas — bukan Adam yang jual ke AJK.
**Apply to:** Sekolah, NGO, organisasi dengan hierarki.
**Learned from:** SRITI pricing strategy (2026-04-30)

---

## Format Entry Baru
```
### CL-XXX — [Nama Learning]
**Learning:** [apa yang dipelajari]
**Apply to:** [bila/di mana apply]
**Kenapa:** [reasoning]
**Learned from:** [project + tarikh]
```

---
*Last updated: 2026-04-30 | Total learnings: 12*
