# Qalbu — Project File

**Status**: 🟢 FULLY LIVE — API + Frontend deployed | n8n pending test
**Stack**: Laravel 11 + React + Vite + Tailwind + n8n
**Started**: 2026-04-11
**Last Accessed**: 2026-04-20

---

## Project Summary

PWA rohani minimalist — digital sanctuary untuk bacaan rohani harian.
Decoupled architecture: Laravel headless API + React PWA + n8n automation pipeline.

**Live URL**: https://qalbu-api.swiftapps.my (API ✅) | https://qalbu.swiftapps.my (Frontend ✅)
**Repo**: `adamsalehuddin91/qalbu` (monorepo — `api/` + `app/`)

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Backend API | Laravel 11 + SQLite (dev) / PostgreSQL (prod) |
| Frontend | React + Vite + Tailwind CSS |
| Automation | n8n (self-hosted, same VPS) |
| Deploy | Coolify (backend + frontend) |

---

## Active Tasks

- [x] Session 1 — Laravel backend (migration, model, service, controller, middleware, routes)
- [x] Session 2 — React frontend (WisdomCard, App.jsx, ShareEngine, BookmarkDrawer, PWA)
- [x] Session 3 — n8n workflow JSON (import-ready)
- [x] Splash screen + tagline "Siraman Rohani Harian"
- [x] WisdomCard v2 — Arabic text + Maksud + Pengajaran
- [x] Category filter (Tawakal/Sabar/Rezeki/Syukur)
- [x] n8n — Sunnah.com + Al-Quran Cloud combo
- [x] Screenshot generator (shots.so + social media formats)
- [x] Facebook + Threads post drafts dengan hashtag
- [x] Deploy backend ke Coolify — https://qalbu-api.swiftapps.my ✅
- [x] Deploy frontend ke Coolify — https://qalbu.swiftapps.my ✅
- [x] Generate icon-192.png + icon-512.png (PWA icons) ✅
- [x] n8n workflow fixed — Gemini HTTP Request (bukan LangChain) ✅
- [ ] Import n8n workflow ke https://n8n.atokcloud.com + set GEMINI_API_KEY + SUNNAH_API_KEY
- [ ] Test end-to-end: n8n → Laravel → React
- [ ] Post ke Facebook + Threads bila siap

---

## Architecture

```
[n8n Cron 6h] → [RSS MuftiWP] → [Gemini AI] → [Hash] → [POST /api/v1/wisdom/ingest]
[n8n Webhook] ─────────────────────────────────────────────────────────────────────↗
                                                            ↓
                                                   [wisdoms table SQLite/PG]
                                                            ↓
                                              [GET /api/v1/wisdom/random]
                                                            ↓
                                                   [React PWA — Qalbu]
```

---

## Key Files

| File | Purpose |
|------|---------|
| `qalbu-api/app/Services/WisdomService.php` | getRandom (cached) + ingest |
| `qalbu-api/app/Http/Middleware/VerifyN8NToken.php` | Protect ingest endpoint |
| `qalbu-api/routes/api.php` | 3 endpoints |
| `qalbu-api/n8n/qalbu-ingest-workflow.json` | Import ke n8n |
| `qalbu-app/src/App.jsx` | Main state + fetch + UI |
| `qalbu-app/src/components/WisdomCard.jsx` | Glassmorphism card |
| `qalbu-app/src/components/ShareEngine.jsx` | Canvas 1080×1920 + Web Share |
| `qalbu-app/src/components/BookmarkDrawer.jsx` | LocalStorage bookmark |
| `qalbu-app/public/sw.js` | Service worker (PWA offline) |

---

## Environment Variables

**Laravel (.env):**
```
N8N_INGEST_TOKEN=your-secret
APP_URL=https://api.qalbu.yourdomain.com
FRONTEND_URL=https://qalbu.yourdomain.com
```

**React (.env):**
```
VITE_API_URL=https://api.qalbu.yourdomain.com
```

**n8n (Settings → Variables):**
```
QALBU_API_URL=https://api.qalbu.yourdomain.com
QALBU_N8N_TOKEN=your-secret (sama dengan N8N_INGEST_TOKEN)
```

---

## Progress Log

### 2026-04-11 — Session 1, 2, 3 (3 sessions in one night)

**Session 1 — Laravel Backend**
- Migration: `wisdoms` table (content_hash unique index, is_active, tags JSON)
- `Wisdom` model + fillable + casts
- `WisdomService` — getRandom (Cache per session) + ingest (duplicate check via SHA256)
- `WisdomController` — GET random + POST ingest
- `VerifyN8NToken` middleware — validate X-N8N-TOKEN header
- `routes/api.php` — prefix v1, throttle on ingest
- SQLite seeded, all 3 endpoints tested ✅

**Session 2 — React Frontend**
- Vite React + Tailwind CSS setup
- `WisdomCard.jsx` — glassmorphism, Playfair Display, fade-in animation
- `App.jsx` — fetch wisdom, fallback offline, loading state
- `ShareEngine.jsx` — Canvas 1080×1920 render, Web Share API + download fallback
- `BookmarkDrawer.jsx` — LocalStorage, swipe-up drawer
- `manifest.json` + `sw.js` — PWA setup, NetworkFirst API, IndexedDB cache
- Vite proxy → Laravel :8001
- Build ✅

**Session 3 — n8n Workflow**
- `qalbu-ingest-workflow.json` — import-ready
- Cron 6jam trigger + Webhook trigger
- RSS MuftiWP → Gemini AI → Parse+Hash → POST Laravel
- 409 duplicate handling built-in
- `n8n/SETUP.md` guide

### 2026-04-12 — Session 4 (marketing prep)

**Tagline update**: "Santuan Jiwa Harian" → "Siraman Rohani Harian"
**WisdomCard v2**: Arabic text + Maksud + Pengajaran sections
**Category colours**: Tawakal=blue, Sabar=purple, Rezeki=green, Syukur=amber
**n8n upgrade**: Sunnah.com API + Al-Quran Cloud (replace MuftiWP RSS)
**Screenshot generator**: Puppeteer + Sharp, shots.so format (390×844) + social formats
**Social posts**: Facebook + Threads drafts dengan hashtag siap
**Tagline confirmed**: Qalbu — Siraman Rohani Harian

**Next steps:**
- Deploy ke Coolify (backend + frontend)
- Generate PWA icons (icon-192.png, icon-512.png)
- Import n8n workflow + Gemini credentials
- Post ke Facebook + Threads bila live

### 2026-04-20 — Session 6 (Frontend Deploy + n8n Fix)

**Frontend LIVE ✅**
- Dockerfile + nginx.conf + .dockerignore added to `app/`
- PWA icons generated: icon-192.png + icon-512.png
- 4 Coolify deploy errors fixed iteratively:
  - `npm ci` → `npm install` (Windows/Linux lock file mismatch)
  - Remove `puppeteer`/`sharp` dari devDeps (native packages, Linux @emnapi crash)
  - Add `.dockerignore` (node_modules overwrite issue)
- Frontend live: https://qalbu.swiftapps.my ✅

**n8n Workflow Fixed ✅**
- Old node `lmChatGoogleGemini` (LangChain) → replaced dengan HTTP Request ke Gemini REST API
- Add `GEMINI_API_KEY` sebagai n8n Variable (sama dengan homelab key)
- Commits: `6251945`, `ced38ca`, `9f64113`, `d4758eb`, `b6b6988`, `3a690e3`

**Coolify Deploy Template Created**
- `insights/templates/coolify-frontend-deploy.md` — template standard untuk semua future frontend deploys

**Next steps:**
- Import updated workflow JSON ke n8n.atokcloud.com
- Set Variables: GEMINI_API_KEY + SUNNAH_API_KEY + QALBU_API_URL + QALBU_N8N_TOKEN
- Test execute workflow → check wisdom masuk ke DB
- Post ke Facebook + Threads

### 2026-04-19–20 — Session 5 (Deploy Sprint)

**Coolify Deploy — Backend API** ✅
- Fixed 6 sequential errors: mkdir storage dirs, remove view:cache, domain rename, Traefik port 80, DB host UUID, opcache OOM
- Domain renamed: `api.qalbu.swiftapps.my` → `qalbu-api.swiftapps.my` (Cloudflare wildcard coverage)
- DB_HOST = `hgkcow04ogok8ggw8ocks48s` (Coolify internal UUID hostname)
- N8N_INGEST_TOKEN = `JJchTy6EKrUSHZUPAC3NEQs_rEfobP6gBX2_H1mJJ1IHI9tqKSJSLzvT2-mZEQUl`
- Added `/api/health` endpoint → `{"status":"ok"}` ✅
- Commits: `16c83b6`, `29f6bc9`, `f4b1955`, `b7de2dd`
- API live: https://qalbu-api.swiftapps.my/api/health ✅

**Next steps:**
- Deploy `app/` frontend ke Coolify (base dir = `app`, domain = `qalbu.swiftapps.my`)
- Cloudflare DNS A record untuk `qalbu.swiftapps.my`
- Import n8n workflow + set Gemini + Sunnah API credentials
- Generate PWA icons (icon-192.png + icon-512.png)
