# Show Pending Protocol

**Trigger**: `"show pending"`, `"apa pending"`, `"pending semua"`, `"what's pending"`

---

## Purpose

Output consolidated pending items + blockers merentasi SEMUA active projects dalam satu view.
Guna untuk morning planning, weekly review, atau bila nak decide apa nak buat seterusnya.

---

## Steps

### 1. Read client status
```
Read projects/client-status.md
```
Get: client blockers, demo pending, waiting on items.

### 2. Read active project list
```
Read projects/project-list.md
```
Get: all 10 active projects + status.

### 3. Read each active project file (parallel)
Untuk setiap project dalam list, read `projects/coding-projects/active/[project].md`.
Extract sections:
- **PENDING** items
- **Blockers**
- Any "waiting on client" items

### 4. Output consolidated view

Format:

```
═══════════════════════════════════════
📋  PENDING DASHBOARD — [Date]
═══════════════════════════════════════

🔴 BLOCKED (waiting on someone else)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MessyMates    → Client assets (logo, banner, domain)
  SwiftTaska    → Client confirm demo slot
  SRITI         → Guru Besar confirm demo slot

🟡 ACTION NEEDED (Adam boleh buat sekarang)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SwiftMoney    → Send Founding Member email (10 users → Pro)
  HMS Salon     → Update google_review_url dalam DB
  SwiftAppOS    → Coolify volume /app/public/uploads — persistent logo
  LorryTech OS  → Company Settings CRUD page

🟢 NEXT UP (bila client respond)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MessyMates    → Supabase setup → admin wiring → Vercel deploy
  SwiftTaska    → Real DB integration lepas demo

📅 DEMOS PENDING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SwiftTaska    → Taska owner (slot this week)
  LorryTech OS  → Prospect (belum schedule)
  SRITI         → Guru Besar (belum schedule)

═══════════════════════════════════════
Total: [N] blocked | [N] actionable | [N] demos pending
```

### 5. Ask Adam

```
Nak focus mana dulu? Atau nak drill down satu project?
```

---

## Shortcut Views

Adam boleh request specific filter:

| Command | Output |
|---------|--------|
| `"show pending"` | Full dashboard (semua) |
| `"show blocked"` | Blocked items sahaja |
| `"show demos"` | Demo pipeline sahaja |
| `"pending [project]"` | One project drill-down |
