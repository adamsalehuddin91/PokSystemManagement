# SwiftTaska — ASCII Wireframe
**System**: Taska Management System
**Version**: v1.0
**Date**: 2026-05-11
**Roles**: Admin (Desktop) · Parent PWA (Mobile)

---

```
╔══════════════════════════════════════════════════════════════════════╗
║  SWIFTTASKA — ASCII WIREFRAME                                        ║
║  System: Taska Management System                                     ║
║  Roles: Admin (Desktop) · Parent PWA (Mobile)                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## PAGE 1: `/login` — Admin Login
```
Role: Guest (Public)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌──────────────────────────────────────────────────────┐
│                                                      │
│              [SwiftApps Logo]                        │
│           SwiftApps Taska Management                 │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │         Log Masuk ke Portal Admin              │  │
│  │                                                │  │
│  │  E-mel                                         │  │
│  │  [_______________________________________]     │  │
│  │                                                │  │
│  │  Kata Laluan                                   │  │
│  │  [_______________________________________]     │  │
│  │                                      [Lupa?]  │  │
│  │                                                │  │
│  │  [          Log Masuk          ]               │  │
│  │                                                │  │
│  │  ──────────── atau ────────────                │  │
│  │                                                │  │
│  │  [    Log Masuk dengan Google    ]             │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│           (Taska Standard Package v1.0.0)            │
└──────────────────────────────────────────────────────┘
```

---

## SHARED LAYOUT: Admin Dashboard Shell
```
Role: Admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌──────────────┬──────────────────────────────────────────┐
│ [SwiftApps]  │ [🔍 Cari pelajar, guru, kelas...]  [🔔]  │
│ Taska Mgmt   │                         [👤 Admin Taska] │
├──────────────┼──────────────────────────────────────────┤
│ Dashboard    │                                          │
│ Pelajar      │   << PAGE CONTENT >>                     │
│ Penjaga      │                                          │
│ Kehadiran    │                                          │
│ Parent Update│                                          │
│ Rekod Harian │                                          │
│ Yuran & Resit│                                          │
│ Pengumuman   │                                          │
│ Tetapan      │                                          │
│              │                                          │
│  ┌──────────┐│                                          │
│  │ Taska    ││                                          │
│  │ Standard ││                                          │
│  │ Pkg v1.0 ││                                          │
│  │[Naik Taraf│                                          │
│  └──────────┘│                                          │
│  [Hubungi   ]│                                          │
└──────────────┴──────────────────────────────────────────┘
```

---

## PAGE 2: `/dashboard` — Dashboard Utama
```
Role: Admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  (Dashboard) · Ringkasan operasi taska hari ini

  ┌──────────────┐ ┌──────────────┐ ┌─────────────┐ ┌──────────────┐
  │ 👥 42        │ │ ✅ 34        │ │ 💬 18       │ │ 💳 RM14,560  │
  │ Jumlah       │ │ Hadir        │ │ Parent      │ │ Yuran &      │
  │ Pelajar      │ │ Hari Ini     │ │ Update      │ │ Resit        │
  │              │ │ [====80%===] │ │ Hari Ini    │ │ Bulan Ini    │
  └──────────────┘ └──────────────┘ └─────────────┘ └──────────────┘

  ┌────────────────────────────────────────────────────────────┐
  │ Tindakan Pantas                                            │
  │ [+ Tambah Pelajar] [✓ Rekod Kehadiran] [Buat Update] [🧾] │
  └────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────┐ ┌─────────────────────────┐
  │ Ringkasan Kehadiran Mingguan     │ │ Parent Update Terkini   │
  │ [Minggu ini ▾]                   │ │ ─────────────────────── │
  │  ▲                               │ │ [N] Nur Alia    10:30AM │
  │  │  ██                    ██     │ │ [M] M. Harif    10:15AM │
  │  │  ██  ██            ██  ██     │ │ [Q] Qaisara     09:50AM │
  │  │  ██  ██  ██  ██    ██  ██     │ │ [A] Arif        09:30AM │
  │  └──Isn──Sel──Rab──Kha──Jum──   │ │ [S] Sara        09:10AM │
  │  79.4% ↑ 2.6% vs minggu lalu    │ │              [Lihat Semua│
  ├──────────────────────────────────┤ ├─────────────────────────┤
  │ Status Hari Ini                  │ │ Pengumuman Terkini      │
  │ ┌──────────┐┌─────────┐┌───────┐│ │ ─────────────────────── │
  │ │  🟢 32   ││  🔴 4   ││ 🔵 6 ││ │ │[Jadual] Cuti Wesak     │
  │ │  Hadir   ││ T.Hadir ││ Trial ││ │ │         25 Mei 2024    │
  │ │  76%     ││   7%    ││  17%  ││ │ │[Aktivi] Pem. Kesihatan │
  │ └──────────┘└─────────┘└───────┘│ │         28 Mei 2024    │
  │                  [Lihat Semua →]│ │[Yuran]  Peringatan Jun  │
  └──────────────────────────────────┘ └─────────────────────────┘
```

---

## PAGE 3: `/dashboard/pelajar` — Senarai Pelajar
```
Role: Admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  (Pelajar) · Urus rekod dan profil pelajar
                                    [↑ Import Data] [+ Tambah Pelajar]

  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │  42      │ │  36      │ │   4      │ │   2      │
  │ Jumlah   │ │ Aktif    │ │ Trial    │ │ Alumni   │
  └──────────┘ └──────────┘ └──────────┘ └──────────┘

  ┌─────────────────────────────────────┐ ┌───────────────────────┐
  │ ┌──────────────────────┐[Kelas ▾]  │ │ PERLU TINDAKAN        │
  │ │🔍 Cari nama pelajar  │[Status ▾] │ │ ────────────────────  │
  │ └──────────────────────┘           │ │ Profil x lengkap  [3] │
  ├─────────────────────────────────────┤ │ Tiada penjaga     [2] │
  │ NAMA  KELAS  DOB  PENJAGA  % STATUS│ │ Bayaran tunggak   [5] │
  │ ──────────────────────────────────  │ ├───────────────────────┤
  │ [N] Nur Alia   Ceria  12 Jan  95%   │ │ PEMAKLUMAN            │
  │     (🟢 Aktif)                   ⋯ │ │ ────────────────────  │
  │ [M] M.Harif    Pelang 3 Mac   88%   │ │ [Naik taraf Premium] │
  │     (🟢 Aktif)                   ⋯ │ │ [Eksport ke Excel]   │
  │ [Q] Qaisara    Matar  28 Jul  100%  │ └───────────────────────┘
  │     (🟢 Aktif)                   ⋯ │
  │ [A] Arif D.    Ceria  15 Okt  72%   │
  │     (🟢 Aktif)                   ⋯ │
  │ [A] Aisyah     Ceria  20 Apr  60%   │
  │     (🟠 Trial)                   ⋯ │
  ├─────────────────────────────────────┤
  │ Menunjukkan 10 drpd 42  [<] [1] [2] [>] │
  └─────────────────────────────────────┘
```

---

## PAGE 4: `/dashboard/pelajar/tambah` — Tambah Pelajar
```
Role: Admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [←] Tambah Pelajar · Lengkapkan maklumat pelajar baharu
                                          [Batal] [👤 Simpan Pelajar]

  ┌──────────────────────────────────────────────────────┐
  │ ① Maklumat Pelajar                                   │
  │   Maklumat peribadi dan akademik pelajar             │
  │ ──────────────────────────────────────────────────── │
  │  Nama Penuh *          Jantina *                     │
  │  [_____________________]  (○) Lelaki  (○) Perempuan  │
  │                                                      │
  │  Tarikh Lahir *        No. Kad Pengenalan / MyKid    │
  │  [📅_______________]   [_________________________]   │
  │                                                      │
  │  Kelas *               Status Pelajar                │
  │  [Pilih kelas... ▾]    [Aktif ▾]                     │
  │                                                      │
  │  Alahan / Nota Perubatan                             │
  │  [________________________________________________]  │
  │  [________________________________________________]  │
  │                                                      │
  │  Foto Pelajar          Dokumen Sokongan              │
  │  ┌─────────────────┐   ┌─────────────────┐          │
  │  │  ↑ Muat Naik   │   │  ↑ Muat Naik   │          │
  │  │  JPG, PNG 2MB   │   │  PDF, JPG 5MB   │          │
  │  └─────────────────┘   └─────────────────┘          │
  └──────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────┐
  │ ② Maklumat Penjaga Utama                             │
  │   Ibu bapa atau penjaga utama pelajar                │
  │ ──────────────────────────────────────────────────── │
  │  Nama *                Hubungan *                    │
  │  [_____________________]  [Ibu ▾]                    │
  │                                                      │
  │  No. Telefon *         E-mel                         │
  │  [_____________________]  [___________________]      │
  │                                                      │
  │  Alamat                                              │
  │  [__________________________________________________] │
  └──────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────┐
  │ ③ Penjaga Kedua / Kecemasan          (Opsional)      │
  │ ──────────────────────────────────────────────────── │
  │  Nama                  No. Telefon                   │
  │  [_____________________]  [___________________]      │
  └──────────────────────────────────────────────────────┘
```

---

## PAGE 5: `/dashboard/penjaga` — Senarai Penjaga
```
Role: Admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  (Penjaga) · Urus rekod ibu bapa dan penjaga pelajar
                                              [+ Tambah Penjaga]

  ┌────────────────┐ ┌────────────────┐ ┌──────────────┐ ┌──────────────┐
  │ 128            │ │ 112            │ │ 164          │ │ 16           │
  │ Jumlah Penjaga │ │ Penjaga Aktif  │ │ Bil Penjaga  │ │ Perlu        │
  │                │ │                │ │ Dikaitkan    │ │ Makluman     │
  └────────────────┘ └────────────────┘ └──────────────┘ └──────────────┘

  ┌──────────────────────────────────────────────────────────────────┐
  │ [🔍 Cari nama penjaga...]  [Status ▾]  [Hubungan ▾]  [Kelas ▾]  │
  ├──────────────────────────────────────────────────────────────────┤
  │  NAMA          HUBUNGAN  TELEFON        E-MEL    ANAK  STATUS    │
  │ ──────────────────────────────────────────────────────────────── │
  │  [H] Pn. Hafizah  Ibu   013-456 7890   ✉ gmail   2  (🟢 Aktif) ⋯│
  │  [A] En. Azri     Bapa  012-345 6789   ✉ yahoo   1  (🟢 Aktif) ⋯│
  │  [F] Pn. Faridah  Ibu   011-234 5678   ✉ email   2  (🟢 Aktif) ⋯│
  │  [S] En. Shahril  Bapa  019-876 5432   ✉ gmail   1  (🟢 Aktif) ⋯│
  │  [K] Pn. Kamaliah Ibu   017-654 3210   ✉ email   1  (🟢 Aktif) ⋯│
  │  [A] Pn. Amira    Ibu   015-210 9876   ✉ gmail   1  (🔵 Penjaga)⋯│
  ├──────────────────────────────────────────────────────────────────┤
  │ Menunjukkan 10 drpd 128              Halaman 1 daripada 13       │
  └──────────────────────────────────────────────────────────────────┘
```

---

## PAGE 6: `/dashboard/kehadiran` — Rekod Kehadiran
```
Role: Admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  (Kehadiran) · Rekod masuk dan keluar pelajar
                     [📅 2024-05-21] [Kelas ▾] [📷 Sembunyikan QR]

  ┌──────────────────────────┐ ┌──────────────────────────────────┐
  │ Imbas Kod QR Check-In    │ │ Ringkasan Kehadiran Mingguan     │
  │                          │ │ (21-25 Mei 2024) (Semua Kelas)   │
  │   ┌──────────────────┐   │ │  ▲                               │
  │   │                  │   │ │  │  ██          ██               │
  │   │    [QR CODE]     │   │ │  │  ██  ██  ██  ██  ██           │
  │   │    (180x180)     │   │ │  │  ██  ██  ██  ██  ██  (hadir)  │
  │   └──────────────────┘   │ │  │  ░░  ░░  ░░      ░░  (absent)│
  │  Tunjuk kod ini kepada   │ │  └──Isn──Sel──Rab──Kha──Jum──   │
  │  penjaga utk check-in    │ └──────────────────────────────────┘
  │  [Jana QR Baharu] [Cetak]│
  └──────────────────────────┘

  ┌──────────────────────────────────────────────────────────────────┐
  │ Senarai Kehadiran Terkini                                        │
  │ [🔍 Cari pelajar...]   ✅ Hadir:34  ❌ Tidak:4  ⏳ Blm Keluar:4 │
  ├──────────────────────────────────────────────────────────────────┤
  │  NAMA PELAJAR  KELAS   CHECK-IN  CHECK-OUT  PENJEMPUT  STATUS   │
  │ ──────────────────────────────────────────────────────────────── │
  │  [N] Nur Alia  Ceria   08:12AM   05:30PM    Pn.Hafizah (🟢 Hadir│
  │  [M] M.Harif   Pelang  07:55AM   05:15PM    En.Azri    (🟢 Hadir│
  │  [Q] Qaisara   Matar   08:30AM   -          -          (🟠 Blm K│
  │  [A] Arif D.   Ceria   -         -          -          (🔴 T.Had│
  │  [S] Sara      Pelang  08:05AM   04:50PM    Pn.Kamal   (🟢 Hadir│
  │  [D] Danish    Matar   08:20AM   -          -          (🟠 Blm K│
  ├──────────────────────────────────────────────────────────────────┤
  │ TINDAKAN: [Edit] per row                                         │
  └──────────────────────────────────────────────────────────────────┘
```

---

## PAGE 7: `/dashboard/parent-update` — Parent Update
```
Role: Admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  (Parent Update) · Kongsi aktiviti pelajar dengan ibu bapa
                                             [+ Buat Update Baru]

  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ ┌──────────┐
  │ 📋 18   │ │ 💬 6    │ │ 👥 42           │ │ 🖼️ 86  │
  │ Update  │ │ Mesej   │ │ Dikongsi        │ │ Media   │
  │ Hari Ini│ │ Sandbox │ │ Dengan Waris    │ │ Fail    │
  └──────────┘ └──────────┘ └──────────────────┘ └──────────┘

  [🔍 Cari pelajar...]  [Kelas ▾]  [📅 Tarikh]  [Guru ▾]

  ┌─────────────────────────┐ ┌──────────────────────────────────────┐
  │ SENARAI UPDATE TERKINI  │ │ PERINCIAN UPDATE                     │
  │ ─────────────────────── │ │ ──────────────────────── [Edit][Hantar│
  │ [A] Aiyah H.  10:30 AM ►│ │                                      │
  │    #Aktiviti #Seni&Kraf  │ │  [N] Nur Alia  · Kelas Ceria        │
  │ [M] M.Harif   10:15 AM  │ │       10:30 AM  (🟢 Dikongsikan)     │
  │    #Makan                │ │                                      │
  │ [N] Nur Alia  09:50 AM  │ │  ┌─────────────────────────────────┐ │
  │    #Tidur                │ │  │      [ Foto Aktiviti ]          │ │
  │ [A] Arif D.   09:30 AM  │ │  │         📷                      │ │
  │    #Aktiviti             │ │  └─────────────────────────────────┘ │
  │ [S] Sara S.   09:10 AM  │ │                                      │
  │    #Senaman              │ │  "Alia sangat seronok hari ini!..."  │
  │         [Lihat Lebih →] │ │  [#Aktiviti] [#Seni & Kraf]          │
  └─────────────────────────┘ ├──────────────────────────────────────┤
                              │ TULIS UPDATE BAHARU                  │
                              │ [Pilih Pelajar ▾] [Pilih Tag ▾]      │
                              │ [________________________________________│
                              │ ________________________________________│
                              │ ________]                            │
                              │ [🖼️ Foto] [🎥 Video] [😊 Emoji] [Hantar]│
                              └──────────────────────────────────────┘
```

---

## PAGE 8: `/dashboard/rekod-harian` — Rekod Harian Anak
```
Role: Admin / Guru
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  (Rekod Harian Anak) · Catat aktiviti, tidur, makan & kesihatan
                                       [21 Mac 2024 (Selasa)] [Simpan]

  ┌──────────────────────────────────────────────────────┐
  │ [←]  [M] Muhammad Harif bin Azri                [→] │
  │       Kelas Pelangi · 4 Tahun           (1 / 3)     │
  └──────────────────────────────────────────────────────┘

  ┌────────────────────────────┐ ┌────────────────────────────┐
  │ 😴 Tidur / Rehat    [ON ●] │ │ 🍽️ Makan & Minum           │
  │ ─────────────────────────  │ │ ──────────────────────────  │
  │  Mula     Bangun  Tempoh   │ │  Sarapan / Makan Tengah:   │
  │  [13:30] [15:10] [1j40min] │ │  [Habis Semua] [Separuh]   │
  │                            │ │  [Sedikit]     [Tdk Makan] │
  │                            │ │                             │
  │                            │ │  Minum Air:                 │
  │                            │ │  [Baik 3+] [Sederhana][Kurang]
  │                            │ │                             │
  │                            │ │  Susu / Lumpkin:           │
  │                            │ │  [-]  2 kali  [+]          │
  └────────────────────────────┘ └────────────────────────────┘

  ┌────────────────────────────┐ ┌────────────────────────────┐
  │ 😊 Mood Hari Ini           │ │ 🏥 Status Kesihatan        │
  │ ─────────────────────────  │ │ ──────────────────────────  │
  │  ┌─────┐┌─────┐┌──────┐   │ │ [Sihat] [Demam] [Batuk]    │
  │  │😄   ││⚡   ││ 😐   │   │ │ [Selsema] [Tidak Hadir]    │
  │  │Gemb ││Aktif││Biasa │   │ │                             │
  │  └─────┘└─────┘└──────┘   │ │  Suhu Badan (°C)           │
  │  ┌─────┐┌──────────────┐   │ │  [36.5_________]           │
  │  │😴   ││ 🤒           │   │ │                             │
  │  │Meng ││ Tidak Sihat  │   │ │                             │
  │  └─────┘└──────────────┘   │ │                             │
  └────────────────────────────┘ └────────────────────────────┘

  ┌──────────────────────────────────────────────────────┐
  │ 📝 Catatan Guru & Media Hari Ini                     │
  │ ──────────────────────────────────────────────────── │
  │  ┌──────────────────────────┐  ┌────────────────────┐│
  │  │ Tulis catatan mengenai   │  │ ┌──────┐ ┌──────┐  ││
  │  │ aktiviti, tingkah laku,  │  │ │+ Foto│ │+ Foto│  ││
  │  │ atau perkembangan...     │  │ └──────┘ └──────┘  ││
  │  │                          │  │ ┌──────┐ ┌──────┐  ││
  │  │                          │  │ │+ Foto│ │+ Foto│  ││
  │  └──────────────────────────┘  │ └──────┘ └──────┘  ││
  │                                └────────────────────┘│
  └──────────────────────────────────────────────────────┘

                    [Batal] [💾 Simpan Draf] [📤 Simpan Rekod]
```

---

## PAGE 9: `/dashboard/yuran` — Yuran & Resit
```
Role: Admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  (Yuran & Resit) · Pengurusan yuran pelajar dan resit pembayaran
                                        [↓ Eksport] [+ Cipta Bil]

  ┌────────────────┐ ┌────────────────┐ ┌──────────────┐ ┌──────────────┐
  │ 🧾 RM 18,745  │ │ ⚠️ RM 5,660   │ │ ✅ 48        │ │ 🖨️ 48       │
  │ Jumlah Kutipan│ │ Tertunggak     │ │ Bil Dibayar  │ │ Resit Dicetak│
  │ Bulan Ini     │ │ 16 pelajar     │ │ drpd 64      │ │ bulan ini    │
  └────────────────┘ └────────────────┘ └──────────────┘ └──────────────┘

  ┌────────────────────────────────────────────┐ ┌──────────────────────┐
  │ [🔍 Cari] [Kelas ▾] [Bulan ▾] [Status ▾]  │ │ RINGKASAN BAYARAN    │
  ├────────────────────────────────────────────┤ │ ─────────────────── │
  │ NAMA     KELAS  BULAN   RM    TGL  KAEDAH  │ │   [Pie Chart]        │
  │ ────────────────────────────────────────── │ │  🟢 Dibayar: 48     │
  │ Nur Alia Ceria  Mei'24  350  1Mei OB       │ │  🔴 Tunggak: 16     │
  │          (🟢 Dibayar)             [Resit]  │ │  ⚪ Belum: 26       │
  │ M.Harif  Pelang Mei'24  350  2Mei DuitNow  │ ├─────────────────────┤
  │          (🟢 Dibayar)             [Resit]  │ │ PER KELAS           │
  │ Arif D.  Ceria  Mei'24  350  -    -        │ │ Ceria    RM4,900 70%│
  │          (🔴 Tertunggak)        [Peringat] │ │ [===70%=======]     │
  │ Danish   Matar  Mei'24  350  -    -        │ │ Pelangi  RM7,350 84%│
  │          (🔴 Tertunggak)        [Peringat] │ │ [=====84%=======]   │
  │ Sara S.  Pelang Mei'24  350  5Mei OB       │ │ Matahari RM6,494 92%│
  │          (🟢 Dibayar)             [Resit]  │ │ [======92%========] │
  ├────────────────────────────────────────────┤ ├─────────────────────┤
  │ 10 drpd 64 rekod       Halaman 1 drpd 7   │ │ TINDAKAN PERLU      │
  └────────────────────────────────────────────┘ │ [A] Arif - RM350    │
                                                  │ [D] Danish - RM350  │
                                                  │ [R] Rayyan - RM350  │
                                                  │  [Hantar Semua Pering│
                                                  └──────────────────────┘
```

---

## PAGE 10: `/dashboard/pengumuman` — Pengumuman
```
Role: Admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  (Pengumuman) · Urus dan hantar makluman kepada ibu bapa
                                  [📋 Copy Pengumuman] [+ Jadikan]

  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │  3       │ │  5       │ │  48      │ │  12      │
  │ Pengumuman│ │ Dijadual │ │ Sudah Baca│ │ Belum Baca│
  └──────────┘ └──────────┘ └──────────┘ └──────────┘

  ┌──────────────────────────────────────┐ ┌──────────────────────┐
  │ [Semua] [Jadual] [Aktiviti] [Yuran]  │ │ CUTI UMUM HARI INI   │
  │                          [Jenis ▾]  │ │ ─────────────────── │
  │ ─────────────────────────────────── │ │ ┌──────────────────┐ │
  │ 📅 Cuti Umum Hari Wesak      22Mei  │ │ │ Hari Wesak       │ │
  │    25 Mei 2024 (Sabtu)               │ │ │ 25 Mei 2024 Sabtu│ │
  │    ✓42 dibaca  ⏳2 belum            │ │ └──────────────────┘ │
  │                                      │ ├─────────────────────┤
  │ 🟢 Program Pemeriksaan Kesihatan     │ │ STATISTIK           │
  │    28 Mei 2024 (Selasa)       22Mei  │ │ ─────────────────── │
  │    ✓38 dibaca  ⏳6 belum            │ │  ██ ██    ██  ██    │
  │                                      │ │  ██ ██ ██ ██  ██    │
  │ 🔵 Reminder Hadir 5 Hari      21Mei  │ │  Isn Sel Rab Kha Jum│
  │    23 Mei 2024 (Khamis)              │ │ 125 terhantar       │
  │    ✓35 dibaca  ⏳9 belum            │ │  98 dibaca  27 blm  │
  │                                      │ ├─────────────────────┤
  │ 📚 Peringatan Bayaran Yuran Jun      │ │ TEMPLAT PANTAS      │
  │    30 Mei 2024 (Khamis)       20Mei  │ │ ─────────────────── │
  │    ✓29 dibaca  ⏳15 belum           │ │ [Cuti Umum       →] │
  ├──────────────────────────────────────┤ │ [Peringatan Yuran→] │
  │ ┌─────────────────────────────────┐  │ │ [Program Aktiviti→] │
  │ │ (Cuti)  Cuti Umum Hari Wesak    │  │ │ [Notis Kecemasan →] │
  │ │ 25 Mei 2024 (Sabtu) · 22Mei     │  │ └─────────────────────┘
  │ │ Taska akan ditutup sempena...   │  │
  │ │ ✓42 dibaca  ⏳2 belum          │  │
  │ │ [Edit]   [Hantar Semula]        │  │
  │ └─────────────────────────────────┘  │
  └──────────────────────────────────────┘
```

---

## PAGE 11: `/parent` — Portal Penjaga (Mobile PWA)
```
Role: Parent (Mobile)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌────────────────────────────────────┐
│ [S] SwiftApps [Taska Standard]     │
│                    [👤 Pn.Aisyah▾] │
├────────────────────────────────────┤
│                                    │
│  ┌──────────────────────────────┐  │
│  │  [N]  Nur Alia               │  │
│  │       Kelas Ceria · 4 Tahun  │  │
│  │  ✅ Hadir · 21 Mei 2024      │  │
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────┐┌──────────┐┌───────┐ │
│  │ 💬 18   ││ 🍽️ Baik  ││ 😴 28 │ │
│  │ Parent  ││ Makan 3x ││ min   │ │
│  │ Update  ││          ││ Tidur │ │
│  └──────────┘└──────────┘└───────┘ │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ Yuran Terkini       [Semua→] │  │
│  │ RM 14,560.00                 │  │
│  │ ✓ 18.5% dibayar             │  │
│  │ [==================18%]      │  │
│  │ [   Lihat Butiran Yuran    ] │  │
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ Kehadiran Bulan Ini  17/21   │  │
│  │ 🟢🟢🟢🟢🟢🟢🟢              │  │
│  │ 🟢🟢🟢🟢🟢🟢🟢              │  │
│  │ 🟢🟢🔴⬜⬜⬜⬜              │  │
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ Parent Update Hari Ini [Semua│  │
│  │ ──────────────────────────── │  │
│  │ ┌────────────────────────┐   │  │
│  │ │   [ Foto Aktiviti ]    │   │  │
│  │ └────────────────────────┘   │  │
│  │ Aktiviti Seni & Kraf 10:30AM │  │
│  │ "Alia sangat seronok hari..."│  │
│  │ [#Aktiviti] [#Seni & Kraf]   │  │
│  │ ──────────────────────────── │  │
│  │ Waktu Makan 12:45PM          │  │
│  │ "Alia makan dengan baik..."  │  │
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ Pengumuman          [Semua→] │  │
│  │ [Cuti] Cuti Wesak    25Mei > │  │
│  │ [Aktv] Pem.Kesihatan 28Mei > │  │
│  └──────────────────────────────┘  │
│                                    │
├────────────────────────────────────┤
│ [🏠 Utama][✅Kehadiran][💬Aktiviti]│
│          [🧾 Yuran][👤 Profil]     │
└────────────────────────────────────┘
```

---

## USER FLOW — Navigasi Keseluruhan
```
┌───────────────────────────────────────────────────────────────┐
│  SWIFTTASKA USER FLOW                                         │
│  Entry Points: Admin (Desktop) · Penjaga (Mobile PWA)        │
└───────────────────────────────────────────────────────────────┘

                    ┌───────────────┐
                    │   /login      │  ◄── Guest entry
                    └──────┬────────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
      [Admin credentials]       [Penjaga credentials]
              │                         │
              ▼                         ▼
  ┌────────────────────┐    ┌────────────────────┐
  │  /dashboard        │    │  /parent           │
  │  (Admin Portal)    │    │  (Mobile PWA)      │
  └─────────┬──────────┘    └─────────┬──────────┘
            │                         │
    ┌───────┴──────────────────┐       └──────┬─────────────┐
    ▼        ▼        ▼        ▼              ▼             ▼
┌────────┐┌──────┐┌────────┐┌──────┐  ┌───────────┐ ┌────────────┐
│/pelajar││/penj-││/kehad- ││/yuran│  │/kehadiran │ │ /aktiviti  │
│        ││aja   ││iran    ││      │  │ (lihat)   │ │ (updates)  │
└───┬────┘└──────┘└────────┘└──────┘  └───────────┘ └────────────┘
    │
    ▼
┌──────────────┐
│/pelajar/tambah│  ◄── [+ Tambah Pelajar]
└──────────────┘

    ▼        ▼
┌────────┐┌──────────┐
│/parent-││/rekod-   │
│update  ││harian    │
└────────┘└──────────┘

    ▼
┌──────────────┐
│/pengumuman   │
└──────────────┘

    ▼
┌──────────────┐
│/tetapan      │
└──────────────┘
```

---

*Generated by Tokwi · SwiftApps OS Ecosystem*
*Pages: 11 screens (10 Admin + 1 Parent PWA) + 1 User Flow diagram*
