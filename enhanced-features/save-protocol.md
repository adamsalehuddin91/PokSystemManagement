# Save Protocol

**Trigger**: User says "save"

## Steps

### 1. Read current session state
```
Read main/current-session.md
```
Note what's already recorded vs what happened this session.

### 2. Get git status for active project
```
Bash: cd "<active-project-path>" && git log --oneline -5
Bash: cd "<active-project-path>" && git status
```
Capture: latest commit hash, branch, uncommitted changes.

### 3. Archive old sessions (auto-trim)

Before writing new content, check session count in `current-session.md`:
- Count `## Today's Achievements` headers
- If **more than 3 sessions** exist → archive oldest sessions

**Archive rule:**
```
Sessions > 3 → move to main/session-archive/YYYY-MMM.md
Keep only: today + 2 most recent
```

**Archive format** (compressed — NOT full detail):
```markdown
## YYYY-MM-DD — [Project] — [One-line summary]
- Key achievements (3-5 bullets max)
- Commits: `hash` → `hash`
- PENDING: [if any]
```

Create `main/session-archive/` file if not exists. Append if file exists for same month.

### 4. Update current-session.md
```
Edit main/current-session.md
```
Update these sections:
- **Session Status**: today's date + project + "SESSION SAVED"
- **Today's Achievements**: add this session's work (commits, features, fixes)
- **Active Project**: update status, pending items
- **Key Projects Status**: update table if any status changed

### 4. Update main-memory.md (if needed)
```
Read main/main-memory.md
Edit main/main-memory.md
```
Only update if new patterns learned about Adam:
- New workflow preferences
- New tool preferences
- Schedule/availability patterns

### 5. Update developer-guild-card.md (if applicable)
```
Read main/developer-guild-card.md
Edit main/developer-guild-card.md
```
Update stats if:
- New commits pushed
- New features shipped
- Bugs fixed
- New projects started

### 6. Auto-review changed files (silent background check)

Get recently changed files:
```
Bash: cd "<active-project-path>" && git diff --name-only HEAD~1
```
If files exist, run HIGH/AUTO-FAIL scan silently:
```
Grep pattern="console\.(log|error|warn)|dd\(|dump\(" path="<changed-files>"
Grep pattern="innerHTML|dangerouslySetInnerHTML|eval\(" path="<changed-files>"
Grep pattern="(password|secret|api_key)\s*=\s*['\"][^'\"]{8,}" path="<changed-files>" -i
Grep pattern=": any" path="<changed-files>" glob="*.{ts,tsx}"
```

**Silent rule:**
- If zero issues found → do not mention it. Just proceed.
- If HIGH issues found → show as ⚠️ warning in save confirmation only.
- If AUTO-FAIL found → show as ❌ alert, recommend running "check before commit".

Append to `main/current-session.md` under `## PENDING / REMIND ADAM` only if issues found:
```
- ⚠️ AUTO-REVIEW: [N] issue(s) in [file] — run "check before commit" before next push
```

### 7. Confirm to user
Report back:
- What was saved (files updated)
- Latest commit hash + branch
- Auto-review result (only if issues found — silent if clean)
- Any reminders set
- Quick resume command for next session
