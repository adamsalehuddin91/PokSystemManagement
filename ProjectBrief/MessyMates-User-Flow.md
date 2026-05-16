# User Flow — MessyMates

**Generated**: 2026-05-08
**Roles**: Guest (Public) │ Admin
**Status**: Pre-build (berdasarkan scope brief — assets client pending)

---

```
╔══════════════════════════════════════════════════════════════╗
║  USER FLOW — MessyMates                                      ║
║  Roles: Guest (Public) │ Admin                               ║
╚══════════════════════════════════════════════════════════════╝


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  GUEST / PUBLIC FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    ┌─────────────────┐
                    │  / (Landing)    │  ◄── Entry (URL / FB link)
                    │  Hero section   │
                    └────────┬────────┘
                             │ scroll / nav click
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
   [#programs]          [#birthday]         [#sensa]
          │                  │                  │
          ▼                  ▼                  ▼
  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
  │ Programs     │  │ Birthday     │  │ SENSA Preview    │
  │ section      │  │ Packages     │  │ section          │
  │              │  │ section      │  │                  │
  │ [Book Now]   │  │ [Enquire Now]│  │ [Order via WA 💬]│
  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘
         │                 │                    │
         │                 │              [WhatsApp opens]
         │                 │              wa.me/60xxx?text=...
         └────────┬─────────┘                   ✅ done
                  │
                  ▼
          ┌───────────────────────────────────────┐
          │  #booking — Inquiry / Booking Form    │
          │                                       │
          │  Nama, Phone, Email                   │
          │  Nama Anak, Umur, Alahan              │
          │  Jenis Inquiry [Program/Bday/SENSA]   │
          │  Pilih Aktiviti, Tarikh, Mesej        │
          └───────────────┬───────────────────────┘
                          │
               ┌──────────┴──────────┐
               ▼                     ▼
          [lengkap]            [tidak lengkap]
               │                     │
               │               ❌ Validation error
               │                (field highlighted)
               ▼
          [Submit → Supabase]
               │
               ▼
          ┌───────────────────────────────┐
          │  ✅ Success toast/message     │
          │  "Terima kasih! Kami akan     │
          │   hubungi anda tidak lama."   │
          └───────────────────────────────┘
               │
               ▼
          [Form reset — boleh submit lagi]


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ADMIN FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌──────────────────┐
  │ /admin/login     │  ◄── Entry (admin only)
  └────────┬─────────┘
           │
      ┌────┴────┐
      ▼         ▼
  [valid]   [gagal]
      │         │
      │    ❌ Error — cuba semula
      ▼
  ┌───────────────────────────────────────────────┐
  │ /admin/inquiries  (default landing)           │
  │  List semua inquiries dari booking form       │
  └──────────┬────────────────────────────────────┘
             │
    ┌─────────┼──────────────┬──────────────┐
    ▼         ▼              ▼              ▼
[filter     [search      [klik WA    [klik Status
 status]     nama]        button]     dropdown]
    │         │              │              │
    │         │         ┌────┴────┐    ┌────┴──────────────┐
    │         │         │WhatsApp │    │ Update Status     │
    │    [list          │ buka    │    │ New               │
    │  filtered]        │ dengan  │    │ Followed Up       │
    │                   │ no.     │    │ Confirmed         │
    │                   │ client  │    │ Cancelled         │
    │                   └─────────┘    ├───────────────────┤
    │                                  │ Update Bayaran    │
    │                                  │ Pending           │
    │                                  │ Paid              │
    │                                  │ Cancelled         │
    │                                  └───────────────────┘
    │                                       │
    │                                  [saved → list refresh]
    │
    ▼ (nav ke Programs)
  ┌───────────────────────────────────────────────┐
  │ /admin/programs                               │
  │  Grid semua programs                          │
  └──────────┬────────────────────────────────────┘
             │
    ┌─────────┼────────────┬──────────────┐
    ▼         ▼            ▼              ▼
[+ Tambah] [Edit ✏]  [Publish /     [🗑 Padam]
    │           │      Unpublish]        │
    ▼           ▼           │            ▼
┌────────┐ ┌────────┐       │      ┌────────────────┐
│ Modal: │ │ Modal: │  [toggle      │ Confirm padam? │
│ Tambah │ │ Edit   │   status]     │ [Ya] [Batal]   │
│Program │ │Program │       │       └────────────────┘
└───┬────┘ └───┬────┘       │
    │          │        [Published ↔ Draft]
    ▼          ▼
[Simpan Draft]
[Publish Terus]
    │
    ▼
[list refresh]


  ┌───────────────────────────────────────────────┐
  │ /admin/products                               │
  │  Grid SENSA products                          │
  └──────────┬────────────────────────────────────┘
             │
    ┌─────────┼────────────┬──────────────┐
    ▼         ▼            ▼              ▼
[+ Tambah] [Edit ✏]  [Toggle Live/   [🗑 Padam]
    │           │      Off]              │
    ▼           ▼           │            ▼
┌────────┐ ┌────────┐  [status          ┌────────────────┐
│ Modal: │ │ Modal: │   toggle]         │ Confirm padam? │
│ Tambah │ │ Edit   │       │           │ [Ya] [Batal]   │
│Product │ │Product │       ▼           └────────────────┘
└───┬────┘ └───┬────┘  [Live ↔ Off]
    │          │
    ▼          ▼
  [Simpan → list refresh]


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CROSS-ROLE: BOOKING → INQUIRY LOOP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Guest isi booking form
  [/ #booking]
       │
       │ POST → Supabase inquiries table
       ▼
  ✅ "Terima kasih" message
       │
       ▼                         Admin buka /admin/inquiries
  inquiry masuk DB ─────────────► [🟡 New] muncul dalam list
                                       │
                                  [klik WA 💬]
                                       │
                                  WhatsApp buka
                                  dengan no. client
                                       │
                                  Admin follow up
                                       │
                                  [Update: Followed Up]
                                  [Update: Confirmed]
                                  [Update Bayaran: Paid ✅]


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PUBLIC ROUTES          PROTECTED ROUTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  /                      /admin/*  → redirect ke /admin/login
  /admin/login             kalau belum auth
```
