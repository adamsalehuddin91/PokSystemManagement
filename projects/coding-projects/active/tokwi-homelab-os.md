# Tokwi Homelab OS

**Type**: Infrastructure / AI System
**Status**: 🔨 IN PROGRESS — Phase 2 partial done
**Position**: #1
**Created**: 2026-04-16
**Last Accessed**: 2026-04-17

---

## Description

Personal AI command center running on Adam's always-on notebook. Single interface via Telegram. n8n as orchestrator, routing tasks to Claude Code, Gemini API, Ollama, Broker API, Coolify, AdGuard, and IP Camera.

**Brief**: `ProjectBrief/TokwiHomelabOS.md`

---

## Stack

| Component | Role |
|-----------|------|
| n8n | Orchestrator + Telegram bot + cron |
| Claude Code (-p) | Code, debug, review |
| Gemini API (free) | Docs, proposals, summaries |
| Ollama | Private/offline LLM |
| AdGuard Home | DNS + ad block |
| Tailscale | Secure remote access |
| Docker Desktop | Container runtime |
| Broker API | Real-time scalping data |

---

## Phase Plan

```
PHASE 1 — Foundation ✅ DONE (2026-04-16)
  ✅ Install Docker Desktop
  ✅ Install Tailscale
  ✅ Deploy n8n (localhost:5678)
  ✅ Create Telegram Bot (@tokwi_bot)
  ✅ Basic ping/reply working

PHASE 2 — Monitoring (3-4 jam) — PARTIAL
  ✅ Health check workflow (4 SwiftApps every 5 min + Telegram alert)
  ⬜ Deploy AdGuard Home
  ⬜ Router DNS → notebook IP
  ⬜ Proactive alerts via Telegram (partial — health check alert done)

PHASE 3 — Dev + Docs (2-3 jam)
  ⬜ Claude Code headless trigger dari n8n
  ⬜ Gemini API key (aistudio.google.com)
  ⬜ MemoryCore read/write integration
  ⬜ Ollama install + pull models

PHASE 4 — Trading Module (3-4 jam)
  ⬜ Broker API connection (Deriv/OANDA)
  ⬜ Scalping indicator engine (EMA/RSI/VWAP)
  ⬜ Pre-news alert system
  ⬜ Paper trade tracker

PHASE 5 — Income Features (2-3 jam)
  ⬜ Freelance job board monitor
  ⬜ SwiftApps revenue tracking
  ⬜ Proposal auto-generate workflow

PHASE 6 — Rumah (2-3 jam)
  ⬜ IP Camera integration (RTSP)
  ⬜ Motion alert workflow
  ⬜ AdGuard stats → Telegram

Total: ~15-20 jam (4-5 sesi)
```

---

## Progress Log

### 2026-04-16
- Full architecture designed + brief saved (`ProjectBrief/TokwiHomelabOS.md`)
- Stack finalized: n8n + Claude Code + Gemini API + Ollama + AdGuard + Tailscale + Docker
- Task routing logic designed (6 categories)
- Phase plan 1-6 defined
- Belum start build — Phase 1 pending

### 2026-04-16 (Session 2)
- Project resumed
- Phase 1 confirmed complete
- Phase 2 partial: Health check workflow live
  - 4 apps monitored: SwiftMoney, SwiftBiz, LorryTech, HMS Salon
  - Architecture: Schedule → Define Apps → HTTP Request → Merge (By Position) → Check Results → If Down → Telegram
  - Key fix: n8n Code node cannot do HTTP (sandboxed) — use HTTP Request node instead
  - Merge node "Combine by Position" preserves name field through HTTP node
  - Workflow active, running every 5 min
- Remaining Phase 2: AdGuard Home + Router DNS

### 2026-04-17 (Session 3) — OpenClaw Setup
- OpenClaw confirmed REAL (was previously thought hallucinated)
- Installed: Ollama ✅, llama3.2:3b ✅, qwen2.5-coder:7b ✅, OpenClaw 2026.4.14 ✅
- Groq API key: saved in .env
- Created @Tokwi_Agent_Bot (token saved in .env)
- Gateway running, Telegram channel connected ✅
- claude-proxy created: `~/.openclaw/claude-proxy/index.js` (port 3100)
- BLOCKER: OpenClaw Ollama auth issue — "No API key found for provider ollama"
  - auth-profiles.json at `agents/main/agent/auth-profiles.json` correctly edited
  - But OpenClaw still fails to read Ollama auth
  - Next session: try `openclaw models auth add --agent main` or check OpenClaw docs
- Files edited: devices/paired.json (full scopes), devices/pending.json (cleared)
- Gateway model currently set to: ollama/llama3.2:3b
