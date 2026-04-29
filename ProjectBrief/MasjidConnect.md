# 🕌 MasjidConnect
**Sistem Pengurusan Masjid Digital (React + AdminLTE Version)**

---

## 1️⃣ Ringkasan Projek
**MasjidConnect** ialah aplikasi web moden yang dibangunkan menggunakan **React + AdminLTE Dashboard** dengan backend **Supabase**.  
Tujuannya adalah untuk memodenkan pengurusan masjid — termasuk data ahli kariah, kutipan derma, aktiviti komuniti, laporan kewangan, serta khairat kematian dan data akhirat — agar urusan masjid lebih **telus, efisien dan bersepadu**.

---

## 2️⃣ Objektif Projek
- **Memusatkan pengurusan data masjid** (ahli, derma, aktiviti, khairat, laporan).
- **Menjadikan AJK lebih efisien** melalui sistem dashboard dan laporan automatik.
- **Membolehkan ahli & waris berinteraksi secara digital** (derma, semak status, daftar aktiviti).
- **Meningkatkan ketelusan kewangan** dan pengurusan khairat kematian.
- **Menyokong digitalisasi komuniti Islam tempatan**.

---

## 3️⃣ Skop Fungsi Utama

### 🔹 Modul 1: Pengurusan Ahli Kariah
- Pendaftaran dan kemaskini maklumat ahli (manual & atas talian).
- Profil ahli lengkap: nama, IC, alamat, nombor telefon, tanggungan.
- Carian ahli berdasarkan nama, IC, atau kawasan.
- Penjanaan ID & QR code untuk keahlian.
- Status automatik (Aktif / Tidak Aktif / Warga Emas / Ahli Khairat).

---

### 🔹 Modul 2: Kutipan & Sumbangan
- Rekod derma tunai & atas talian (FPX, QRPay, eWallet).
- Kategori derma: Umum, Zakat, Wakaf, Khairat, Qurban, Tabung Pendidikan.
- Statistik derma & laporan kutipan mengikut bulan/tahun.
- Penjanaan resit digital automatik.
- Dashboard derma menggunakan Recharts.

---

### 🔹 Modul 3: Aktiviti & Jadual Masjid
- Pengumuman solat berjemaah, kuliah, ceramah & program komuniti.
- Pendaftaran acara atas talian (kelas agama, gotong royong, qurban).
- Pengurusan peserta & kehadiran.
- Notifikasi Telegram / WhatsApp automatik.
- Kalendar aktiviti interaktif.

---

### 🔹 Modul 4: Laporan & Audit
- Laporan kewangan (pendapatan, perbelanjaan, baki).
- Laporan aktiviti, kehadiran dan derma.
- Eksport laporan ke PDF / Excel.
- Paparan carta (Recharts / Chart.js) untuk analisis pantas.
- Laporan tahunan audit (dengan logo & tandatangan digital).

---

### 🔹 Modul 5: Komunikasi & Notifikasi
- Pengumuman rasmi oleh AJK melalui papan notis digital.
- Sistem aduan & cadangan komuniti.
- Integrasi dengan Telegram Bot API untuk notifikasi automatik.
- Template mesej pra-siap (contoh: Peringatan yuran khairat, jadual aktiviti).

---

### 🔹 Modul 6: Khairat & Data Akhirat (AkhiratCare)
Menguruskan data khairat kematian, bantuan kebajikan, dan maklumat akhirat ahli.

#### 📘 Fungsi Utama
**1. Pengurusan Ahli Khairat**
- Pendaftaran ahli khairat & status keahlian.
- Yuran khairat, tunggakan & baki.
- Maklumat waris utama dan sekunder.
- Kad keahlian digital (QR code).

**2. Rekod Kematian & Bantuan**
- Tarikh & lokasi kematian.
- Jumlah bantuan & penerima waris.
- Catatan bantuan tambahan (pengurusan jenazah, sumbangan komuniti).
- Lampiran dokumen (sijil kematian, kad pengenalan).

**3. Laporan & Notifikasi**
- Statistik kematian, jumlah bantuan & baki tabung khairat.
- Peringatan yuran tahunan.
- Notifikasi automatik kepada AJK Khairat & waris.

---

## 4️⃣ Teknologi & Stack Projek

| Komponen | Teknologi |
|-----------|------------|
| **Frontend** | React 19 + AdminLTE 5 + Bootstrap 5 |
| **Build Tool** | Vite (boleh tukar dari Webpack untuk performance) |
| **State Management** | Zustand / Redux Toolkit |
| **Charts & Laporan** | Recharts / Chart.js |
| **Backend-as-a-Service** | Supabase (PostgreSQL, Auth, Storage) |
| **Auth & Roles** | Supabase Auth (Admin, AJK, Ahli, Waris) |
| **Integrasi API** | Telegram Bot API, FPX/eWallet (TNG, Boost) |
| **Laporan & Dokumen** | jsPDF, XLSX, React-Table |
| **Hosting** | Vercel / Render / Nginx VPS |

---

## 5️⃣ Struktur Pengguna

| Peranan | Akses Modul |
|----------|-------------|
| **Admin Utama (Imam / Setiausaha)** | Semua modul & laporan penuh |
| **AJK Kewangan** | Kutipan, derma, audit & laporan |
| **AJK Aktiviti** | Jadual, pengumuman & pendaftaran program |
| **AJK Khairat** | Pengurusan ahli khairat, kematian & bantuan |
| **Ahli Kariah** | Semak profil, daftar aktiviti, bayar yuran, semak derma |
| **Waris Ahli** | Akses khas untuk semak bantuan & status kematian |

---

## 6️⃣ Ciri Tambahan (Fasa 2)
- Modul **Wakaf & Sedekah Jariah Digital**
- **QR Kubur Finder** (Peta GPS lokasi kubur + QR batu nisan)
- **Doa & Tahlil Digital** (tempahan & jadual imam)
- **AI Chatbot Fatwa Ringkas** (FAQ & nasihat agama)
- Dashboard Power BI Mini (Integrasi laporan luar)

---

## 7️⃣ Reka Bentuk UI (AdminLTE Style)
- Layout **Sidebar kiri + Navbar atas**
- Tema warna utama: **Hijau Teal (#00B1A9)** dan **Emas Lembut (#F9C74F)**
- Komponen utama:
  - 🧭 Sidebar Menu (Dashboard, Ahli, Derma, Aktiviti, Khairat, Laporan)
  - 🧩 Card Statistik (Jumlah Ahli, Derma Bulanan, Ahli Khairat Aktif)
  - 📊 Carta Derma (Recharts)
  - 🗂️ Table Ahli / Derma (React-Table)
  - 📱 Responsif (Bootstrap 5 grid system)

---

## 8️⃣ Pelan Pelaksanaan Projek

| Fasa | Aktiviti | Tempoh |
|------|-----------|--------|
| **1** | Analisis keperluan & reka bentuk UI (wireframe + tema) | 2 minggu |
| **2** | Pembangunan modul asas (Dashboard, Ahli, Derma, Aktiviti) | 4 minggu |
| **3** | Tambah modul Khairat & Laporan | 3 minggu |
| **4** | Integrasi Supabase & Telegram Bot | 2 minggu |
| **5** | Ujian sistem & dokumentasi | 2 minggu |
| **6** | Latihan AJK & Go-Live | 1 minggu |

---

## 9️⃣ Manfaat Projek
✅ Pengurusan masjid lebih moden & efisien  
✅ Data ahli dan khairat disimpan selamat di cloud (Supabase)  
✅ Derma tanpa tunai & laporan automatik  
✅ Waris dan ahli boleh akses info dengan mudah  
✅ Menjadi contoh transformasi digital komuniti Islam tempatan  

---

## 🔖 Versi Projek
**MasjidConnect v1.0 (React + AdminLTE + Supabase)**  
Dibangunkan oleh: *Mohamad Sahdan Salehuddin*  
Stack: React 19 | AdminLTE 5 | Supabase | Bootstrap 5 | Recharts  
