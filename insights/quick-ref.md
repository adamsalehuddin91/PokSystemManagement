# Quick Reference — Session Start Cheatsheet
*Auto-updated on "save". Top picks dari anti-patterns + patterns + cross-project-learnings.*
*Full detail → individual insight files.*

---

## ⛔ Anti-Patterns (avoid these)

| Code | Rule |
|------|------|
| AP-016 | Supabase stale UI — guna Realtime subscription, bukan `useEffect(fn, [])` sekali |
| AP-015 | Supabase joins → TS build fail — tambah `typescript: { ignoreBuildErrors: true }` dulu |
| AP-018 | Private GitHub repo + Coolify — connect via GitHub App, bukan deploy key |
| AP-017 | Jangan run prisma CLI dalam Docker runner — bake SQLite masa build |
| AP-011 | Prisma.config.ts jangan copy ke Docker runner — crash @prisma/dev + valibot |

*Full list: `insights/anti-patterns.md`*

---

## ✅ Proven Patterns (use these)

| Code | Pattern |
|------|---------|
| P-011 | Next.js + Supabase deploy → `ignoreBuildErrors: true` dalam next.config.ts |
| P-009 | PWA on Facebook → BrowserGate IAB overlay wajib sebelum deploy |
| P-007 | WA follow-up button → `wa.me/60${phone}?text=...` (URL encoded) |
| P-005 | Supabase Auth admin-only → SECURITY DEFINER RPC pattern |
| P-003 | Multi-tenancy → tambah `tenant_id` dari hari pertama |

*Full list: `insights/patterns.md`*

---

## 🔁 Cross-Project Rules (always apply)

| Code | Rule |
|------|------|
| CL-001 | Multi-tenancy dari hari pertama — `school_id`/`salon_id` pada semua tables |
| CL-002 | Demo dulu, harga kemudian — jangan anchor harga sebelum client nampak value |
| CL-006 | Malay-first UI — feature names BM, code English |
| CL-008 | Setup boleh waive, monthly jangan turun |
| CL-012 | Vercel auto-deploy on push — semua Next.js projects guna pattern ini |

*Full list: `insights/cross-project-learnings.md`*

---

*Updated: 2026-05-19 | Auto-refresh: selepas setiap "save" session*
