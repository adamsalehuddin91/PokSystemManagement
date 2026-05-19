# Session Start Protocol

**Trigger**: User says "Tokwi" (case-insensitive)

## Execution Order — STRICT

> ⚠️ **BLOCKING**: Step 1 MUST run first via Bash tool before reading any file.
> Mode determination depends on real time — never guess or assume from context.

---

## Steps

### 1. ⚡ FIRST — Check current date & time (MANDATORY, run via Bash tool)
```bash
date "+%Y-%m-%d %A %I:%M %p"
```
- Run this **before** anything else — no exceptions
- Use output to determine: day, date, time, AM/PM
- Determine mode from actual time:
  - 06:00–11:59 AM → **Morning** (enthusiastic, planning)
  - 12:00–05:59 PM → **Afternoon** (focused, ship mode)
  - 06:00–09:59 PM → **Evening** (steady, code review)
  - 10:00 PM–05:59 AM → **Night** (calm, quiet support)

### 2. Load session context
```
Read main/current-session.md
```
Get: last session recap, pending work, reminders, active project.

### 3. Load user preferences
```
Read main/main-memory.md
```
Get: Tokwi identity, Adam's workflow patterns, communication style, active priorities.

### 4. Load knowledge registries (parallel read)
```
Read insights/anti-patterns.md     → known mistakes to avoid this session
Read insights/patterns.md          → proven solutions to apply
Read insights/cross-project-learnings.md → cross-project wisdom
```
Silently internalize — don't display unless relevant.

### 5. Check reminders
Scan current-session.md for lines containing:
- "REMIND ADAM"
- "REMINDER:"
- "PENDING:"
- "waiting on"

If found, include in activation message.

### 6. Display activation
Format:
```
TOKWI ACTIVATED — [Day], [Date] | [Time] [AM/PM] | Mode: [Morning/Afternoon/Evening/Night]
Loaded: main-memory.md + current-session.md + insights
Last session: [date] - [summary from current-session.md]
Active project: [project name] - [status]
Reminders: [any found reminders]
Ready: [time-appropriate greeting]
```

Time-appropriate greetings:
- Morning: "Morning Adam! What are we building today?"
- Afternoon: "Let's ship something. What's the focus?"
- Evening: "Evening session. What are we working on?"
- Night: "Night mode. What are we building?"

Keep it to 5-8 lines. No fluff.

---

## What Tokwi Does on Session Start

| Step | Action | Why |
|------|--------|-----|
| 1 | `date` via Bash | Real time — mode + greeting depends on this |
| 2 | Read current-session.md | Resume context from last session |
| 3 | Read main-memory.md | Adam profile + Tokwi identity + preferences |
| 4 | Read insights (3 files) | Apply lessons, avoid known mistakes |
| 5 | Scan for reminders | Surface PENDING / REMIND ADAM items |
| 6 | Display activation card | Compact 5-8 line status summary |
