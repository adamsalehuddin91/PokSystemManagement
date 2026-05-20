# SwiftTaska — Panduan Lengkap untuk Pemilik Taska
**Demo URL**: https://taska.swiftapps.my
**Login Admin**: admin@swifttaska.com / password123
**Versi**: v1.1 | **Tarikh**: 2026-05-16

---

## CARA GUNA PANDUAN INI

Panduan ini dibahagi kepada **3 bahagian**:
1. **Admin & Cikgu** — sistem pengurusan dalaman taska
2. **Ibu Bapa (Parent PWA)** — app untuk ibu bapa pantau anak
3. **Landing Page** — halaman promosi untuk tarik klien baru

Tunjuk ikut urutan. Masa demo: **20–30 minit**.

---

# BAHAGIAN 1 — ADMIN & CIKGU

---

## 1. Halaman Login
**URL**: `/auth/signin`

**Apa ni:**
Pintu masuk sistem. Admin dan cikgu login menggunakan email dan password.

**Cara explain ke client:**
> *"Sistem ni selamat — setiap cikgu ada akaun sendiri. Kalau cikgu berhenti kerja, admin boleh buang akses dia terus. Tak ada sharing password."*

**Credentials demo:**
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@swifttaska.com | password123 |
| Cikgu | sarah.t@swifttaska.com | password123 |

---

## 2. Dashboard Utama
**URL**: `/dashboard`

**Apa ni:**
Papan pemuka utama — overview semua aktiviti taska dalam satu skrin.

**Elemen penting:**
- **4 Stat Cards** — Jumlah pelajar, Hadir hari ini, Update parent, Yuran tertunggak
- **Graf Kehadiran** — trend kehadiran minggu semasa
- **Tindakan Pantas** — shortcut ke fungsi yang kerap digunakan
- **Recent Activity Feed** — aktiviti terbaru dalam sistem

**Cara explain ke client:**
> *"Setiap pagi, buka sistem — semua maklumat penting dah ada kat sini. Berapa anak hadir, berapa yang belum bayar yuran, update apa yang cikgu dah hantar. Tak perlu buka fail Excel atau tanya orang lain."*

**Nilai kepada taska:**
✅ Jimat masa check maklumat setiap pagi
✅ Detect masalah awal — yuran tertunggak, kehadiran rendah

---

## 3. Pengurusan Pelajar
**URL**: `/dashboard/pelajar`

**Apa ni:**
Senarai semua kanak-kanak yang berdaftar dalam taska. Boleh cari, filter ikut kelas, dan lihat status setiap pelajar.

**Elemen penting:**
- Senarai pelajar dengan avatar, nama, kelas, umur
- Status badge — Aktif / Tidak Aktif
- Filter ikut kelas (Ceria / Pelangi / Matahari)
- Search bar — cari nama pelajar
- Klik baris → masuk profil lengkap pelajar

**Cara explain ke client:**
> *"Semua rekod pelajar dalam satu tempat. Nak cari Harif? Taip nama, terus jumpa. Tak perlu korek-korek fail lama."*

---

## 4. Profil Lengkap Pelajar
**URL**: `/dashboard/pelajar/[nama-pelajar]`

**Apa ni:**
Halaman detail untuk setiap pelajar — 3 tab maklumat penuh.

**3 Tab:**

### Tab 1 — Profil
- Foto pelajar, nama penuh, IC, tarikh lahir, jantina
- Kelas, tarikh daftar, status kesihatan
- Maklumat kecemasan

### Tab 2 — Penjaga
- Nama ibu bapa / penjaga, hubungan, nombor telefon
- Nombor kecemasan alternatif
- Senarai penjemput yang dibenarkan

### Tab 3 — Yuran
- Rekod bayaran bulanan — status, tarikh, kaedah bayaran
- Resit digital boleh dijana
- Alert jika ada bulan tertunggak

**Cara explain ke client:**
> *"Kalau ada emergency — accident atau anak demam — semua maklumat penjaga ada kat sini. Tak perlu cari fail kertas dah."*

**Nilai kepada taska:**
✅ Ganti fail kertas sepenuhnya
✅ Rekod tersusun, mudah cari masa audit JKM

---

## 5. Tambah Pelajar Baru
**URL**: `/dashboard/pelajar/tambah`

**Apa ni:**
Borang pendaftaran pelajar baru — 3 seksyen berstruktur.

**3 Seksyen:**
1. **Maklumat Peribadi** — nama, IC, tarikh lahir, jantina, kelas
2. **Maklumat Penjaga** — nama, hubungan, telefon, email
3. **Maklumat Tambahan** — status kesihatan, alahan, catatan khas

**Cara explain ke client:**
> *"Masa daftar pelajar baru, isikan borang ni sekali je. Lepas tu semua maklumat boleh dicapai bila-bila masa — tak perlu isi balik."*

---

## 6. Pengurusan Penjaga
**URL**: `/dashboard/penjaga`

**Apa ni:**
Senarai semua ibu bapa dan penjaga yang berdaftar — dengan status aktivasi portal parent mereka.

**Elemen penting:**
- Nama penjaga, nombor telefon, anak yang dijaga
- Status portal ibu bapa (Aktif / Belum Aktif)
- Butang hantar jemputan ke parent portal

**Cara explain ke client:**
> *"Dari sini admin boleh tengok ibu bapa mana yang dah aktifkan app parent, mana yang belum. Kalau ada yang tak aktif, hantar jemputan terus."*

---

## 7. Kehadiran + QR
**URL**: `/dashboard/kehadiran`

**Apa ni:**
Sistem kehadiran digital — ibu bapa scan QR masa hantar dan ambil anak.

**Elemen penting:**
- **QR Code** — cetak atau display kat pintu masuk taska
- **Table Kehadiran** — nama, check-in, check-out, penjemput, status
- **Status Badge** — Hadir ✅ / Belum Keluar 🟡 / Tidak Hadir ❌
- **Graf Bar** — trend kehadiran mingguan ikut kelas
- **Filter** — ikut tarikh, ikut kelas

**Cara explain ke client:**
> *"Ibu bapa scan QR masa hantar anak — sistem auto-rekod masa masuk. Masa ambil anak, scan balik — masa keluar direkod. Kalau ada orang lain nak ambil anak, sistem akan flag berbeza."*

**Nilai kepada taska:**
✅ Rekod kehadiran untuk audit JKM — auto-generated
✅ Tahu siapa ambil anak — lebih selamat
✅ Parents dapat notifikasi bila anak dah masuk/keluar

---

## 8. Parent Update (Kongsi Aktiviti)
**URL**: `/dashboard/parent-update`

**Apa ni:**
Platform untuk cikgu kongsi gambar, video dan catatan aktiviti anak kepada ibu bapa — dalam masa nyata.

**Elemen penting:**
- **Status Update Hari Ini** — panel indicator siapa dah dapat update, siapa belum ⭐ BARU
- **Feed Aktiviti** — semua update yang dah dihantar hari ini
- **Detail Panel** — klik update → lihat full caption, tags, media
- **Compose** — tulis caption, tag aktiviti, lampir gambar/video
- **Filter** — ikut kelas, ikut guru, ikut tarikh

**⭐ Indicator Dah/Belum Update:**
```
Muhammad Harif ✅   Nur Alia ✅   Arif Danial ⏳   Sara ⏳   Qaisara ⏳
2/5 dihantar
```
Cikgu nampak terus siapa dah update, siapa belum — elak tertinggal atau double-update.

**Cara explain ke client:**
> *"Cikgu boleh share gambar aktiviti anak terus — ibu bapa dapat tengok dalam app diaorang. Macam Instagram tapi private untuk taska. Dan ada indicator — cikgu tahu mana anak yang dah update, mana yang belum."*

**Nilai kepada taska:**
✅ Ibu bapa rasa lebih dekat dengan taska
✅ Kurang whatsapp personal dari ibu bapa tanya "anak buat apa hari ni?"
✅ Elak cikgu tertinggal update mana-mana anak

---

## 9. Rekod Harian
**URL**: `/dashboard/rekod-harian`

**Apa ni:**
Cikgu rekod aktiviti harian setiap anak — tidur, makan, minum, mood, kesihatan.

**Elemen penting:**
- **Progress Bar Hari Ini** — `Harif ✅ Alia ⭕ Qaisara ⭕ → 1/3 selesai` ⭐ BARU
- **Navigator Pelajar** — ← → tukar antara anak, indicator hijau kalau dah rekod
- **Rekod Tidur** — masa mula, masa bangun, tempoh auto-kira
- **Rekod Makan & Minum** — habis semua / separuh / sedikit / tidak makan
- **Mood Tracker** — Gembira / Aktif / Biasa / Mengantuk / Tidak Sihat
- **Status Kesihatan** — Sihat / Demam / Batuk / lain-lain
- **Catatan Tambahan** — nota free-text untuk ibu bapa

**⭐ Smart Indicator:**
Selepas simpan rekod untuk satu anak → sistem auto-jump ke anak seterusnya yang **belum direkod**. Cikgu tak perlu navigate manual.

**Cara explain ke client:**
> *"Dulu cikgu tulis dalam buku — lepas tu ibu bapa ambil anak, buku tu hilang ke mana. Sekarang semua dalam sistem. Ibu bapa boleh buka app diaorang tengok anak makan apa, tidur berapa lama hari ni."*

**Nilai kepada taska:**
✅ Ibu bapa bayar lebih untuk taska yang lebih transparent
✅ Rekod kesihatan anak tersimpan — berguna kalau ada isu perubatan
✅ Kurang keluhan ibu bapa — diaorang dah tau anak OK

---

## 10. Pengurusan Yuran
**URL**: `/dashboard/yuran`

**Apa ni:**
Sistem pengurusan yuran bulanan — rekod bayaran, jana resit, track tertunggak.

**Elemen penting:**
- **Stat Cards** — Jumlah dikutip, Tertunggak, Kadar kutipan bulan ini
- **Graf Pie** — breakdown status bayaran (Dibayar / Tertunggak / Sebahagian)
- **Table Yuran** — nama pelajar, kelas, bulan, jumlah, kaedah bayaran, status, resit
- **Alert Tertunggak** — senarai anak yang belum bayar dengan highlight merah
- **Filter** — ikut bulan, ikut kelas, ikut status

**Cara explain ke client:**
> *"Tak perlu lagi check buku rekod satu-satu untuk tahu siapa belum bayar. Sistem dah senaraikan — boleh terus WhatsApp ibu bapa yang tertunggak."*

---

## 11. Rekod Bayaran
**URL**: `/dashboard/yuran/rekod-bayaran`

**Apa ni:**
Borang untuk rekod bayaran yang diterima — pilih pelajar, masukkan butiran bayaran.

**Elemen penting:**
- Dropdown pilih pelajar
- Pilih bulan bayaran
- Masukkan jumlah, kaedah (tunai / online banking / DuitNow)
- Nota tambahan
- Jana resit digital selepas simpan

**Cara explain ke client:**
> *"Masa ibu bapa bayar tunai — admin rekod kat sini, resit digital terus dijana. Ibu bapa boleh screenshot atau simpan dalam email."*

---

## 12. Pengumuman
**URL**: `/dashboard/pengumuman`

**Apa ni:**
Sistem pengumuman rasmi taska kepada semua ibu bapa — cuti, event, notis penting.

**Elemen penting:**
- Senarai pengumuman dengan status (Aktif / Draf / Tamat)
- Detail panel — tajuk, kandungan, tarikh, sasaran (semua / kelas tertentu)
- Statistik — berapa ibu bapa dah baca
- Compose pengumuman baru

**Cara explain ke client:**
> *"Nak bagitau cuti sekolah? Nak announce event hari guru? Buat pengumuman kat sini — semua ibu bapa dapat terus dalam app diaorang. Tak perlu WhatsApp group yang bising."*

---

## 13. Tetapan
**URL**: `/dashboard/tetapan`

**Apa ni:**
Konfigurasi sistem taska — profil, kelas, pengguna, notifikasi, keselamatan.

**5 Seksyen:**
1. **Profil Taska** — nama, logo, alamat, telefon
2. **Pengurusan Kelas** — tambah/edit kelas, kapasiti, guru assigned
3. **Akaun Pengguna** — tambah admin / cikgu, set permission
4. **Notifikasi** — on/off untuk setiap jenis notifikasi
5. **Keselamatan** — tukar password, log aktiviti

---

# BAHAGIAN 2 — PARENT PWA (APP IBU BAPA)

**Cara akses:** Ibu bapa buka browser telefon → masukkan URL taska → login
**Tiada download** — terus guna dari browser. Boleh "Add to Home Screen" untuk rasa macam app.

---

## 14. Parent Home
**URL**: `/parent`

**Apa ni:**
Halaman utama ibu bapa — ringkasan info anak untuk hari ini.

**Elemen penting:**
- Kad profil anak — nama, kelas, umur
- Kehadiran hari ini — Hadir / Tidak Hadir / status
- Update terbaru dari cikgu
- Yuran semasa — status bayaran bulan ini
- Bottom navigation — 5 tab (Home / Kehadiran / Aktiviti / Yuran / Profil)

**Cara explain ke client:**
> *"Ibu bapa buka app — terus nampak anak dah sampai ke belum, ada update dari cikgu ke tak, yuran dah bayar ke belum. Semua dalam satu skrin."*

---

## 15. Kehadiran (Parent View)
**URL**: `/parent/kehadiran`

**Apa ni:**
Ibu bapa boleh tengok rekod kehadiran anak ikut bulan — calendar view.

**Elemen penting:**
- Calendar bulanan — hijau (hadir) / merah (tidak hadir) / kosong (cuti)
- Statistik bulan — peratus kehadiran, bilangan hadir/tidak hadir
- Log harian — masa check-in, masa check-out, siapa yang ambil

**Cara explain ke client:**
> *"Ibu bapa boleh tengok — bulan Januari anak dia hadir berapa hari. Kalau ada isu, diaorang boleh tanya cikgu berdasarkan rekod ni."*

---

## 16. Aktiviti Harian (Parent View)
**URL**: `/parent/aktiviti`

**Apa ni:**
Ibu bapa tengok rekod harian anak — apa yang cikgu rekod untuk hari tu.

**Elemen penting:**
- Pilih tarikh — tengok rekod mana-mana hari
- Rekod makan — apa yang dimakan, habis/separuh
- Rekod tidur — berapa lama tidur siang
- Mood tracker — gembira / aktif / biasa / mengantuk
- Feed aktiviti — gambar dan catatan dari cikgu
- Rekod kesihatan — status hari tu

**Cara explain ke client:**
> *"Ibu bapa boleh tengok anak makan apa hari ni, tidur berapa lama, mood dia macam mana. Tak perlu tanya cikgu soal-soal basic — semua dah ada dalam app."*

---

## 17. Yuran (Parent View)
**URL**: `/parent/yuran`

**Apa ni:**
Ibu bapa tengok status yuran dan rekod bayaran anak mereka.

**Elemen penting:**
- Alert merah — kalau ada bulan tertunggak
- Tab filter — Semua / Dibayar / Tertunggak
- Rekod bayaran bulanan — tarikh, jumlah, kaedah, status
- Download resit — boleh simpan atau print

**Cara explain ke client:**
> *"Ibu bapa tak perlu tanya admin 'dah bayar ke belum' — diaorang boleh check sendiri. Jimat masa semua pihak."*

---

## 18. Profil (Parent View)
**URL**: `/parent/profil`

**Apa ni:**
Maklumat profil ibu bapa dan anak — pakej semasa, butiran akaun.

**Elemen penting:**
- Kad profil ibu bapa — nama, telefon, email
- Profil anak — nama, kelas, tarikh lahir
- Pakej semasa — nama pakej, harga bulanan
- Butang logout

---

# BAHAGIAN 3 — LANDING PAGE (PROMOSI)

**URL**: `https://taska.swiftapps.my`

**Apa ni:**
Halaman utama yang dilihat oleh bakal klien taska sebelum daftar.

**Elemen penting:**
- Hero section dengan tagline dalam BM
- 6 feature highlights
- **3 Pakej Harga** dengan setup fee + monthly fee
- Cara bayaran 3-fasa (50% → 30% → 20%)
- WhatsApp CTA button untuk hubungi terus

---

# RINGKASAN NILAI SWIFTTASKA

| Masalah Lama | Penyelesaian SwiftTaska |
|-------------|------------------------|
| Buku kehadiran kertas | Scan QR — rekod auto |
| Rekod pelajar dalam fail | Profil digital lengkap |
| Yuran tulis tangan | Sistem yuran + resit digital |
| WhatsApp update manual | Parent update + aktiviti harian |
| Ibu bapa tak tahu anak buat apa | Parent PWA — tengok real-time |
| Cikgu takut tertinggal update | Indicator dah/belum per anak |
| Pengumuman WhatsApp group | Sistem pengumuman rasmi |

---

# PAKEJ & HARGA

| Pakej | Setup | Monthly | Sesuai Untuk |
|-------|-------|---------|--------------|
| Basic | RM 3,000 | RM 200/bln | Taska kecil ≤30 pelajar |
| Standard | RM 5,000 | RM 300/bln | Taska aktif ≤80 pelajar |
| Premium | RM 8,000 | RM 450/bln | Multi-kelas, operasi penuh |

**Cara Bayaran Setup:**
- 50% deposit sebelum kerja mula
- 30% selepas demo diluluskan
- 20% selepas go-live

*Premium: boleh bayar setup dalam 3 ansuran (RM2,700 → RM2,700 → RM2,600)*

---

# URUTAN DEMO YANG DISYORKAN (25 minit)

| # | Page | Masa | Hook |
|---|------|------|------|
| 1 | Dashboard | 2 min | "Semua info penting dalam satu skrin" |
| 2 | Kehadiran + QR | 3 min | "Scan je, rekod terus — ganti buku kehadiran" |
| 3 | Rekod Harian | 3 min | "Cikgu rekod per anak, ada indicator dah/belum" |
| 4 | Parent Update | 2 min | "Share gambar aktiviti ke ibu bapa" |
| 5 | Yuran | 2 min | "Tahu siapa tertunggak dalam satu pandangan" |
| 6 | Profil Pelajar | 2 min | "Semua rekod anak dalam satu tempat" |
| 7 | Parent PWA | 5 min | "Ini yang ibu bapa nampak dari telefon" |
| 8 | Landing Page | 2 min | "Ini page promosi untuk tarik pelajar baru" |
| 9 | Pricing + Close | 4 min | "Pakej mana yang sesuai untuk taska anda?" |

---

*SwiftTaska by SwiftApps · taska.swiftapps.my · adamsalehuddin91@gmail.com*
