# SwiftPOS — Project Brief
*SwiftApps Ecosystem | Created: 2026-04-14*

---

## Overview

SwiftPOS is a focused, affordable POS (Point of Sale) SaaS system targeting Malaysian F&B operators and kedai runcit. Masalah utama market: POS sedia ada mahal (StoreHub RM149-299/mo), complicated setup, dan tidak mesra pengguna untuk operator kecil. SwiftPOS masuk dengan harga agresif + setup mudah + UI Bahasa Malaysia.

---

## Target Market

| Segment | Saiz | Pain Point |
|---------|------|------------|
| Restoran / Warung / Cafe | 200,000+ | POS mahal, pakai manual atau kertas |
| Kedai Runcit / Mini Market | 150,000+ | Tiada sistem, inventory manual |
| F&B Booth / Pasar Malam | 50,000+ | Perlu mobile-friendly, quick checkout |
| Bubble Tea / Kiosk | 20,000+ | Need fast cashier, topping variants |

**Primary target**: Restoran + F&B (lebih urgent need, higher churn dari manual)

---

## Competitive Landscape

| Produk | Harga | Kelemahan |
|--------|-------|-----------|
| StoreHub | RM149–299/mo | Mahal, complex |
| QlickPOS | RM99–199/mo | UI lama, slow support |
| Slurp! | RM199/mo | F&B focused tapi mahal |
| Manual / Excel | Free | No reporting, no control |

**SwiftPOS positioning**: RM49–99/mo, setup dalam 15 minit, UI BM-first.

---

## Pricing (SaaS)

| Plan | Harga | Limit |
|------|-------|-------|
| Starter | RM49/mo | 1 terminal, 100 produk |
| Pro | RM99/mo | 3 terminal, unlimited produk, laporan lengkap |
| Business | RM179/mo | 10 terminal, multi-lokasi, e-Invoice LHDN |

---

## Core Features — MVP (Phase 1)

### 1. Cashier Screen
- Grid produk dengan kategori
- Tambah ke troli — quantity, diskaun item
- Checkout — Cash, DuitNow QR (generate QR live)
- Receipt — print thermal / PDF / hantar WhatsApp
- Hold order (tahan pesanan sementara)

### 2. Product Management (Admin)
- Tambah/edit/padam produk
- Kategori (Makanan, Minuman, Add-on)
- Harga + SST toggle (6%)
- Gambar produk (optional)
- Variasi produk (saiz, topping) — Phase 1 basic

### 3. Sales Report
- Laporan harian (Z-report) — jualan, bilangan transaksi, bayaran tunai vs QR
- Laporan mingguan / bulanan
- Top produk
- Export PDF / CSV

### 4. User Management
- Admin — full access
- Cashier — cashier screen only, no settings
- PIN login untuk cashier (cepat, no password)

### 5. Settings
- Nama perniagaan, logo, alamat
- SST toggle
- Prefix resit (e.g. INV-001)
- Thermal printer setup

---

## Phase 2 Features (Post-MVP)

- Inventory tracking (stok masuk/keluar, low stock alert)
- Table management (untuk dine-in restoran)
- Kitchen display system (KDS)
- e-Invoice LHDN (myInvois integration — reuse dari SwiftBiz)
- Loyalty points pelanggan
- Multi-lokasi / multi-terminal
- Offline mode (PWA — jual walaupun internet down)

---

## Tech Stack

| Layer | Tech | Reason |
|-------|------|--------|
| Backend | Laravel 12 | Adam dah expert, SwiftBiz proven |
| Frontend | Inertia.js + React 18 | Same pattern sebagai SwiftBiz |
| Database | PostgreSQL (Coolify) | Proven in production |
| Styling | Tailwind CSS | Consistent dengan ecosystem |
| PDF | Laravel DomPDF | Reuse dari SwiftBiz |
| QR Payment | DuitNow QR (static/dynamic) | Malaysia standard |
| Deploy | Coolify (Hetzner VPS) | Existing infra |
| Domain | pos.swiftapps.my | Consistent branding |

---

## Database Schema (Core)

```
businesses          → multi-tenant anchor
users               → admin + cashier, business_id FK
products            → name, price, category_id, sst_applicable
categories          → name, business_id
orders              → business_id, cashier_id, total, payment_method, status
order_items         → order_id, product_id, qty, unit_price, discount
receipts            → order_id, receipt_no, pdf_path
settings            → business_id, key, value (flexible config)
```

---

## UI/UX Principles

- **Cashier screen**: tablet/touchscreen friendly — big buttons, minimal text
- **Mobile**: cashier boleh guna phone untuk jual
- **BM-first**: semua label dalam BM (Jumlah, Bayar, Baki, Simpan)
- **Dark mode**: optional, untuk cashier screen night ops
- **Speed**: checkout dalam 3 tap — pilih produk → checkout → terima bayaran

---

## MVP Scope (Phase 1 Only)

Build order untuk ship cepat:

1. Auth + business setup (onboarding 5 minit)
2. Product CRUD + categories
3. Cashier screen — cart + checkout (cash only dulu)
4. Receipt PDF
5. DuitNow QR payment
6. Sales report harian
7. Multi-user (admin + cashier PIN)
8. Deploy ke pos.swiftapps.my

**Target MVP**: 2–3 sesi kerja

---

## Reusable dari SwiftBiz

- Docker setup (Dockerfile + entrypoint.sh + nginx.conf)
- PdfService pattern
- CompanySetting pattern → BusinessSetting
- Auth scaffold (Laravel Breeze + Inertia)
- PDF templates (receipt format baru)
- Migration patterns
- Coolify deployment workflow

---

## Success Metrics (3 bulan post-launch)

- 10 paying customers (restoran / kedai)
- RM490–990/mo MRR
- NPS > 8 — "senang guna"
- Setup time < 15 minit untuk new business
