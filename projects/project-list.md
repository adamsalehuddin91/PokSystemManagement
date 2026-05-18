# Project List — Master Index

*LRU Project Management — Tokwi v5.5*
*Updated: 2026-05-16*

---

## Active Coding Projects (10/10)

| # | Project | Status | Last Accessed | File |
|---|---------|--------|---------------|------|
| 1 | SwiftTaska | 🟢 LIVE — PWA installed, child switcher, activity filter, demo ready | 2026-05-18 | `active/swifttaska.md` |
| 2 | MessyMates | 🔵 IN PROGRESS — 8 pages built, dev server running, Supabase pending | 2026-05-14 | `active/messymates.md` |
| 3 | LorryTech OS | 🟢 LIVE — Customers + Dashboard + Multi-company deployed | 2026-05-07 | `active/lorrytech-os.md` |
| 4 | SRITI School System | 🟢 LIVE — sritialfattah.swiftapps.my, user flow diagram saved | 2026-05-08 | `active/sriti-school.md` |
| 5 | SwiftApp OS | 🟢 LIVE — billing fixes deployed, stat cards accurate | 2026-05-06 | `active/swiftappos.md` |
| 6 | SwiftMoney | 🟢 LIVE (v1.7 — admin overhaul + Resend email) | 2026-05-06 | `active/swift-money.md` |
| 7 | HMS Salon | 🟢 LIVE (Edit Resit pembantu + auditor void deployed) | 2026-05-05 | `active/hms-salon.md` |
| 8 | Qalbu | 🟢 LIVE (frontend + API deployed) | 2026-04-19 | `active/qalbu.md` |
| 9 | SwiftPOS | 🟡 MVP BUILT — deploy pending | 2026-04-18 | `active/swiftpos.md` |
| 10 | Tokwi Homelab OS | 🔧 Phase 1-2 Done — Phase 3 on hold | 2026-04-17 | `active/tokwi-homelab-os.md` |

**Slots available**: 0 of 10

---

## Archived Coding Projects (2)

| Project | Archived | Reason |
|---------|----------|--------|
| MAAR Contractor | 2026-04-02 | Complete — slot freed for SwiftSalon |
| SwiftKedai | 2026-04-11 | Planned (10%) — slot freed for Qalbu |
| SwiftJiran | 2026-04-14 | Planned (20%) — slot freed for SwiftPOS |
| SwiftSalon | 2026-05-06 | Planning only — slot freed for MessyMates |
| SwiftStay | 2026-04-16 | MVP (localhost) — auto-archived, slot freed for Tokwi Homelab OS |
| Stock Monitor | 2026-04-28 | Auto-archived (LRU #11) — slot freed for SRITI School System |
| SwiftBiz | 2026-05-11 | Auto-archived (LRU #11) — slot freed for SwiftTaska |

---

## Commands

```bash
"new coding project [name]"   → Create project (enters at #1, shifts others down)
"load project [name]"          → Resume project (moves to #1)
"save project"                 → Save current project progress (not AI memory)
"list projects"                → Show this table
"archive project [name]"       → Manually archive
```

> `"save"` = saves AI memory only. `"save project"` = saves project only.

---

## LRU Rules

1. New/loaded project always enters at **Position #1**
2. Max **10 active** projects per type
3. **Position #11** auto-archives to `archived/`
4. Archived projects can be reloaded anytime (re-enter at #1)
5. `save project` does **not** change LRU position
