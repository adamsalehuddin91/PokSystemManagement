# MessyMates
*Coding Project - Registered 2026-05-06*

## Description
Boutique children's activity brand website + basic CRM. Public landing page showcasing sensory play, art classes, birthday packages, and SENSA products. Admin panel for inquiry/booking management, program CRUD, and product CRUD. Phase 1 MVP.

## Project Details
- **Status**: 🔵 IN PROGRESS — 8 pages built, Supabase setup pending
- **Registered**: 2026-05-06
- **Last Accessed**: 2026-05-14
- **Client**: MessyMates (children's activity brand)
- **Quote**: RM1,500 (50% deposit RM750 before start)
- **Timeline**: 10–14 working days after deposit received

## Tech Stack
- Next.js + Tailwind CSS
- Supabase (DB + Auth + Storage)
- Vercel (deploy)
- Custom domain (client-owned)

## Scope (Phase 1 — Locked)

### Public Website
- Hero section
- About MessyMates
- Programs / Activities
- Birthday Packages
- SENSA Product Preview
- Booking / Inquiry Form
- Contact / WhatsApp CTA

### Admin Panel (Simplified — List Only, NO charts)
- Admin login (Supabase Auth)
- Inquiry list + status update (New / Followed Up / Confirmed / Cancelled)
- Payment status update (Pending / Paid / Cancelled)
- WA follow-up button per inquiry
- Programs CRUD (add / edit / publish / unpublish)
- Products CRUD (add / edit / publish / unpublish)

### Database Tables
- `parents` — id, full_name, phone, email, address, created_at
- `children` — id, parent_id, child_name, age, allergies, notes
- `inquiries` — id, parent_id, child_id, inquiry_type, activity_name, preferred_date, message, status, payment_status, created_at
- `programs` — id, title, category, description, suitable_age, date, time, location, price, slot_limit, image_url, status, created_at
- `products` — id, product_name, category, description, price, availability_status, image_url, whatsapp_inquiry_text, status, created_at

## Excluded (Phase 1)
- Payment gateway
- Full e-commerce / cart
- Admin charts / analytics dashboard
- Parent login portal
- WhatsApp API automation
- Email automation
- Slot capacity management (auto)

## Future Phases
- Phase 2: Booking management (sessions, slots, calendar, confirmation)
- Phase 3: Payment + waiver (ToyyibPay/Billplz, upload proof, receipt)
- Phase 4: SENSA Shop (cart, checkout, pre-order, inventory)
- Phase 5: CRM + marketing (segmentation, broadcasts, analytics)

## Maintenance
- Option B offered: RM150/month (minor bugs, content updates, WA support)

## Design Direction
- Mockup: ChatGPT Image May 6, 2026 (saved in Downloads)
- Palette: Teal primary, Coral secondary, Soft Yellow accent, White bg
- Style: Boutique, rounded cards, mobile-first, pastel soft

## Reuse Patterns (from HMS Salon / SRITI)
- Parent/child profile → HMS customer profile pattern
- Status management → HMS transaction status pattern
- WA follow-up button → HMS WA receipt button
- Supabase Auth admin login → HMS / SwiftMoney pattern
- Program CRUD → HMS Services module
- Vercel + domain deploy → HMS deploy pattern

## Progress Log
- 2026-05-06: Project registered. Quotation sent (RM1,500). Pending client deposit.
- 2026-05-07: Project resumed (was position #9). Deposit received RM750. Design finalization started.
- 2026-05-08: User flow diagram + wireframe generated (pre-build planning).
  - User Flow saved: `ProjectBrief/MessyMates-User-Flow.md`
  - Wireframe saved: `ProjectBrief/MessyMates-Wireframe.md` — 5 pages + 2 modals
  - Pending: client assets (logo, hero image, brand colors, domain, content)
- 2026-05-14: Full build session. Wireframe updated (8 pages) to match client mockup.
  - Scope decision: absorb extra 3 pages (booking flow + customer detail) — RM1.5K locked
  - Project scaffolded: `SwiftApp Dev/messymates/` — Next.js 16 + Tailwind + Supabase + Recharts
  - Pages built: `/` + `/booking` + `/booking/checkout` + `/admin/login` + `/admin/inquiries` + `/admin/customers/[id]` + `/admin/programs` + `/admin/products`
  - Dev server running: http://localhost:3000 ✅
  - Pending: Supabase setup + client assets + deploy
