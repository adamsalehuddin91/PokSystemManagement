# Project Brief: Qalbu
**Version**: 1.2 (Revised 2026-04-10)
**Type**: Personal PWA | Solo Use
**Motto**: "Cari Air, dapat sekali Cawan."

---

## 1. Vision & Core Concept

Qalbu adalah sebuah Progressive Web App (PWA) minimalist yang direka untuk kegunaan peribadi sebagai *digital sanctuary* — ruang bertenang dengan bacaan rohani yang ringkas, tepat, dan berkualiti tinggi tanpa gangguan iklan atau noise media sosial.

**Core Values:**
- Minimalisme — satu skrin, satu mesej, satu tindakan
- Ketenangan — zero noise, zero distraction
- Automasi — content flows in passively via n8n pipeline

---

## 2. Technical Stack (Decoupled Architecture)

| Layer | Technology | Role |
|:------|:-----------|:-----|
| **Ingestion (ETL)** | n8n (Self-hosted) | Menapis RSS/Telegram/API + AI summarization |
| **Backend (API)** | Laravel 11 | Headless API, `wisdoms` table, auth middleware |
| **Frontend (PWA)** | React + Vite + Tailwind | Interface tenang, PWA, Canvas image renderer |
| **Database** | SQLite (dev) / PostgreSQL (prod) | Structured storage |

**CORS:** `config/cors.php` — whitelist frontend origin explicitly.

**Deployment:**
- Backend + n8n: Same VPS / Coolify instance
- Frontend: Coolify static deploy atau Vercel
- n8n webhook URL mesti publicly accessible untuk ingest

---

## 3. Database Schema

### Table: `wisdoms`

| Column | Type | Notes |
|--------|------|-------|
| `id` | BigInt PK | Auto increment |
| `content` | Text | Isi quote/wisdom |
| `source` | String | MuftiWP, Saharul Ridzwan, etc. |
| `category` | String | Tawakal, Sabar, Rezeki, Syukur |
| `language` | String (5) | `ms` / `ar` / `en` — default `ms` |
| `is_active` | Boolean | Default `true` — soft disable tanpa delete |
| `content_hash` | String (64) | SHA256 of content — **unique index** (prevent duplicates) |
| `tags` | JSON | Optional metadata |
| `created_at` | Timestamp | — |
| `updated_at` | Timestamp | — |

**Critical:** `content_hash` unique index mencegah n8n ingest duplicate content walaupun dari sumber berbeza.

---

## 4. Module Requirements

### A. Automation Pipeline (n8n)

**Triggers:**
- Cron Job (setiap 6 jam)
- Webhook (Telegram Bot push)

**AI Processing (Gemini LLM Node):**
- Ringkaskan input panjang → 2-3 baris "Impact Quotes"
- Kategorikan mengikut tema: Tawakal / Sabar / Rezeki / Syukur
- Generate `content_hash` = SHA256(content) sebelum POST

**Duplicate Handling (dalam n8n):**
- Generate hash sebelum POST
- Jika Laravel return `409 Conflict` → skip, log, continue

**Action:** POST ke Laravel dengan header `X-N8N-TOKEN`

---

### B. Backend API (Laravel 11)

**Service Pattern:**
```php
// WisdomService
public function getRandomWisdom(): Wisdom
{
    // Cache per-session — user dapat quote berbeza tiap session
    return Cache::remember(
        'wisdom_' . session()->getId(),
        now()->addMinutes(30),
        fn() => Wisdom::where('is_active', true)
                      ->inRandomOrder()
                      ->first()
    );
}
```

**Middleware:**
- `VerifyN8NToken` — validate `X-N8N-TOKEN` dari `.env`
- `throttle:60,1` — rate limit ingest endpoint

**Endpoints:**

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/wisdom/random` | None | Tarik satu wisdom rawak |
| `GET` | `/api/v1/wisdom/random?category=Sabar` | None | Filter by category |
| `POST` | `/api/v1/wisdom/ingest` | `X-N8N-TOKEN` | Terima wisdom baru dari n8n |

**Ingest Response Codes:**
- `201 Created` — berjaya
- `409 Conflict` — duplicate (content_hash wujud)
- `422 Unprocessable` — validation fail

---

### C. Frontend Experience (React + Vite)

**Design System:**

| Element | Value |
|---------|-------|
| Background | `#0a0c10` (Deep Charcoal) |
| Accent | `#f59e0b` (Amber Gold) |
| Card | Glassmorphism — `backdrop-blur-xl`, `bg-white/5` |
| Quote Font | *Playfair Display* (Serif, Italic) |
| UI Font | *Inter* (Sans-serif) |

**Components:**
- `App.jsx` — main state, fetch wisdom, transitions
- `WisdomCard.jsx` — glassmorphism card, fade-in/out transition
- `ShareEngine.jsx` — Canvas renderer + Web Share API
- `BookmarkDrawer.jsx` — saved wisdoms dari LocalStorage

**Interactions:**
- Butang **"TERUSKAN"** — fetch wisdom baru dengan fade transition
- Butang **Bookmark** — save ke LocalStorage
- Butang **Share** — trigger Canvas render → Web Share API

**Offline Strategy:**
- Service worker cache last 10 wisdoms dalam IndexedDB
- Kalau API down → serve dari cache
- First visit offline → show fallback wisdom (hardcoded 1 quote)

---

### D. HD Image Generator (Killer Feature)

**Tech:** HTML5 Canvas API

**Spec:** 1080 × 1920px (9:16 — Stories/Reels format)

**Critical Implementation Notes:**

```js
// 1. Font mesti load SEBELUM draw — kalau tak, Canvas guna system font
await document.fonts.load('italic 48px "Playfair Display"');

// 2. Text wrap — Canvas tak auto wrap, implement manual
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (const word of words) {
        const test = line + word + ' ';
        if (ctx.measureText(test).width > maxWidth && line) {
            ctx.fillText(line.trim(), x, y);
            line = word + ' ';
            y += lineHeight;
        } else {
            line = test;
        }
    }
    ctx.fillText(line.trim(), x, y);
}

// 3. Web Share API — check support + iOS fallback
const shareImage = async (canvas) => {
    canvas.toBlob(async (blob) => {
        const file = new File([blob], 'sanctuary.png', { type: 'image/png' });
        if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({ files: [file] });
        } else {
            // Fallback: download terus
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'sanctuary.png'; a.click();
        }
    });
};
```

**Canvas Layout (1080×1920):**
- Background: `#0a0c10` gradient
- Branding watermark (top): "Qalbu"
- Quote text center (Playfair Display, Italic, Amber Gold)
- Source attribution (bottom)
- Subtle decorative border

---

## 5. PWA Configuration

**manifest.json:**
- `name`: "Qalbu"
- `short_name`: "Qalbu"
- `theme_color`: `#0a0c10`
- `background_color`: `#0a0c10`
- `display`: `standalone`
- `start_url`: `/`

**service-worker.js Strategy:**
- Cache shell (App.jsx bundle) — `CacheFirst`
- API calls — `NetworkFirst` with IndexedDB fallback
- Images — `CacheFirst`

---

## 6. Target Deliverables

| # | Deliverable | Layer |
|---|-------------|-------|
| 1 | Migration + `Wisdom` Model | Laravel |
| 2 | `WisdomService` + Controllers | Laravel |
| 3 | `VerifyN8NToken` Middleware | Laravel |
| 4 | n8n Workflow (JSON export) | n8n |
| 5 | `App.jsx` + `WisdomCard.jsx` | React |
| 6 | `ShareEngine.jsx` (Canvas + Share) | React |
| 7 | `BookmarkDrawer.jsx` | React |
| 8 | `manifest.json` + `service-worker.js` | PWA |

---

## 7. Environment Variables

**Laravel `.env`:**
```
N8N_INGEST_TOKEN=your-secret-token
APP_URL=https://api.sanctuary.yourdomain.com
FRONTEND_URL=https://sanctuary.yourdomain.com
```

**React `.env`:**
```
VITE_API_URL=https://api.sanctuary.yourdomain.com
```

---

## 8. Build Sequence (Recommended)

```
Session 1: Laravel — Migration + Model + WisdomService + API endpoints + Middleware
Session 2: React — App.jsx + WisdomCard + transitions + PWA setup
Session 3: ShareEngine (Canvas) + BookmarkDrawer + n8n workflow
```

---

*Brief revised by Tokwi v5.5 — 2026-04-10*
*v1.1: Gaps addressed — CORS, deployment, duplicate prevention, Canvas font loading, text wrap, Web Share fallback, offline strategy, DB schema additions*
*v1.2: Renamed The Sanctuary → Qalbu*
