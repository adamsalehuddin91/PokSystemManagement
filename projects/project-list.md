# Project List — Master Index

*LRU Project Management — Tokwi v5.5*
*Updated: 2026-05-23*

---

## Active Coding Projects (10/10)

| # | Project | Status | Last Accessed | File |
|---|---------|--------|---------------|------|
| 1 | SwiftRent | 🔨 IN BUILD — Scaffold starting, fleet+booking+customer modules | 2026-05-23 | `active/swiftrent.md` |
| 2 | SwiftStay v2 | 🟡 IN PROGRESS — Scaffold + screenshots done, Supabase wiring pending | 2026-05-21 | `active/swiftstay-v2.md` |
| 3 | MessyMates | 🟡 ON HOLD — UI done, waiting client assets (logo, banner, domain) | 2026-05-20 | `active/messymates.md` |
| 4 | SwiftTaska | 🟢 LIVE — Theme A Sage Warm, Phosphor icons, code review pass, pricing toggle done | 2026-05-22 | `active/swifttaska.md` |
| 5 | LorryTech OS | 🟢 LIVE — Customers + Dashboard + Multi-company deployed | 2026-05-07 | `active/lorrytech-os.md` |
| 6 | SRITI School System | 🟢 LIVE — sritialfattah.swiftapps.my, user flow diagram saved | 2026-05-08 | `active/sriti-school.md` |
| 7 | SwiftApp OS | 🟢 LIVE — billing fixes deployed, stat cards accurate | 2026-05-06 | `active/swiftappos.md` |
| 8 | SwiftMoney | 🟢 LIVE (v1.7 — admin overhaul + Resend email) | 2026-05-06 | `active/swift-money.md` |
| 9 | HMS Salon | 🟢 LIVE (Edit Resit pembantu + auditor void deployed) | 2026-05-05 | `active/hms-salon.md` |
| 10 | Qalbu | 🟢 LIVE (frontend + API deployed) | 2026-04-19 | `active/qalbu.md` |

**Slots available**: 0 of 10
⚠️ SwiftPOS auto-archived (was #10 → moved to #11)

---

## Archived Coding Projects (2)

| Project | Archived | Reason |
|---------|----------|--------|
| MAAR Contractor | 2026-04-02 | Complete — slot freed for SwiftSalon |
| SwiftKedai | 2026-04-11 | Planned (10%) — slot freed for Qalbu |
| SwiftJiran | 2026-04-14 | Planned (20%) — slot freed for SwiftPOS |
| SwiftSalon | 2026-05-06 | Planning only — slot freed for MessyMates |
| SwiftStay v1 | 2026-04-16 | MVP (localhost, SQLite) — reference only, superseded by SwiftStay v2 |
| Tokwi Homelab OS | 2026-05-20 | Phase 2 partial — auto-archived (LRU #11), slot freed for SwiftStay v2 |
| Stock Monitor | 2026-04-28 | Auto-archived (LRU #11) — slot freed for SRITI School System |
| SwiftBiz | 2026-05-11 | Auto-archived (LRU #11) — slot freed for SwiftTaska |
| SwiftPOS | 2026-05-23 | Auto-archived (LRU #11) — slot freed for SwiftRent |

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
