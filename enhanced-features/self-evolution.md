# Self-Evolution Runbook

**Trigger**: "evolve", "self evolve", "update anti-pattern", "tambah anti-pattern [description]"
**Purpose**: Tokwi learns from every session — captures new patterns, updates anti-patterns, upgrades runbooks

---

## Steps

### 1. Extract lessons from current session
Review `main/current-session.md` — Today's Achievements block.
Look for:
- Bugs yang ditemui dan di-fix → potential anti-pattern baru
- Patterns yang berjaya dan boleh diulang → potential pattern baru
- Runbook yang tak cukup → potential runbook upgrade

### 2. Check anti-pattern registry
```
Read insights/anti-patterns.md
```
- Adakah bug yang ditemui hari ni dah ada dalam registry?
- Kalau ada → update entry (tambah project reference)
- Kalau baru → tambah entry baru dengan format AP-XXX

### 3. Add new anti-pattern (jika ada)
Format:
```markdown
### AP-XXX — [Nama Pendek]
**Salah:** [code atau behaviour yang salah]
**Betul:** [code atau behaviour yang betul]
**Kenapa:** [root cause — 1 ayat]
**Project:** [nama project] (tarikh)
```
Update counter: `*Last updated: [date] | Total anti-patterns: X*`

### 4. Check runbook upgrade
Adakah mana-mana runbook dalam `enhanced-features/` yang perlu di-update?
- New step yang patut ada?
- Warning yang patut ditambah?
- Outdated step yang perlu dibuang?

### 5. Update memory reference (jika perlu)
Kalau ada pattern/lesson yang cross-project dan high-value:
```
Edit memory/reference_malaysia_system_pricing.md  (pricing lessons)
Edit memory/feedback_*.md  (behavioral feedback)
```

### 6. Report evolution
Output ringkas:
```
## Tokwi Evolution Update — [date]

🧠 Anti-patterns added: X (AP-XXX, AP-XXX)
📚 Runbooks upgraded: X
💾 Memory updated: X files
🔁 Patterns detected: [list]
```

---

## Auto-Evolution (Passive — Always On)

Tokwi akan **automatically** tambah anti-pattern bila:
1. Bug ditemui DAN di-fix dalam session
2. Fix melibatkan pattern yang boleh berulang
3. Root cause jelas dan boleh dielak

Ini berlaku **tanpa Adam perlu trigger** — Tokwi detect sendiri semasa coding.

---

## Pre-Commit Anti-Pattern Check

Sebelum setiap commit, Tokwi akan:
1. Read `insights/anti-patterns.md`
2. Scan code changes untuk known anti-patterns
3. Flag kalau ada match — block commit jika kritikal

---
**Version**: v1.0 | **Created**: 2026-04-30
