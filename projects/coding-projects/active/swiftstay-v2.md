# SwiftStay v2
*Coding Project - Created 2026-05-20*

## Description
CRM + branded landing page system for Malaysian homestay and rumah sewa owners. Zero-commission direct booking, guest management, payment tracking, multi-unit support, and availability calendar. Replaces manual WhatsApp + Excel workflow.

## Project Details
- **Status**: 🟡 IN PROGRESS — Scaffold done, Supabase wiring pending
- **Created**: 2026-05-20
- **Last Accessed**: 2026-05-20 (Night)
- **Position**: #1
- **Client**: Open (SaaS product — multiple owners)
- **Pricing**: Setup RM1,500–2,500 + RM150–220/month

## Stack
- **Framework**: Next.js + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (owner login)
- **Deploy**: Coolify → stay.swiftapps.my (or custom domain)
- **Repo**: TBD
- **Branch**: `main`

## Resume
```bash
cd "SwiftApp Dev/swiftstay-v2"
npm run dev
```

## Scope (Phase 1 — MVP)

### Public Landing Page (per property)
- Hero + property photos (Pollinations.ai images)
- Highlights — WiFi, parking, pool, max pax
- Weekday / weekend / peak pricing
- Availability calendar (read-only)
- Booking inquiry form
- WhatsApp CTA
- House rules + location (Google Maps embed)

### Owner CRM Dashboard
- Admin login (Supabase Auth)
- Bookings — check-in/out, unit, pax, status (Pending/Confirmed/Checked-in/Completed)
- Guests — IC/passport, phone, repeat visitor badge, stay history
- Payments — deposit, balance, method (Bank/TnG/Cash), receipt
- Units — multi-unit CRUD (Bilik A, Unit 2-3, Villa)
- Calendar — availability view, block dates
- Dashboard — occupancy %, revenue this month, pending balance, upcoming check-ins

## Database Schema (Supabase — multi-tenant dari hari 1)

```sql
owners         → id, name, email, phone, subscription_plan, created_at
properties     → id, owner_id, name, address, type (homestay/sewa), description
units          → id, property_id, name, type, max_pax, weekday_price, weekend_price, peak_price
guests         → id, owner_id, name, ic_no, phone, email, address, notes
bookings       → id, unit_id, guest_id, check_in, check_out, pax, status, total_price, notes
payments       → id, booking_id, amount, method, type (deposit/balance/full), paid_at
blocked_dates  → id, unit_id, date, reason
```

## Excluded (Phase 1)
- Online payment gateway (inquiry-based, owner collects manually)
- Guest portal / login
- Automated email/WhatsApp
- Multi-language toggle
- Analytics charts

## Future Phases
- Phase 2: ToyyibPay/Billplz deposit payment
- Phase 3: Guest portal (view own bookings)
- Phase 4: WhatsApp automation (booking confirm, reminder)
- Phase 5: Multi-owner SaaS (self-signup, billing)

## Key Decisions
- PostgreSQL via Supabase — NOT SQLite (SwiftStay v1 was SQLite, not production-ready)
- Skip Prisma — use Supabase client directly (avoids AP-017, AP-011)
- Multi-tenant from day 1 — `owner_id` on all tables (CL-001)
- Deploy Coolify — proven pattern (LorryTech, SRITI, SwiftTaska)

## Reuse Patterns
- Supabase Auth admin login → HMS / SwiftMoney pattern
- Status management → HMS transaction status pattern
- WA follow-up button → HMS WA receipt button pattern (P-007)
- Payment tracking → SwiftMoney pattern
- Vercel/Coolify deploy → proven stack

## Active Tasks
- [x] ERD diagram + user flow
- [x] Scaffold Next.js project
- [x] Landing page (public) — Hero, Gallery, Pricing, Calendar, Rules, CTA
- [x] Owner login + dashboard (static UI)
- [x] Bookings CRUD (static UI)
- [x] Guests CRUD (static UI)
- [x] Payments tracking (static UI)
- [x] Calendar / availability (static UI)
- [x] Units CRUD (static UI)
- [x] Images — 8 ChatGPT images renamed + gallery section added
- [ ] Create Supabase project + fill .env.local
- [ ] Supabase schema setup (SQL in dashboard)
- [ ] Wire real data — bookings, guests, payments, calendar, units
- [ ] Add OG meta tag (og-image.jpg) to layout.tsx
- [ ] Deploy Coolify → stay.swiftapps.my

## Progress Log

### 2026-05-20 Night
- Full project scaffold selesai — semua pages static UI done.
- 8 images generated via ChatGPT DALL-E 3, renamed + saved to `public/`.
- Gallery section added to landing page (7 images, hover zoom).
- Calendar compacted — mini teaser with "Semak tarikh →" link.
- Supabase URL guard pattern applied (same as MessyMates).
- Pattern P-010 saved: ChatGPT image batch one-by-one format.
- Next: Create Supabase project → wire real data → deploy Coolify.

### 2026-05-20
- Project registered. Idea research done. Stack finalized: Next.js + Supabase + Coolify.
- ERD + user flow generated. Wireframes screenshotted via Puppeteer.
- Facebook posts drafted (3 versions).
- PostgreSQL confirmed (replacing SwiftStay v1's SQLite).
- Old SwiftStay v1 kept in `SwiftApp Dev/swiftstay/` for reference only.

## Known Issues
- None yet

## Resources
- SwiftStay v1 (reference): `SwiftApp Dev/swiftstay/` — Next.js + Prisma + SQLite (localhost)
- Reuse patterns from: HMS Salon, SwiftMoney, LorryTech OS
