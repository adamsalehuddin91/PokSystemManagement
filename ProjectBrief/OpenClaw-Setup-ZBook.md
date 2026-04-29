# OpenClaw Setup — HP ZBook Fury 15 G7
*Adam's Local AI Agent Stack*
*Specs: i7-10850H | 32GB RAM | Quadro T1000 | Win 11 Pro*

---

## STACK OVERVIEW

```
Telegram (interface)
    ↓
OpenClaw (agent orchestrator)
    ↓
Smart Router
    ├── Qwen 2.5 14B via Ollama  → tasks harian (FREE, local)
    ├── Gemini Flash API         → moderate tasks (FREE)
    └── Claude Sonnet API        → content quality (pay)
```

---

## PHASE 1 — WSL2 Setup
*Estimated time: 20 minit*

### Step 1.1 — Enable WSL2

Buka **PowerShell sebagai Administrator**:

```powershell
wsl --install
```

Restart laptop bila siap.

### Step 1.2 — Verify & Set Ubuntu sebagai default

```powershell
wsl --list --verbose
wsl --set-default Ubuntu
wsl --set-version Ubuntu 2
```

### Step 1.3 — Buka Ubuntu terminal

Cari "Ubuntu" dalam Start Menu → buka.
Set username + password bila first time.

### Step 1.4 — Update packages

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential
```

---

## PHASE 2 — Ollama + Qwen 2.5 14B
*Estimated time: 30-60 minit (download model besar)*

### Step 2.1 — Install Ollama (Windows native — lagi baik untuk GPU)

Tutup WSL2 dulu. Buka **browser**:

```
https://ollama.com/download
→ Download Windows installer
→ Install (next next finish)
```

Verify dalam PowerShell:
```powershell
ollama --version
```

### Step 2.2 — Enable GPU untuk Ollama

Ollama auto-detect Quadro T1000. Verify:
```powershell
ollama run llama3.2
# Kalau respond dalam beberapa saat → GPU active
# Type /bye untuk exit
```

### Step 2.3 — Pull models

```powershell
# Primary model — BM ok, 14B parameter
ollama pull qwen2.5:14b

# Backup ringan (untuk tasks simple)
ollama pull qwen2.5:7b

# Download masa: 30-60 minit (8-9GB)
```

Monitor progress — dia tunjuk % download.

### Step 2.4 — Test Ollama

```powershell
ollama run qwen2.5:14b
# Cuba tanya dalam BM:
# "Buat hook post untuk bisnes salon"
# /bye untuk exit
```

---

## PHASE 3 — Node.js dalam WSL2
*Estimated time: 10 minit*

```bash
# Dalam Ubuntu terminal
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version    # should be v20+
npm --version
```

---

## PHASE 4 — Telegram Bot
*Estimated time: 5 minit*

1. Buka Telegram → cari **@BotFather**
2. Send: `/newbot`
3. Nama bot: `Adam Assistant` (atau apa-apa)
4. Username: `adamswiftbot` (kena unique, end with 'bot')
5. Copy **TOKEN** yang dia bagi → simpan

Dapatkan Telegram User ID kau:
1. Cari **@userinfobot** dalam Telegram
2. Send `/start`
3. Copy **Id** number → simpan

---

## PHASE 5 — API Keys
*Estimated time: 10 minit*

### Gemini Flash (FREE)
```
1. aistudio.google.com
2. Login dengan Google account
3. "Get API Key" → Create API key
4. Copy key → simpan
```

### Anthropic Claude
```
1. console.anthropic.com
2. Login / Register
3. API Keys → Create Key
4. Top up $10 (cukup untuk explore berbulan)
5. Copy key → simpan
```

---

## PHASE 6 — Install OpenClaw
*Estimated time: 20 minit*

```bash
# Dalam Ubuntu (WSL2) terminal
cd ~
git clone https://github.com/openclaw/openclaw
cd openclaw
npm install
cp .env.example .env
nano .env
```

### Configure `.env`

```env
# ── INTERFACE ──────────────────────────
TELEGRAM_BOT_TOKEN=paste_token_here
ALLOWED_USERS=paste_telegram_user_id

# ── DEFAULT MODEL (Gemini Flash) ───────
DEFAULT_MODEL=gemini-2.0-flash
GOOGLE_AI_API_KEY=paste_gemini_key

# ── QUALITY MODEL (Claude) ─────────────
ANTHROPIC_API_KEY=paste_claude_key
CLAUDE_MODEL=claude-sonnet-4-6

# ── LOCAL MODEL (Ollama) ───────────────
OLLAMA_BASE_URL=http://host.docker.internal:11434
OLLAMA_MODEL=qwen2.5:14b

# ── MEMORY ─────────────────────────────
MEMORY_PATH=./memory
MEMORY_FORMAT=markdown

# ── SECURITY (important!) ──────────────
ENABLE_SHELL=false
ENABLE_FILE_WRITE=false
ENABLE_BROWSER=false

# ── SERVER ─────────────────────────────
PORT=3000
```

Simpan: `Ctrl+X` → `Y` → `Enter`

---

## PHASE 7 — Cloudflare Tunnel (Public URL untuk Telegram)
*Estimated time: 10 minit*

Telegram perlukan public URL untuk hantar messages ke OpenClaw.

### Install cloudflared (Windows)

```powershell
# Dalam PowerShell
winget install Cloudflare.cloudflared
```

### Buat tunnel (no account needed)

```powershell
cloudflared tunnel --url http://localhost:3000
```

Output akan tunjuk URL macam:
```
https://abc-random-xyz.trycloudflare.com
```

Copy URL ni → letak dalam OpenClaw config:
```env
WEBHOOK_URL=https://abc-random-xyz.trycloudflare.com
```

> Note: URL ni berubah setiap kali restart cloudflared.
> Untuk permanent URL → perlu Cloudflare account (free).

---

## PHASE 8 — Run OpenClaw

```bash
# Terminal 1: Start OpenClaw
cd ~/openclaw
npm start

# Terminal 2: Keep cloudflared running (PowerShell)
cloudflared tunnel --url http://localhost:3000
```

Test dalam Telegram — hantar message ke bot kau:
```
/start
```

Kalau dapat reply → OpenClaw running ✅

---

## PHASE 9 — Smart Model Routing

Buat file `~/openclaw/skills/router.js`:

```javascript
// Smart routing — task → model
const ROUTING = {
  // Ollama local (FREE, offline)
  "remind":      { model: "ollama", name: "qwen2.5:14b" },
  "summarize":   { model: "ollama", name: "qwen2.5:14b" },
  "classify":    { model: "ollama", name: "qwen2.5:14b" },
  "translate":   { model: "ollama", name: "qwen2.5:14b" },

  // Gemini Flash (FREE API)
  "search":      { model: "gemini", name: "gemini-2.0-flash" },
  "monitor":     { model: "gemini", name: "gemini-2.0-flash" },
  "schedule":    { model: "gemini", name: "gemini-2.0-flash" },

  // Claude (pay, quality tasks only)
  "write_hook":  { model: "claude", name: "claude-sonnet-4-6" },
  "write_post":  { model: "claude", name: "claude-sonnet-4-6" },
  "draft_quote": { model: "claude", name: "claude-sonnet-4-6" },
  "reply_lead":  { model: "claude", name: "claude-sonnet-4-6" },
};
```

---

## PHASE 10 — Custom Skills untuk Adam

### Skill: Hook Generator

Buat `~/openclaw/skills/hook-generator.js`:

```javascript
// Trigger: "hook [topic]"
// Model: Claude (quality)
// Context: Adam = SwiftApps, SME Malaysia, BM tone

const SYSTEM_PROMPT = `
Kau adalah content writer untuk Adam,
pengasas SwiftApps — syarikat yang bina
sistem pengurusan untuk SME Malaysia.

Target audience: Business owner Malaysia
yang belum ada sistem digital.

Tone: Casual BM, relatable, ada proof/nombor,
CTA jelas. BUKAN corporate. BUKAN over-formal.

Social proof: HMS Salon (Haida Muslimah Salon)
dah live, 463 resit, RM78K data migrated.
`;
```

### Skill: Morning Brief

```javascript
// Trigger: Auto 8AM setiap hari
// Hantar ke Telegram:
// - Hari & tarikh
// - Pending tasks dari memory
// - Reminder untuk hari ni
// Model: Ollama (free, simple task)
```

---

## STARTUP CHECKLIST

Setiap kali nak guna OpenClaw:

```
□ Buka PowerShell → cloudflared tunnel --url http://localhost:3000
□ Buka Ubuntu terminal → cd ~/openclaw && npm start
□ Ollama auto-start (Windows service)
□ Test Telegram bot → /start
```

Untuk auto-start semua → boleh buat Windows Task Scheduler kemudian.

---

## KOS SUMMARY

```
WSL2 + Ubuntu        : FREE
Ollama + Qwen 14B    : FREE
OpenClaw             : FREE
Cloudflare Tunnel    : FREE
Gemini Flash API     : FREE
Claude API           : ~$5-10/bulan

TOTAL                : ~RM25-50/bulan
(Laptop hardware dah ada — zero extra hardware cost)
```

---

## TROUBLESHOOTING COMMON

| Problem | Fix |
|---------|-----|
| Ollama tak detect GPU | Update Nvidia driver → nvidia.com |
| WSL2 can't reach Ollama | Guna `host.docker.internal:11434` |
| Telegram bot tak reply | Check cloudflared URL updated dalam .env |
| Model slow | Switch ke qwen2.5:7b untuk tasks ringan |
| Claude API error | Check credit balance kat console.anthropic.com |

---
*Setup Guide v1.0 — Generated by Tokwi, 2026-04-03*
*Platform: HP ZBook Fury 15 G7 | Win 11 Pro | WSL2*
