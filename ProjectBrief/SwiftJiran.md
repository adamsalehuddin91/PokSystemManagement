# 🏡 SwiftJiran: Sistem Komuniti Digital Taman Kejiranan  
### 📄 Project Brief

---

## 📌 Ringkasan Projek  
**SwiftJiran** ialah sistem digital komuniti yang direka khas untuk **kejiranan taman perumahan**, membantu memudahkan pengurusan komuniti, pengumuman, keselamatan, kutipan yuran dan rekod pelawat — semua dalam satu aplikasi mesra pengguna.

---

## 🎯 Objektif Sistem
- Meningkatkan **komunikasi** antara penduduk & AJK
- Menyediakan sistem **aduan, aktiviti & notis** yang tersusun
- Memudahkan **rekod kutipan yuran & kewangan**
- Mewujudkan **log keselamatan & pelawat**
- Galakkan **penglibatan aktif komuniti** melalui sistem digital

---

## 👥 Sasaran Pengguna
- Penduduk taman perumahan (ahli biasa)
- AJK taman / KRT / Jawatankuasa surau
- Pengawal keselamatan / security
- Komuniti setempat (jalan, blok, lorong)

---

## ⚙️ Fungsi Utama (Modul MVP)

### 1. 🏘️ Direktori Penduduk
- Senarai no rumah, nama penghuni, nombor telefon (optional)
- Boleh filter ikut jalan/blok
- Akses terhad (admin boleh lihat penuh, jiran lihat asas)

---

### 2. 📣 Notis & Pengumuman
- AJK boleh post pengumuman rasmi (majlis, mesyuarat, gangguan air, dll)
- Push notification (WhatsApp / email) ke semua ahli
- Arkib notis lama

---

### 3. 📅 Kalendar Aktiviti Taman
- Jadual gotong-royong, kenduri, rombongan, mesyuarat
- Auto reminder sehari sebelum melalui WhatsApp/Email

---

### 4. 🛠️ Modul Aduan & Cadangan
- Penduduk boleh buat aduan (lampu rosak, sampah, haiwan liar)
- Boleh lampirkan gambar
- Status aduan:
  - Baru
  - Sedang Diproses
  - Selesai
- AJK boleh tambah komen / tindakan susulan

---

### 5. 🚨 Keselamatan & Nombor Kecemasan
- Senarai nombor penting: Polis, Bomba, Klinik, Surau, AJK
- Butang “Panik” – alert kecemasan kepada pengawal/AJK
- Catat kejadian keselamatan (jiran curiga, pecah masuk, dll)

---

### 6. 💸 Bayaran Yuran & Kewangan
- Catatan yuran bulanan, derma, kutipan khas
- Status bayar: Sudah / Belum
- History sumbangan & resit digital
- Laporan kutipan untuk AJK

---

### 7. 🛒 Marketplace Jiran ke Jiran (Optional)
- Jual beli barangan terpakai (meja, stroller, baju)
- Promote servis jiran (tukang paip, mengaji, baking)
- Boleh add gambar + nombor untuk dihubungi

---

### 8. 👥 Sistem Ahli & Akses
- Role-based access:
  - Ahli Biasa
  - AJK
  - Pengawal
- Daftar ahli ikut kod jemputan / admin approval
- Info akaun boleh dikemaskini sendiri oleh pemilik

---

### 9. 📊 Dashboard AJK (Admin Panel)
- Statistik:
  - Jumlah rumah aktif
  - Yuran terkumpul
  - Bilangan aduan
  - Aktiviti akan datang
- Export laporan Excel (optional)

---

### 10. 🛂 Guest Register & Visitor Log
- Tuan rumah boleh daftar pelawat:
  - Nama, No IC, Plat kereta, Tujuan
- Generate QR Code untuk pelawat
- Pengawal imbas QR / key-in manual di pintu masuk
- Waktu masuk & keluar direkod
- Pelawat auto-logout selepas tempoh (cth: 12 jam)
- Log pelawat boleh dicari semula bila-bila masa

---

## 📈 Modul Tambahan (Future Add-ons)
- Sistem kutipan Ramadan / Qurban
- Pengurusan wakaf / derma surau
- Voting system (undi AJK, pilihan warna pagar 😄)
- Sistem birthday alert jiran
- App version PWA (boleh install terus dalam phone)

---

## 🔐 Privasi & Sekuriti
- Data penduduk disimpan secara selamat
- Akses hanya ikut peranan (Role-based Access Control)
- Guest log hanya dilihat oleh tuan rumah, admin dan pengawal
- Tiada iklan atau data dikongsi ke pihak luar

---

## 🛠️ Teknologi Standard SwiftApps
*Diselaraskan dengan Ekosistem SwiftApps*

### Frontend Foundation
- **Next.js 15** - React framework dengan App Router dan Turbopack
- **React 19.1.0** - React terkini dengan concurrent features
- **TypeScript 5** - Pembangunan type-safe yang ketat
- **Tailwind CSS 4** - Sistem design bersepadu SwiftApps
- **Lucide React** - Perpustakaan ikon konsisten
- **Radix UI** - Komponen primitif yang accessible

### Backend & Database
- **PostgreSQL** - Database relational yang kukuh
- **Prisma** - Type-safe database ORM
- **Supabase** - Backend-as-a-Service dengan real-time capabilities
- **Supabase Auth** - Authentication bersepadu ekosistem SwiftApps

### State Management & Performance
- **Zustand** - State management yang ringan
- **TanStack Query** - Server state management dengan caching
- **React Hook Form + Zod** - Form handling dan schema validation

### Komunikasi & Notifikasi
- **WhatsApp Business API** - Integrasi komunikasi komuniti
- **Supabase Push Notifications** - Notifikasi real-time
- **EmailJS** - Sistem email notification

### Development & Deployment
- **ESLint 9** - Konfigurasi linting standard SwiftApps
- **Turbopack** - Ultra-fast development builds
- **Vercel** - Platform deployment yang optimized
- **Supabase Cloud** - Database dan backend hosting

---

## 🧠 Vision Statement
Membina komuniti kejiranan yang lebih **selamat, mesra & terurus** melalui digitalisasi, sekaligus memupuk **keterlibatan aktif jiran-jiran** dalam satu platform yang mudah digunakan.

---
## 🛂 10. Guest Register & Visitor Tracking

### 📲 Fungsi Utama:
- ✅ Tuan rumah boleh **daftar tetamu** melalui app:
  - Nama pelawat
  - No. IC / plat kereta
  - Tarikh & masa lawatan
  - Tujuan
- ✅ Pelawat daftar terus di gate (oleh pengawal / QR scan)
- ✅ AJK atau pengawal boleh tengok senarai pelawat harian
- ✅ Sistem log masa keluar pelawat (optional auto log out selepas 12 jam)
- ✅ Boleh **cetak sticker tetamu** jika perlu (optional)

---

### 👤 Flow: Tuan Rumah
1. Buka App → Modul "Tetamu"
2. Klik "Daftar Tetamu Baru"
3. Isi maklumat: Nama, IC/Kereta, Tujuan, Tarikh
4. Dapatkan kod QR / ID untuk tunjuk di pintu masuk
5. Semak tetamu yang dah keluar / masih dalam taman

---

### 🚪 Flow: Pintu Masuk / Pengawal
1. Login sebagai “Security Role”
2. Imbas kod QR / masukkan IC pelawat
3. Semak maklumat & benarkan masuk
4. Waktu masuk direkod automatik
5. Boleh catat waktu keluar / keluar auto selepas tempoh

---

### 🧾 Dashboard Admin (AJK)
- Lihat senarai pelawat hari ini / minggu ini
- Carian ikut:
  - No rumah
  - Nama pelawat
  - Plat kereta
- Statistik: Bil tetamu masuk/bulan
- Export CSV / Print Log Book (backup manual)

---

### 🔐 Privacy & Security
- Akses data hanya oleh:
  - Tuan rumah sendiri
  - Pengawal (view hari ini sahaja)
  - AJK / Admin
- IC/Plat kereta takkan dipaparkan pada jiran lain

