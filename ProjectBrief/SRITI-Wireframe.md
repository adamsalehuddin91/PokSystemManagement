# SRITI School System — ASCII Wireframes
**Stack**: Next.js + Supabase | **Updated**: 2026-05-11
**Roles**: Admin / Staff / Guru Besar | Parent | Public (Guest)
**Pages**: 20 pages + 5 modals

---

## ─── PUBLIC / GUEST ──────────────────────────────────────

```
PAGE: /login
Role: Guest (Public)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              ┌────────────────────────┐                 │
│              │ [✻] SRITI              │                 │
│              │  Sistem Pengurusan     │                 │
│              │  Sekolah Al-Fattah     │                 │
│              └────────────────────────┘                 │
│                                                         │
│              ┌────────────────────────┐                 │
│              │ E-mel                  │                 │
│              │ [________________________]               │
│              │                        │                 │
│              │ Kata Laluan            │                 │
│              │ [________________________]               │
│              │                                          │
│              │ [        Log Masuk        ]              │
│              └────────────────────────┘                 │
│                                                         │
│                 (Portal Ibu Bapa? Guna                  │
│                  link jemputan anda)                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
  → Admin/Staff/GuruBesar: redirect /dashboard
  → Parent: redirect /parent
```

---

```
PAGE: /auth/set-password
Role: Parent (via jemputan email)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              ┌────────────────────────┐                 │
│              │ [✻] SRITI              │                 │
│              │                        │                 │
│              │  Tetapkan Kata Laluan  │                 │
│              │  Baharu                │                 │
│              │                        │                 │
│              │ Kata Laluan Baharu     │                 │
│              │ [_____________________]│                 │
│              │                        │                 │
│              │ Sahkan Kata Laluan     │                 │
│              │ [_____________________]│                 │
│              │                        │                 │
│              │ [  Tetapkan & Masuk   ]│                 │
│              └────────────────────────┘                 │
│                                                         │
│  ✅ Berjaya → redirect /parent                          │
│  ❌ Gagal   → "Pautan tidak sah atau tamat tempoh"      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

```
PAGE: /resit/[invoiceId]
Role: Public (no auth — share via WA link)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────────────────────────────────────────────────┐
│              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ          │
│  ┌───────────────────────────────────────────────────┐  │
│  │            RESIT RASMI                            │  │
│  │         SRITI AL-FATTAH                           │  │
│  │  ─────────────────────────────────────────────   │  │
│  │  No. Resit: INV-2026-0001                         │  │
│  │  Tarikh   : 11 Mei 2026                           │  │
│  │  ─────────────────────────────────────────────   │  │
│  │  Nama Pelajar : Muhammad Adam Luqman              │  │
│  │  No. Pelajar  : STU-2026-0001                     │  │
│  │  Kelas        : 1 Ikhlas                          │  │
│  │  ─────────────────────────────────────────────   │  │
│  │  Butiran Bayaran:                                 │  │
│  │  Yuran Sekolah Mei 2026          RM 120.00        │  │
│  │  Diskaun                         RM  10.00        │  │
│  │                                  ─────────        │  │
│  │  JUMLAH BERSIH                   RM 110.00        │  │
│  │  ─────────────────────────────────────────────   │  │
│  │  Kaedah   : Transfer Bank                        │  │
│  │  Jumlah   : Ringgit Malaysia Seratus Sepuluh     │  │
│  │             Ringgit Sahaja                       │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│         [ 🖨 Cetak / Simpan PDF ]                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ─── ADMIN / STAFF / GURU BESAR ─────────────────────────

```
LAYOUT: DashboardLayout (Sidebar + TopBar)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌──────────────────┬──────────────────────────────────────┐
│ SIDEBAR (w-64)   │  TOPBAR                              │
│ bg-[#0B4233]     │  [☰ Menu]  [Judul Halaman]  [🔔 N]  │
│                  ├──────────────────────────────────────┤
│ [✻] SRITI        │                                      │
│  Sistem          │       {children}                     │
│  Pengurusan      │                                      │
│  Sekolah         │                                      │
│ ──────────────   │                                      │
│ [👤 Adam]        │                                      │
│  Admin 🟢 Online │                                      │
│ ──────────────   │                                      │
│ 🏠 Dashboard     │                                      │
│ 👥 Pelajar       │                                      │
│ 💳 Yuran &       │                                      │
│    Bayaran       │                                      │
│ 📋 Tracker Yuran │                                      │
│ 📊 Laporan       │                                      │
│ ⚙ Tetapan        │                                      │
│ ──────────────   │                                      │
│ 🚪 Log Keluar    │                                      │
└──────────────────┴──────────────────────────────────────┘
  Mobile: Sidebar = drawer overlay (☰ buka, backdrop tutup)
```

---

```
PAGE: /dashboard
Role: Admin / Staff / Guru Besar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  Selamat Petang, Adam 👋                                │
│  Ahad, 11 Mei 2026                                      │
│                                                         │
│  ┌───────────┐ ┌───────────┐ ┌──────────┐ ┌──────────┐ │
│  │ 👥 Jumlah │ │ 📈 Kutipan│ │ ⚠ Tunggak│ │ ✅ Bayar │ │
│  │ Pelajar   │ │ Bulan Ini │ │          │ │          │ │
│  │   247     │ │ RM 8,250  │ │ RM 3,400 │ │    189   │ │
│  │ Aktif     │ │ Mei 2026  │ │ 58 belum │ │ dp 247   │ │
│  └───────────┘ └───────────┘ └──────────┘ └──────────┘ │
│                                                         │
│  ┌─────────────────────────────────┐ ┌───────────────┐  │
│  │  Bayaran Terkini                │ │ Koleksi Mei   │  │
│  │  [Lihat semua →]                │ │ 189/247       │  │
│  │  ─────────────────────────────  │ │ ▓▓▓▓▓▓▓░ 77% │  │
│  │  [A] Adam Luqman  Disahkan RM.. │ │ 58 belum bayar│  │
│  │  [S] Siti Rahmah  Pending  RM.. │ ├───────────────┤  │
│  │  [M] Mohd Faris   Disahkan RM.. │ │ ⏰ Perlu      │  │
│  │  [H] Hanis Iman   Pending  RM.. │ │  Disahkan     │  │
│  │  [F] Fatin Nadia  Disahkan RM.. │ │      12       │  │
│  └─────────────────────────────────┘ │ bukti bayaran │  │
│                                      │ [Semak Skrg]  │  │
│                                      └───────────────┘  │
```

---

```
PAGE: /dashboard/pelajar
Role: Admin / Staff
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  Pelajar                                                │
│  247 pelajar aktif               [+ Tambah] [Naik Tahun]│
│                                                         │
│  [🔍 Cari nama / no pelajar___] [Semua Tahun ▾]        │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Nama              Kelas    No.MyKid  Jantina  >  │   │
│  │ ─────────────────────────────────────────────    │   │
│  │ Ahmad Faris       1 Ikhlas  xxxxxx   L        >  │   │
│  │ Amirah Sofea      2 Amanah  xxxxxx   P        >  │   │
│  │ Danial Hakimi     1 Ikhlas  xxxxxx   L        >  │   │
│  │ Nur Aisyah        3 Ilmu    xxxxxx   P        >  │   │
│  │ ...                                            >  │   │
│  └──────────────────────────────────────────────────┘   │
```

**Modal: TambahPelajarModal**
```
┌──────── TambahPelajarModal ─────────────────────────────┐
│ Step 1: Maklumat Pelajar                                │
│  Nama Penuh    [_________________________________]       │
│  No. MyKid/IC  [_________________________________]       │
│  Jantina       [L] [P]                                  │
│  Tarikh Lahir  [__________] ← auto-parse IC             │
│  Tahun         [Pilih ▾]                                │
│  Kelas         [Pilih ▾]                                │
│  [Seterusnya →]                                         │
│                                                         │
│ Step 2: Maklumat Penjaga                                │
│  Nama Penjaga  [_________________________________]       │
│  No. Telefon   [_________________________________]       │
│  E-mel         [_________________________________]       │
│  [← Kembali]                    [Daftar Pelajar]        │
└─────────────────────────────────────────────────────────┘
```

**Modal: NaikTahunModal**
```
┌──────── NaikTahunModal ─────────────────────────────────┐
│ Step 1: Preview                                         │
│  Tahun 1 (45 pelajar) → Tahun 2                         │
│  Tahun 5 (38 pelajar) → Tahun 6                         │
│  Tahun 6 (32 pelajar) → Tamat (Tidak Aktif)             │
│  ⚠ 32 pelajar akan ditandakan tidak aktif               │
│  [Seterusnya →]                                         │
│                                                         │
│ Step 2: Sahkan (MERAH — Tidak boleh diundo)             │
│  [✓] Saya faham proses ini tidak boleh diundo           │
│  [Batal]                  [🔴 Teruskan Naik Tahun]      │
│                                                         │
│ Step 3: Selesai ✅                                      │
└─────────────────────────────────────────────────────────┘
```

---

```
PAGE: /dashboard/pelajar/[id]
Role: Admin / Staff
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  ← Kembali     Ahmad Faris bin Mohd Noor               │
│                                                         │
│  [📷 ]  Ahmad Faris         (🟢 Aktif)                 │
│  STU-2026-0001   Tahun 1 Ikhlas                        │
│                              [✎ Edit Profil]            │
│                                                         │
│  [  Profil  ] [  Penjaga  ] [  Sejarah Yuran  ]        │
│  ──────────────────────────────────────────────         │
│                                                         │
│  Tab: Profil                                            │
│  ┌───────────────────────────────────────────┐          │
│  │ No. MyKid/IC  : 201501234567              │          │
│  │ Jantina       : Lelaki                    │          │
│  │ Tarikh Lahir  : 1 Januari 2015            │          │
│  │ Alamat        : No 5, Jln ...             │          │
│  │ No. Pelajar   : STU-2026-0001             │          │
│  │ Tahun / Kelas : Tahun 1 / 1 Ikhlas       │          │
│  │ Tarikh Daftar : 1 Jan 2026                │          │
│  │ Dokumen       : [📎 Muat Naik] (kosong)   │          │
│  └───────────────────────────────────────────┘          │
│                                                         │
│  Tab: Penjaga                                           │
│  ┌───────────────────────────────────────────┐          │
│  │ Nama   : Mohd Noor bin Hassan             │          │
│  │ Telefon: [013-456789__] [💾]              │          │
│  │ E-mel  : [noor@gmail.com_] [💾]           │          │
│  │                                           │          │
│  │ [📨 Hantar Jemputan Portal]               │          │
│  │  → Hantar email invite ke parent          │          │
│  └───────────────────────────────────────────┘          │
│                                                         │
│  Tab: Sejarah Yuran                                     │
│  ┌───────────────────────────────────────────┐          │
│  │ Dijana: RM 1,200  Dibayar: RM 990         │          │
│  │ Baki  : RM 210                            │          │
│  │ ─────────────────────────────────────     │          │
│  │ INV-001  Jan 2026  RM110  (✅ Dibayar)  > │          │
│  │ INV-002  Feb 2026  RM110  (✅ Dibayar)  > │          │
│  │ INV-005  Mei 2026  RM110  (🟡 Pending) >  │          │
│  └───────────────────────────────────────────┘          │
```

---

```
PAGE: /dashboard/yuran
Role: Admin / Staff
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  Yuran & Bayaran                                        │
│                   [+ Jana Invois] [Jana Semua]          │
│                                                         │
│  [  Invois  ] [  Bayaran  ]                             │
│  ─────────────────────────────────────────────          │
│                                                         │
│  Tab: Invois                                            │
│  [🔍 Cari pelajar___] [Semua Status ▾] [Semua Bulan ▾] │
│  ┌──────────────────────────────────────────────────┐   │
│  │ No. Inv    Pelajar    Bulan    RM    Status       │   │
│  │ ─────────────────────────────────────────────    │   │
│  │ INV-0012  Amirah S.  Mei 26  110  (🔵 Dihantar) >│   │
│  │ INV-0011  Ahmad F.   Mei 26  110  (🟢 Dibayar)  >│   │
│  │ INV-0010  Danial H.  Mei 26  110  (🟡 Pending)  >│   │
│  │ INV-0009  Nur A.     Apr 26  110  (🔴 Tertunggak)>│   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  Tab: Bayaran (bukti bayaran dari parents)              │
│  [🔍 Cari___]  [Semua Status ▾]                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Pelajar    Penjaga   Kaedah   RM    Status       │   │
│  │ ─────────────────────────────────────────────    │   │
│  │ Amirah S.  Puan Ros  Transfer 110  (⏰ Pending) >│   │
│  │ Ahmad F.   En. Noor  QR       110  (✅ Disahkan) >│   │
│  └──────────────────────────────────────────────────┘   │
```

**Modal: JanaInvoisModal**
```
┌──────── JanaInvoisModal ────────────────────────────────┐
│ Pilih Pelajar  [Cari pelajar... ▾]                      │
│ Bulan          [Pilih ▾]   Tahun [2026 ▾]               │
│ Item (Auto dari Tahun 1):                               │
│  ✅ Yuran Sekolah  RM 100  (badge: Auto-diisi Tahun 1)  │
│  ✅ Yuran PIBG     RM  20                               │
│  [ ] Tambah item lain [+ Tambah]                        │
│ ──────────────────────────────────────────────          │
│ Diskaun Adik-beradik  [✓] -10%  (auto-detect)          │
│ Diskaun Ramadan        [ ] -10%                         │
│ Diskaun Manual        [RM ___]                          │
│ ──────────────────────────────────────────────          │
│  Subtotal: RM 120 │ Diskaun: RM 12                      │
│  Jumlah Bersih: RM 108                                  │
│  [Batal]                          [Jana Invois]         │
└─────────────────────────────────────────────────────────┘
```

**Modal: VerifyModal**
```
┌──────── VerifyModal ────────────────────────────────────┐
│ Sahkan Bayaran                                          │
│ Pelajar : Ahmad Faris                                   │
│ Invois  : INV-001 Mei 2026  RM 110                      │
│ Bukti   : [🖼 preview gambar]                           │
│ Kaedah  : Transfer Bank                                 │
│                                                         │
│ [❌ Tolak]                          [✅ Sahkan]          │
│ [🧾 Lihat Resit Rasmi]                                  │
└─────────────────────────────────────────────────────────┘
```

---

```
PAGE: /dashboard/yuran/invois/[id]
Role: Admin / Staff
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  ← Kembali    INV-2026-0012                  (🔵 Dihantar) │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Pelajar  : Amirah Sofea bt Rosli               │    │
│  │  Penjaga  : Puan Roslina  · 013-xxxxxxx         │    │
│  │  Kelas    : 2 Amanah                            │    │
│  │  Bulan    : Mei 2026                            │    │
│  │  ────────────────────────────────────           │    │
│  │  Yuran Sekolah         RM 100.00                │    │
│  │  Yuran PIBG            RM  20.00                │    │
│  │  Diskaun adik-beradik  RM -12.00                │    │
│  │  ────────────────────────────────               │    │
│  │  JUMLAH BERSIH         RM 108.00                │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  [📲 Hantar WA]   [🧾 Lihat Resit]                     │
```

---

```
PAGE: /dashboard/tracker
Role: Admin / Staff
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  Tracker Yuran                                          │
│                                                         │
│  [  Bulanan  ] [  Tunggakan  ]                          │
│  ──────────────────────────────────────────             │
│                                                         │
│  Tab: Bulanan                                           │
│  [Mei ▾]  [2026 ▾]                                     │
│                                                         │
│  ┌──────────┐ ┌───────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Jumlah   │ │ Sudah     │ │ Belum    │ │ Kutipan  │  │
│  │ Pelajar  │ │ Bayar     │ │ Bayar    │ │ (RM)     │  │
│  │  247     │ │  189      │ │   58     │ │ RM 8,250 │  │
│  └──────────┘ └───────────┘ └──────────┘ └──────────┘  │
│                                                         │
│  [ 📋 Salin Semua Nombor WA ]                           │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Kelas: 1 Ikhlas (12 belum bayar)                │    │
│  │ ──────────────────────────────────────────────  │    │
│  │ Ahmad Faris    013-xxxxxxx    [🟡 Belum] [📲]   │    │
│  │ Danial Hakimi  013-xxxxxxx    [🟡 Belum] [📲]   │    │
│  │ ...                                             │    │
│  │ Kelas: 2 Amanah (5 belum bayar)                 │    │
│  │ ...                                             │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  Tab: Tunggakan (2+ bulan dalam 6 bulan terakhir)       │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Amirah Sofea   [Jan][Feb][Mac]  3 bln  [📲 WA]  │    │
│  │ Siti Khadijah  [Jan][Feb]       2 bln  [📲 WA]  │    │
│  └─────────────────────────────────────────────────┘    │
```

---

```
PAGE: /dashboard/laporan
Role: Admin / Guru Besar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  Laporan             [2026 ▾]                           │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ Kutipan  │ │ Dijana   │ │ Peratus  │ │ Tunggakan│   │
│  │ RM 49,500│ │ RM 64,200│ │   77%    │ │ RM14,700 │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                         │
│  ┌────────────────────────────────────────────────┐     │
│  │ Bulan  │ Dijana    │ Dibayar   │ Baki    │ %   │     │
│  │ ────── │ ──────── │ ──────── │ ────── │ ──  │     │
│  │ Jan    │ RM 5,200  │ RM 4,800  │ RM 400  │████ │     │
│  │ Feb    │ RM 5,200  │ RM 4,950  │ RM 250  │████ │     │
│  │ Mac    │ RM 5,200  │ RM 4,200  │ RM1,000 │███░ │     │
│  │ ...    │ ...       │ ...       │ ...     │     │     │
│  └────────────────────────────────────────────────┘     │
│                                                         │
│  [  Invois  ] [  Tunggakan  ]                           │
│  Tab: Tunggakan — senarai pelajar dengan baki belum bayar│
```

---

```
PAGE: /dashboard/tetapan
Role: Admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  Tetapan                                                │
│                                                         │
│  ┌─ Profil Sekolah ──────────────────────────────┐     │
│  │  Nama Sekolah  [SRITI Al-Fattah______________] │     │
│  │  Alamat        [____________________________] │     │
│  │  No. Telefon   [____________________________] │     │
│  │  Logo          [📷 Muat Naik Logo]             │     │
│  │                              [Simpan]          │     │
│  └────────────────────────────────────────────────┘     │
│                                                         │
│  ┌─ Maklumat Bank ───────────────────────────────┐     │
│  │  Bank           [Maybank_________________ ▾]  │     │
│  │  No. Akaun      [____________________________] │     │
│  │  Nama Pemegang  [____________________________] │     │
│  │                              [Simpan]          │     │
│  └────────────────────────────────────────────────┘     │
│                                                         │
│  ┌─ Tetapan Yuran ───────────────────────────────┐     │
│  │  Tahun 1: Yuran Sekolah RM100 | PIBG RM20     │     │
│  │  Tahun 2: Yuran Sekolah RM100 | PIBG RM20     │     │
│  │  ...                                           │     │
│  │  [+ Tambah Preset]              [Edit] [Padam]│     │
│  └────────────────────────────────────────────────┘     │
```

---

## ─── PARENT ──────────────────────────────────────────────

```
LAYOUT: Parent (mobile-first, bottom nav)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────────────────────────────────────────────────┐
│  [✻] SRITI                              [👤 Profil]     │
├─────────────────────────────────────────────────────────┤
│                   {children}                            │
├─────────────────────────────────────────────────────────┤
│  [🏠 Utama]  [📄 Yuran]  [💳 Bayar]  [🧾 Resit]        │
└─────────────────────────────────────────────────────────┘
```

---

```
PAGE: /parent
Role: Parent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  Selamat Datang, Puan Roslina 👋                        │
│                                                         │
│  ┌──────────────────────────────────────────────┐       │
│  │  📋 Invois Terkini                           │       │
│  │  ──────────────────────────────────────────  │       │
│  │  INV-012  Amirah Sofea  Mei 2026  RM108      │       │
│  │           2 Amanah          (🔵 Belum Bayar) │       │
│  │                              [Bayar Sekarang]│       │
│  │  ──────────────────────────────────────────  │       │
│  │  INV-007  Amirah Sofea  Apr 2026  RM108      │       │
│  │                              (✅ Dibayar)     │       │
│  └──────────────────────────────────────────────┘       │
│                                                         │
│  Shortcut cards:                                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │ 📄 Yuran   │  │ 💳 Bayar   │  │ 🧾 Resit   │        │
│  │ Senarai    │  │ Sekarang   │  │ Terkini    │        │
│  └────────────┘  └────────────┘  └────────────┘        │
```

---

```
PAGE: /parent/yuran
Role: Parent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  Yuran Saya                                             │
│                                                         │
│  [  Belum Bayar (3)  ] [  Selesai  ]                    │
│  ─────────────────────────────────────────────          │
│                                                         │
│  Tab: Belum Bayar                                       │
│  ┌──────────────────────────────────────────────┐       │
│  │ Amirah Sofea · 2 Amanah                      │       │
│  │ Mei 2026     RM 108.00   (🔵 Belum Bayar)    │       │
│  │                      [Bayar]  [🧾 Resit]     │       │
│  │ ─────────────────────────────────────────    │       │
│  │ Apr 2026     RM 108.00   (🔴 Tertunggak)     │       │
│  │                      [Bayar]  [🧾 Resit]     │       │
│  └──────────────────────────────────────────────┘       │
│                                                         │
│  Tab: Selesai                                           │
│  ┌──────────────────────────────────────────────┐       │
│  │ Mac 2026  RM 108.00  ✅ Disahkan  [🧾 Resit] │       │
│  │ Feb 2026  RM 108.00  ✅ Disahkan  [🧾 Resit] │       │
│  └──────────────────────────────────────────────┘       │
```

---

```
PAGE: /parent/bayar/[id]
Role: Parent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  ← Kembali    Bayar Yuran                               │
│                                                         │
│  ┌────────────────────────────────────────────┐         │
│  │  INV-2026-0012                             │         │
│  │  Amirah Sofea · 2 Amanah · Mei 2026        │         │
│  │  Jumlah Perlu Dibayar: RM 108.00           │         │
│  └────────────────────────────────────────────┘         │
│                                                         │
│  Kaedah Bayaran:                                        │
│  [○] Transfer Bank   [○] Tunai   [○] QR Code           │
│                                                         │
│  Bank  : Maybank                                        │
│  Akaun : 1234 5678 9012                                 │
│  Nama  : SRITI Al-Fattah                                │
│                                                         │
│  Bukti Bayaran:                                         │
│  ┌──────────────────────────────────────────┐           │
│  │  [📷 Ambil Gambar / Muat Naik Bukti]     │           │
│  │  (compress 900px/70% auto)               │           │
│  └──────────────────────────────────────────┘           │
│                                                         │
│  No. Rujukan (Opsional):                                │
│  [___________________________]                          │
│                                                         │
│  [ Hantar Bukti Bayaran ]                               │
│  ✅ → /parent/status  (pending verification)            │
```

---

```
PAGE: /parent/status
Role: Parent (selepas hantar bukti)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  ┌────────────────────────────────────────────┐         │
│  │         ⏳                                 │         │
│  │   Bayaran Anda Sedang Disemak              │         │
│  │                                            │         │
│  │   Pihak sekolah akan mengesahkan           │         │
│  │   dalam masa 1-2 hari bekerja.             │         │
│  │                                            │         │
│  │   [← Kembali ke Yuran]                     │         │
│  └────────────────────────────────────────────┘         │
```

---

```
PAGE: /parent/bayaran
Role: Parent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  Sejarah Bayaran                                        │
│                                                         │
│  ┌──────────────────────────────────────────────┐       │
│  │ 11 Mei 2026  Transfer  RM108  ✅ Disahkan    │       │
│  │ 10 Apr 2026  Transfer  RM108  ✅ Disahkan    │       │
│  │  5 Mac 2026  QR        RM108  ✅ Disahkan    │       │
│  │  8 Feb 2026  Transfer  RM108  ⏰ Pending     │       │
│  └──────────────────────────────────────────────┘       │
```

---

```
PAGE: /parent/resit
Role: Parent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  Resit Saya                                             │
│                                                         │
│  ┌──────────────────────────────────────────────┐       │
│  │ INV-007  Mac 2026  RM108  [🧾 Lihat Resit]   │       │
│  │ INV-006  Feb 2026  RM108  [🧾 Lihat Resit]   │       │
│  └──────────────────────────────────────────────┘       │
│                                                         │
│  → klik resit → /resit/[invoiceId] (public page)        │
```

---

```
PAGE: /parent/profil
Role: Parent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│  Profil Saya                                            │
│                                                         │
│  ┌────────────────────────────────────────────┐         │
│  │  [👤]  Puan Roslina bt Ahmad               │         │
│  │        puan.ros@gmail.com                  │         │
│  │        013-xxxxxxx                         │         │
│  │                                            │         │
│  │  Anak Dalam Sistem:                        │         │
│  │  • Amirah Sofea · 2 Amanah                 │         │
│  └────────────────────────────────────────────┘         │
│                                                         │
│  [🚪 Log Keluar]                                        │
```

---

## Page Summary

| Bahagian | Pages |
|---|---|
| Public | `/login`, `/auth/set-password`, `/resit/[id]` |
| Admin Dashboard | `/dashboard`, `/pelajar`, `/pelajar/[id]`, `/yuran`, `/yuran/invois/[id]`, `/yuran/resit/[id]`, `/tracker`, `/laporan`, `/tetapan` |
| Parent Portal | `/parent`, `/parent/yuran`, `/parent/bayar/[id]`, `/parent/status`, `/parent/bayaran`, `/parent/resit`, `/parent/profil` |
| Modals | TambahPelajar, NaikTahun, JanaInvois, JanaBulk, Verify |
