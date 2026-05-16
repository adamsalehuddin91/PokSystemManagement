# SwiftPOS
*Coding Project - Created 2026-04-14*

## Description
Standalone POS (Point of Sale) SaaS system targeting Malaysian F&B operators, restoran, warung, dan kedai runcit. BM-first UI, BYOD (no hardware required), RM49/mo flat fee. Part of SwiftApps ecosystem.

## Project Details
- **Status**: 🟡 MVP BUILT — local dev ready, deploy pending
- **Created**: 2026-04-14
- **Last Accessed**: 2026-04-18
- **Position**: #1

## Stack
- **Framework**: Laravel 12 + Inertia.js + React 18
- **Database**: PostgreSQL (Coolify)
- **Styling**: Tailwind CSS
- **PDF**: Laravel DomPDF
- **Deploy**: Coolify (Hetzner VPS)
- **Domain**: pos.swiftapps.my
- **Branch**: `main`

## Pricing
| Plan | Harga | Limit |
|------|-------|-------|
| Starter | RM49/mo | 1 terminal, 100 produk |
| Pro | RM99/mo | 3 terminal, unlimited |
| Business | RM179/mo | 10 terminal, multi-lokasi |

## Resume
```bash
# Belum scaffold — Sesi 1: create repo + Laravel + Breeze + Docker
# Reference Docker: E:/Project-AI-MemoryCore-main/SwiftApp Dev/SwiftBiz/docker/
# Brief: ProjectBrief/SwiftPOS_Project_Brief.md
```

## Active Tasks
- [x] Define project brief — target segment, core features, pricing
- [x] Market analysis — competitor landscape + gap analysis
- [x] MVP scope detail — 11 screens, DB schema, 3-sesi build plan
- [x] Stack decision — Laravel + Inertia + React (same as SwiftBiz)
- [x] HTML prototype complete — `SwiftApp Dev/swiftpos-prototype/index.html`
- [x] Sesi 1 — scaffold repo + migrations + auth + product CRUD ✅
- [x] Sesi 2 — cashier screen + cart + checkout + receipt PDF ✅
- [x] Sesi 3 — orders + reports + Z-report + routes ✅
- [x] UI redesign — glassmorphism matching prototype ✅
- [ ] **NEXT: Deploy ke Coolify** — GitHub repo + PostgreSQL + env vars
- [ ] Users module — admin manage cashiers
- [ ] DuitNow QR upload + display
- [ ] WhatsApp receipt share

## MVP Screens (11)
```
PUBLIC: /register, /login
CASHIER: /pos
ADMIN: /dashboard, /products, /categories, /orders, /reports, /users, /settings
```

## Key Decisions
- **DuitNow QR MVP**: static QR (admin upload gambar) — zero API, zero merchant fee
- **Dynamic QR Phase 2**: SenangPay/ToyyibPay integration
- **Receipt**: PDF + WhatsApp share (wa.me link)
- **Cashier login**: PIN (4-digit), admin login: email + password
- **Reuse dari SwiftBiz**: Docker, DomPDF pattern, CompanySetting → BusinessSetting, Auth scaffold

## Progress Log
### 2026-04-17 (Session resumed)
- Project loaded to Position #1

### 2026-04-14 (Night Session)
- Project created, SwiftJiran archived
- Market analysis: StoreHub (RM59+ Lite), Slurp (RM790 one-time), Loyverse (free/English), Qashier (RM1,098 hardware), Eats365 (modular/custom)
- Gap confirmed: BM-first + BYOD + RM49 flat + WhatsApp receipt — belum ada dalam market
- Brief written: `ProjectBrief/SwiftPOS_Project_Brief.md`
- MVP scope defined: 11 screens, DB schema column-level, cashier flow wireframe, Z-report format, 3-sesi build plan

## Progress Log
### 2026-04-17 (Afternoon Session)
- Full interactive HTML prototype built: `SwiftApp Dev/swiftpos-prototype/index.html`
- UI research: StoreHub, Slurp, Malaysian F&B POS counter layout patterns
- Stitch glassmorphism upgrade: Outfit font, gradient bg, blur panels, colour-coded cards
- Cashier screen: dark sidebar categories, Unsplash food images, colour-coded product cards
- 3 payment methods: Bayar Tunai / DuitNow QR / Touch 'n Go (butang berasingan)
- Product modal: image upload zone dengan live preview + remove button
- Product table: thumbnail gambar 40×40 setiap row
- All 5 modules functional: Kaunter, Produk, Laporan, Pengguna, Tetapan
- PIN-based cashier login UI
- Next: Sesi 1 — scaffold Laravel + Inertia + React (copy SwiftBiz pattern)

## Progress Log
### 2026-04-18 (Session — Full Build + UI Redesign)

**Sesi 1 — Scaffold + Foundation**
- Fresh Laravel 12 scaffold di `SwiftApp Dev/swiftpos/`
- 6 migrations: businesses, users (business_id+role+pin), categories, products, orders, order_items
- Models: Business, User (BelongsTo business), Product, Order, OrderItem, Category
- DemoSeeder: Warung Demo + admin demo@swiftpos.my / SwiftPOS2026 + 4 categories + 12 products
- Docker setup: copied dari SwiftBiz (PHP-FPM Alpine + nginx + supervisord)
- npm fix: Vite 8 + @vitejs/plugin-react@^4.5.0 + --legacy-peer-deps
- bootstrap.js fix: created manually (was missing after Breeze conflict)
- User model fix: added business() BelongsTo + $fillable with business_id/role/pin
- Dev server: http://127.0.0.1:8001

**Sesi 2 — Core Features**
- HandleInertiaRequests: share auth, business, flash globally
- PosController: index() + checkout() (DB transaction) + receipt() (DomPDF stream)
- DashboardController: today_sales, today_orders, total_products, recent_orders
- ProductController: full CRUD + image upload (Storage::disk('public'))
- CategoryController + SettingsController
- Receipt PDF: thermal 80mm, `resources/views/pdf/receipt.blade.php`
- Pages: Dashboard, POS (full-screen), Products, Categories, Settings

**Sesi 3 — Orders + Reports**
- OrderController: paginated index (date/method filter) + void()
- ReportController: getDailySummary, getMonthlySummary, getTopProducts, getLast7Days, zreport PDF
- Z-Report PDF: A5, `resources/views/pdf/zreport.blade.php`
- Pages: Orders/Index.jsx, Reports/Index.jsx
- Routes added: /orders, /orders/{order}/void, /reports, /reports/zreport

**UI Redesign — Glassmorphism (matching swiftpos-prototype)**
- `app.css`: gradient radial background + glass-panel + glass-card + btn-primary + gradient-text classes
- `AuthenticatedLayout.jsx`: top navbar (glass, no sidebar) — Desktop + mobile hamburger
- Font: Outfit (already in app.blade.php)
- All pages: bg-white → glass-card, table heads updated for glass style
- Dashboard: gradient-text heading, glass stat cards, glass-card tables
- tailwind.config.js: Outfit font + safelist for translate classes

**POS Module Redesign (matching prototype)**
- Dark sidebar (slate-800) dengan kategori icon + nama (flex-col)
- Search bar dalam dark header middle panel
- Product cards: glass/white dengan border-bottom category color
- Cart panel: dark header, order number row, cart items dengan image thumbnails (w-10 h-10)
- Payment buttons: Tunai (green, full width) + DuitNow + TnG (2-col grid) + Tahan Pesanan
- Checkout modal: glass-panel, 3 kaedah, cash change calculator
- Success modal: glass-panel
- Back button: "← Balik" in POS top navbar

**Bug Fixes**
- Sidebar visibility: lg:translate-x-0 missing from CSS → fixed via Tailwind safelist + localStorage persist
- POS: no back button → added "← Balik" link to /dashboard

**Next Steps**
- [ ] Deploy ke Coolify (Hetzner VPS)
  - Create GitHub repo swiftpos
  - Set up Coolify project + PostgreSQL container
  - Configure env vars (DB_CONNECTION=pgsql, APP_URL=pos.swiftapps.my)
  - Push + deploy
- [ ] Switch .env SQLite → PostgreSQL on production
- [ ] Users module (admin can add cashiers with PIN)
- [ ] DuitNow QR upload + display on checkout
- [ ] WhatsApp receipt share (wa.me link)

## Known Issues
- Local dev: SQLite only. PostgreSQL untuk Coolify production.
- Category icons in POS sidebar pakai 📋 placeholder — update bila ada emoji per kategori
