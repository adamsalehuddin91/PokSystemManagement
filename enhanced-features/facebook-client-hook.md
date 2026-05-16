# Facebook Client Hook Runbook

**Trigger**: "draft post", "facebook post", "post untuk [product]", "social post", "hook client facebook"
**Purpose**: Generate Facebook/Threads posts + mockup screenshots untuk attract business owner clients

---

## Context

Adam posts on Facebook to reach business owners in his friendlist.
Products: LorryTech OS, SwiftBiz, HMS Salon, SwiftMoney, SwiftPOS, Qalbu.
Audience: Malaysian SME owners, operators, pengusaha.
Language: BM casual + sedikit English.

---

## Step 1 — Identify Target

Ask (or infer from context):
- Which product? (LorryTech / SwiftBiz / HMS Salon / SwiftMoney / SwiftPOS)
- Which industry? (logistics / retail / salon / personal finance / F&B)
- Goal? (awareness / leads / demo request / trial signup)

---

## Step 2 — Generate Mockup Screenshots (Run First)

**WAJIB**: Setiap kali "draft posting" dipanggil, auto-run screenshot generator untuk produk berkenaan SEBELUM draft post. Jangan skip langkah ini.

Sebelum draft post, generate screenshots dulu — post dengan visual convert lebih tinggi.

### Mockup Generator per Product

| Product | Generator Path | Run Command | Dev Server Port |
|---------|---------------|-------------|-----------------|
| **LorryTech OS** | `SwiftApp Dev/lorrytech-os/screenshot/` | `NODE_PATH="../../qalbu-app/node_modules" node screenshot/generate-screenshots.js` | 8000 |
| **SwiftMoney** | `SwiftApp Dev/swift-money/mockup-generator/` | `MOCKUP_EMAIL=x MOCKUP_PASS=y node generate-mockup.js` | — |
| **HMS Salon** | `SwiftApp Dev/hms-salon/` | Puppeteer — buat kalau belum ada | — |
| **SwiftBiz** | `SwiftApp Dev/SwiftBiz/screenshot/` | `NODE_PATH="../../qalbu-app/node_modules" node screenshot/generate-screenshots.js` | 8000 |
| **SwiftPOS** | `SwiftApp Dev/swiftpos/screenshot/` | `NODE_PATH="../../qalbu-app/node_modules" node screenshot/generate-screenshots.js` | 8001 |

### Output Location
- LorryTech: `screenshot/output/` — web-01 to web-06 (1280×800) + mobile-01 to mobile-03 (390×844)
- SwiftMoney: `mockup-generator/output/` — phone-0x + laptop-0x
- SwiftPOS: `screenshot/output/` — web-01 to web-05 (1280×800) + pos-desktop + pos-mobile (390×844) + social composites (square/portrait/story)

### shots.so Upload (Polish Screenshots)
1. Pergi [shots.so](https://shots.so)
2. Upload raw screenshot
3. Pilih frame: **Browser Mockup** (desktop) atau **iPhone 14 Pro** (mobile)
4. Background: gradient atau solid gelap (lebih professional)
5. Export PNG — guna dalam post

### Bila Mockup Generator Belum Ada (HMS Salon)
Tanya Adam: "Nak aku bina mockup generator untuk [product] dulu?"
Template generator ada di LorryTech atau SwiftPOS — boleh adapt dalam 15 minit.

---

## Step 3 — Apply Hook Formula

Every post follows this structure:

```
[Situasi relatable — buat owner rasa "eh ni pasal aku"]
[Pain point yang dia feel setiap hari]
[Hint penyelesaian — jangan reveal terus]
[CTA soft: "DM aku" / "Komen 'nak'" / "Tag kawan kau yang ada masalah ni"]
```

---

## Step 4 — Content Ratio Rule

Kalau Adam nak maintain consistent presence:
```
70% — Tips bisnes, insight, experience (bina authority)
20% — Behind the scenes (build product, client win, progress)
10% — Direct pitch / offer
```

---

## Step 5 — Generate 3 Post Versions

Untuk setiap request, bagi 3 versi:

| Versi | Tone | Format | Visual |
|-------|------|--------|--------|
| V1 | Problem/Story | Facebook panjang (3-5 para) | Desktop screenshot |
| V2 | Punchy/Bold | Threads pendek (3-5 baris) | Mobile screenshot |
| V3 | Social proof / MDEC grant angle | Facebook medium | Collage desktop + mobile |

---

## Step 6 — MDEC Grant Angle (Always Available)

Bila sesuai, masukkan angle ni:
```
"Software ni layak untuk MDEC Digital Grant —
korang bayar separuh, kerajaan cover separuh (up to RM5,000).
DM aku untuk details."
```

Ini powerful untuk SwiftBiz, LorryTech, HMS Salon.

---

## Step 7 — Tag + Story Tactic

**Tag Strategik:**
> End post dengan "Tagging beberapa kawan yang aku rasa useful 👇"
> Tag 3-5 orang yang ada bisnes berkaitan (bukan spam)

**Story → DM Funnel:**
> Post Story: "Baru siapkan demo baru untuk [industry]. Ada yang nak tengok?"
> Sesiapa reply Story → follow up dalam DM naturally

---

## Output Format

```
--- MOCKUP STATUS ---
[Sedia / Perlu generate / Perlu bina generator]
Run: [command kalau perlu]
Upload ke shots.so: [Ya / Dah ada]

--- V1: Facebook (Story/Problem) ---
[post text]

--- V2: Threads (Punchy) ---
[post text]

--- V3: Facebook (MDEC/Social Proof) ---
[post text]

TIPS:
- Masa terbaik post: Selasa-Khamis, 8PM-10PM
- Hashtags: [#relevant]
- Visual: [screenshot mana yang sesuai untuk post ni]
- Tag suggestion: [ada tak orang dalam friendlist yang sesuai?]
```

---

## Product Pain Points Reference

### LorryTech OS
- Pain: Trip tak tertrack, driver komisyen kena kira manual, invois lambat
- Hook: "Berapa trip driver kau buat bulan ni? Kau tahu exact number?"
- Best visual: Dashboard KPI cards + Driver Leaderboard (web-01/web-02)

### SwiftBiz
- Pain: Quotation buat dalam WhatsApp, invoice hilang, stock tak terurus
- Hook: "Berapa lama kau ambil masa nak buat satu quotation?"
- Best visual: Invoice list + Dashboard (generate kalau belum ada)

### HMS Salon
- Pain: Booking via WhatsApp kelam kabut, resit manual, temujanji clash
- Hook: "Berapa kali sebulan pelanggan tanya 'slot ada tak?' pastu tak jadi?"
- Best visual: Booking calendar + POS receipt (generate kalau belum ada)

### SwiftMoney
- Pain: Tak tahu duit pergi mana, hutang bertimbun, tak ada savings
- Hook: "Last bulan kau spend berapa? Kau tahu exact number?"
- Best visual: phone-01 (home/dashboard) + phone analytics

### SwiftPOS
- Pain: Cashier guna calculator, resit tulis tangan, tak tahu produk mana laris
- Hook: "Kau tahu exact berapa order restoran kau handle semalam?"
- Angle: BM-first, BYOD (no hardware), RM49/bulan flat — lagi murah dari Milo breakfast sehari
- Best visual: `square-pos-mobile.png` (POS kaunter) + `square-web-01-dashboard.png` (dashboard)

---

## Mockup Generator Quick Reference

### LorryTech — Generate Fresh Screenshots
```bash
cd "E:/Project-AI-MemoryCore-main/SwiftApp Dev/lorrytech-os"
# Pastikan server running dulu:
# /c/laragon/bin/php/.../php.exe artisan serve --host=127.0.0.1 --port=8000

NODE_PATH="../../qalbu-app/node_modules" node screenshot/generate-screenshots.js
# Output: screenshot/output/web-01 to web-06, mobile-01 to mobile-03
```

### SwiftBiz — Generate Fresh Screenshots
```bash
cd "E:/Project-AI-MemoryCore-main/SwiftApp Dev/SwiftBiz"
# Pastikan server running dulu:
# php artisan serve --host=127.0.0.1 --port=8000

NODE_PATH="../../qalbu-app/node_modules" node screenshot/generate-screenshots.js
# Output: screenshot/output/web-01 to web-06 + social-square-* + social-portrait-*
# Login: admin@pok.com / password (atau override via SWIFTBIZ_EMAIL + SWIFTBIZ_PASS)
```

### SwiftMoney — Generate Fresh Screenshots
```bash
cd "E:/Project-AI-MemoryCore-main/SwiftApp Dev/swift-money/mockup-generator"
MOCKUP_EMAIL=adamsalehuddin91@gmail.com MOCKUP_PASS=yourpass node generate-mockup.js
# Output: output/phone-0x-*.png, output/laptop-0x-*.png
```

### SwiftPOS — Generate Fresh Screenshots
```bash
cd "E:/Project-AI-MemoryCore-main/SwiftApp Dev/swiftpos"
# Pastikan server running dulu (port 8001):
# /c/laragon/bin/php/php-8.3.30-Win32-vs16-x64/php.exe artisan serve --port=8001

NODE_PATH="../../qalbu-app/node_modules" node screenshot/generate-screenshots.js
# Login: demo@swiftpos.my / SwiftPOS2026
# Output: screenshot/output/ — web-01 to web-05, pos-desktop, pos-mobile
#         + social: square-*, portrait-*, story-pos-mobile.png
```
