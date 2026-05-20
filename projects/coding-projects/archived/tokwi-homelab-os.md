# Tokwi Homelab OS

**Type**: Infrastructure / AI System
**Status**: 🗄️ ARCHIVED (LRU #11) — 2026-05-20
**Last Active**: 2026-04-17
**Reason**: Auto-archived — slot freed for SwiftStay v2

---

## Description

Personal AI command center running on Adam's always-on notebook. Single interface via Telegram. n8n as orchestrator, routing tasks to Claude Code, Gemini API, Ollama, Broker API, Coolify, AdGuard, and IP Camera.

**Brief**: `ProjectBrief/TokwiHomelabOS.md`

---

## Phase Progress at Archive

```
PHASE 1 — Foundation ✅ DONE
PHASE 2 — Monitoring ⬜ PARTIAL (health check live, AdGuard pending)
PHASE 3-6 — Not started
```

**BLOCKER at archive**: OpenClaw Ollama auth issue — "No API key found for provider ollama"
- Next attempt: `openclaw models auth add --agent main`

## Resume When Reloaded
```bash
# n8n running on Docker Desktop localhost:5678
# Telegram bot: @Tokwi_Agent_Bot
# claude-proxy: ~/.openclaw/claude-proxy/index.js (port 3100)
# Files: SwiftApp Dev/tokwi-homelab-os/
```
