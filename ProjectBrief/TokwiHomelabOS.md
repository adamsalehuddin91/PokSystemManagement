# TOKWI HOMELAB OS v2.0
### Personal AI Command Center — Adam's Setup
*Created: 2026-04-16 | Status: Planning — Ready to Build*

---

## VISION

```
Adam dekat luar rumah → Telegram → Tokwi buat semua
Satu interface. Satu bot. Always-on. Zero friction.
```

---

## HARDWARE

```
✅ Notebook (always-on 24/7)
   ├── Windows 11
   ├── RAM: 32GB
   └── GPU: NVIDIA Quadro T1000 (4GB VRAM)

🛒 Perlu beli:
   ├── IP Camera (RM80-150) — monitor rumah
   └── Smart Plug (RM30-50) — monitor power notebook
```

---

## ARCHITECTURE

```
┌──────────────────────────────────────────────────────┐
│                 PHONE (Telegram)                      │
│    Adam tanya apa-apa → Tokwi jawab → semua sini     │
└─────────────────────┬────────────────────────────────┘
                      ↕ Tailscale (encrypted)
┌──────────────────────────────────────────────────────┐
│             NOTEBOOK (Tokwi Hub)                      │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │          n8n (Orchestrator)                      │ │
│  │  Telegram Bot + AI Router + Cron + Workflows     │ │
│  └──────┬────────┬────────┬────────┬───────────────┘ │
│         │        │        │        │                  │
│      [CODE]  [DOCS]  [TRADE]  [OPS]                  │
│         │        │        │        │                  │
│    Claude   Gemini  Trading  Health                  │
│    Code     Free    Module   Check                   │
│    headless API     (Broker  Coolify                 │
│    (-p)     (AI     API +    IP Cam                  │
│    Ollama   Studio) M1/M5)   AdGuard                 │
│         │        │        │        │                  │
│         └────────┴────────┴────────┘                  │
│                      ↓                                │
│                MemoryCore                             │
│     main-memory.md + current-session.md              │
└──────────────────────────────────────────────────────┘
```

---

## SOFTWARE STACK

| Software | Fungsi | Cost |
|----------|--------|------|
| **n8n** | Orchestrator + Telegram bot + Cron | Free (self-host) |
| **Claude Code** | Coding, debug, trading scripts | Subscription ✅ |
| **Gemini API** | Documents, proposals, reports | Free (AI Studio) |
| **Ollama** | Local LLM — private/offline tasks | Free |
| **AdGuard Home** | Ad block + DNS monitoring | Free |
| **Tailscale** | Secure remote access | Free (personal) |
| **Docker Desktop** | Run all containers | Free |
| **Broker API** | Real-time trading data | Free (ada account) |

**Total tambahan: RM0/bulan**

---

## TASK ROUTING — Adam Tanya, Tokwi Route

```
Telegram message masuk
        ↓
n8n AI Router (auto-classify intent)
        ↓
┌──────────────────────────────────────┐
│ coding / debug / review → Claude Code│
│ document / proposal / report → Gemini│
│ trading / scalp setup → Trading Mod  │
│ health check / deploy → Coolify API  │
│ home / security → IP Camera          │
│ memory / pending tasks → MemoryCore  │
│ job hunting → Job Board Monitor      │
│ ad block stats → AdGuard Home        │
└──────────────────────────────────────┘
        ↓
Result → Telegram
```

---

## MODEL ROUTING

| Task | Tool | Reason |
|------|------|--------|
| Code, debug, refactor | Claude Code (-p) | Best coding |
| Trading scripts | Claude Code (-p) | Code + reasoning |
| Proposal, presentation | Gemini API (free) | Long-form docs |
| Document summary | Gemini API (free) | Fast, accurate |
| Draft email / report | Gemini API (free) | Natural writing |
| Private / offline | Ollama (local) | Data tak keluar |
| Real-time scalp alert | n8n + Broker API | Speed critical |

---

## CAPABILITY MAP

### DEV & CODING
```
Adam: "debug error kat swiftpos checkout"
Tokwi: [Claude Code] → "Fixed. Commit a3f2b91 ✅"

Adam: "review swiftbiz billing module"
Tokwi: [Claude Code] → code review summary

Adam: "deploy swiftpos"
Tokwi: [Coolify API] → trigger deploy → status
```

### DOCUMENTS & PROPOSALS
```
Adam: "buat proposal untuk transport company"
Tokwi: [Gemini API] → PDF proposal → hantar Telegram

Adam: "summarize document ni" [attach file]
Tokwi: [Gemini API] → summary dalam 2 minit

Adam: "draft post facebook SwiftPOS"
Tokwi: [Gemini API] → 3 versi BM → Adam pilih
```

### TRADING — SCALPING FOCUS
```
Timeframe: M1, M5 sahaja
Data: Real-time dari Broker API (bukan Yahoo Finance delayed)
Style: Masuk cepat, keluar cepat, rehat

Adam: "gold setup ada tak?"
Tokwi: "⚡ XAUUSD SCALP SETUP
        Direction: LONG
        Entry: $2,334
        SL: $2,332 (20 pips)
        TP: $2,337 (30 pips)
        RR: 1:1.5
        Signal: EMA9/21 cross + RSI oversold M5"

Auto alert:
"⛔ US CPI dalam 30 min — NO SCALP. Tunggu lepas news."
"⚡ Setup formed — XAUUSD SHORT M5"
```

**Indicators (Scalping):**
- EMA 9/21 cross (M5)
- RSI M1/M5
- VWAP
- Candlestick pattern M1

### BISNES MONITORING
```
Auto every 5 min:
"✅ SwiftMoney — OK
 ✅ SwiftBiz — OK
 ✅ LorryTech — OK
 ⚠️ HMS — slow 2.3s"

Adam: "SwiftMoney berapa user hari ni?"
Tokwi: "47 users total | 3 paid hari ni — RM147"

Alert auto:
"🎉 New paid user SwiftMoney — RM49"
"🚨 SwiftBiz down — investigating"
```

### RUMAH & SECURITY
```
Adam: "tengok rumah"
Tokwi: [IP Cam snapshot] → hantar gambar

Auto motion detect:
"🏠 Motion detected 2:34PM [gambar]"

Adam: "sape banyak guna internet?"
Tokwi: [AdGuard stats]
       "Top hari ni:
        TV: 342 queries
        Phone anak: 128 (89 blocked ✅)"
```

### FREELANCE JOB HUNTING
```
Auto monitor:
├── Upwork RSS — "Laravel" / "React" keywords
├── Freelancer.com
├── Facebook Groups — "Web Dev Malaysia"
└── MyFreelancer.com.my

Alert:
"🎯 New job: Laravel + React
 Budget: RM2,000 | Client: Singapore
 Reply 'apply' untuk generate proposal"

Adam: "apply"
Tokwi: [Claude Code generate proposal] → hantar balik
```

### LIFE MANAGEMENT
```
Adam: "remind 3PM client call"
Tokwi: set cron → "⏰ 3PM — client call dalam 10 min"

Adam: "apa pending?"
Tokwi: [MemoryCore] → list semua pending tasks

Adam: "save idea: SwiftPOS loyalty feature"
Tokwi: [MemoryCore] → saved ✅
```

---

## PROACTIVE ALERTS (Auto)

```
Every 5 min   → Health check semua apps
Every 8AM     → Scalping brief (Gold conditions + news schedule)
Every 1 hour  → Coolify services status
Pre-news      → "⛔ NFP dalam 30 min — jangan scalp"
App down      → Immediate alert
New paid user → Revenue notification
Motion detect → Cam snapshot + alert
New job post  → Freelance alert
```

---

## TRADING MODULE — Scalping Architecture

```
REAL-TIME DATA
├── Broker API (Deriv / OANDA / IC Markets)
└── TwelveData API (free tier backup)

ANALYSIS ENGINE
├── EMA 9/21 cross (M5)
├── RSI divergence (M1/M5)
├── VWAP position
├── News calendar check (avoid NFP/CPI)
└── Setup quality score (1-10)

RISK MANAGEMENT
├── Position size calculator
│   "Modal RM1,000 → risk 1% → berapa lot?"
├── SL/TP auto-suggest
├── Daily loss limit: ⛔ stop bila -3%
└── Paper trade tracker

OUTPUT
├── Setup alert (bila signal formed)
├── Pre-news warning
├── Daily performance recap
└── Weekly win rate report
```

---

## INCOME STREAMS

| Stream | Tokwi Role | Potential/bulan |
|--------|------------|-----------------|
| Scalp trading | Real-time alerts, risk calc | Depends on skill |
| SwiftApps MRR | Monitor growth, alert churn | Growing passive |
| Freelance dev | 3x faster + auto-apply | +30-50% income |
| Jarvis setup service | Adam jual ke SME | RM1,000-4,000 |
| White-label apps | Auto-generate proposals | RM500-2,000/client |
| n8n automation service | Jual workflows ke SME | RM300-800/setup |
| Content/affiliate | Document journey → blog | RM200-500 |

---

## DOCKER COMPOSE — Full Stack

```yaml
version: '3.8'
services:

  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    volumes:
      - ./n8n_data:/home/node/.n8n
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=adam
      - N8N_BASIC_AUTH_PASSWORD=your_password
    restart: unless-stopped

  adguardhome:
    image: adguard/adguardhome
    ports:
      - "53:53/udp"
      - "3000:3000"
      - "80:80"
    volumes:
      - ./adguard/work:/opt/adguardhome/work
      - ./adguard/conf:/opt/adguardhome/conf
    restart: unless-stopped

  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ./ollama_data:/root/.ollama
    restart: unless-stopped
```

---

## SECURITY

```
✅ Tailscale — remote access via Tailscale only
✅ n8n — basic auth enabled
✅ Ollama — localhost only
✅ MemoryCore — 100% local, no cloud
✅ AdGuard — DNS local network only
⬜ Notebook — disable auto sleep (always-on)
⬜ Router — block external port 53
```

---

## PHASE BUILD PLAN

```
PHASE 1 — Foundation (2-3 jam)
  ⬜ Install Docker Desktop
  ⬜ Install Tailscale
  ⬜ Deploy n8n
  ⬜ Create Telegram Bot (@BotFather)
  ⬜ Basic ping/reply working

PHASE 2 — Monitoring (3-4 jam)
  ⬜ Health check workflow (Coolify + apps)
  ⬜ Deploy AdGuard Home
  ⬜ Router DNS → notebook IP
  ⬜ Proactive alerts via Telegram

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

## NEXT SESSION — Start Here

```
1. Install Docker Desktop
   winget install Docker.DockerDesktop

2. Install Tailscale
   winget install Tailscale.Tailscale

3. Create Telegram Bot
   → Telegram: @BotFather → /newbot → save token

4. Deploy n8n
   docker-compose up -d

5. Test basic bot ping
```

*Sambung: "load project TokwiHomelabOS"*
