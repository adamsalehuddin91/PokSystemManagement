# SwiftRent — Project Brief

**Status**: 🔨 IN BUILD — Scaffold starting
**Created**: 2026-05-22
**Last Accessed**: 2026-05-23
**Position**: LRU #1
**Path**: `SwiftApp Dev/SwiftRent/`
**Stack**: Next.js + Prisma + PostgreSQL + Coolify (same as SwiftTaska)
**Target URL**: rent.swiftapps.my (cadangan)

---

## Konsep

Sistem pengurusan kereta sewa untuk operator SME Malaysia (1-20 kereta).
Target: operator kecil yang masih guna WhatsApp + Excel untuk manage booking.

**Pain points yang diselesaikan:**
- Double booking — availability calendar real-time
- Deposit & damage tracking — auto-calculate refund
- Blacklist pelanggan by IC — prevent repeat bad customers
- Road tax / insurance expiry reminder
- WA notification auto (konfirmasi booking, reminder return)
- Resit digital — professional image untuk pelanggan

---

## Pricing

| Pakej | Kereta | Setup | Monthly | Annual |
|-------|--------|-------|---------|--------|
| Starter | ≤ 5 | RM 2,000 | RM 150/bln | RM 1,500/thn |
| Standard | ≤ 15 | RM 3,000 | RM 220/bln | RM 2,200/thn |
| Fleet | Unlimited | RM 5,000 | RM 350/bln | RM 3,500/thn |

**Trial strategy:** 30 hari free → convert ke monthly/annual

---

## Modules

| Module | Pages | Priority |
|--------|-------|----------|
| Auth | /login | P1 |
| Dashboard | Today's pickups/returns, servis due | P1 |
| Fleet | /fleet, /fleet/[id], tambah modal | P1 |
| Booking | /bookings, /bookings/baru, /bookings/[id] | P1 |
| Pelanggan | /customers, /customers/[id], blacklist | P1 |
| Pickup/Return | Modal dalam booking detail | P1 |
| Laporan | /reports — hasil, utilisasi, top fleet | P2 |
| Tetapan | /settings — profil, WA template, deposit default | P2 |
| Notifikasi | WA booking confirm + return reminder | P2 |

---

## Database Schema (ERD)

Tables:
- `vehicles` — plate, brand, model, year, color, category, daily_rate, status, road_tax_expiry, insurance_expiry, photo_url
- `customers` — name, ic_no, phone, email, address, is_blacklisted, blacklist_reason
- `bookings` — vehicle_id, customer_id, pickup_date, return_date, total_days, daily_rate, total_amount, deposit_paid, status, pickup_notes, return_notes
- `payments` — booking_id, amount, type (deposit/balance/damage), method, reference_no, paid_at
- `damage_reports` — booking_id, description, charge_amount, photo_url, reported_at

---

## Competitive Landscape

| Competitor | Harga | Weakness |
|-----------|-------|---------|
| GoRentCar | Platform/OTA | Bukan management system |
| Manual (WA + Excel) | Free | Double booking, no tracking |
| Generic SaaS | ~RM 50/bln | No local support, no customization |

**Adam's edge:** Setup + training + WA support direct dengan developer. Fully BM. Built for Malaysian workflow.

---

## Wireframes

Mockup lengkap dijana pada 2026-05-22:
- Login, Dashboard, Fleet list + detail
- Booking list + buat baru + detail
- Pickup modal + Return modal (dengan damage calculation)
- Customer list + blacklist
- Reports

---

## Key UX Decisions

- Booking flow 3 langkah: cari IC → pilih kereta → deposit
- IC lookup auto-check blacklist sebelum boleh proceed
- Return flow auto-calculate: deposit - damage = refund amount
- Dashboard fokus hari ini: pickup pending + return pending
- Fleet cards: status badge real-time (Available / Disewa / Servis)

---

## Active Tasks

- [ ] Scaffold project (Next.js + Prisma + PostgreSQL)
- [ ] Auth setup (NextAuth)
- [ ] Fleet module (CRUD + status management)
- [ ] Booking module (create + lifecycle)
- [ ] Pickup / Return flow dengan modal
- [ ] Customer + blacklist system
- [ ] Payment & deposit tracking
- [ ] WA notification integration
- [ ] Reports page
- [ ] Landing page (BM, pricing, demo CTA)
- [ ] Deploy ke Coolify

---

## Progress Log

### 2026-05-23 — Project Loaded, Build Starting
- Loaded ke LRU #1 (dari Pipeline)
- SwiftPOS auto-archived (was #10)
- Stack confirmed: Next.js 15 + Prisma + PostgreSQL + NextAuth + Coolify
- Pattern: ikut SwiftTaska (dark sidebar, emerald theme, Phosphor icons)
- Start scaffold sekarang

### 2026-05-22 — Project Brief Saved

- Market validated: Ada market dalam segment SME operator kereta sewa Malaysia
- Pricing finalized: RM2,000-5,000 setup + RM150-350/bln
- Full system flow diagram + ERD dibuat
- ASCII wireframe mockup lengkap (9 pages + 3 modals)
- Belum start build — waiting Adam's go-ahead

---

## Quick Resume (bila dah start)

```bash
cd "E:/Project-AI-MemoryCore-main/SwiftApp Dev/SwiftRent"
npm run dev
# Pattern: ikut SwiftTaska structure
```
