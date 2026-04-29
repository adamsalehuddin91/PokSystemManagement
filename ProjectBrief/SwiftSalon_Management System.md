# SwiftSalon Muslimah: Sistem Pengurusan Salon Muslimah  
### Project Brief  

---

## 📌 Project Overview  
SwiftSalon Muslimah ialah sistem pengurusan **salon kecantikan muslimah** yang direka khas untuk memudahkan operasi salon wanita yang baru beroperasi. Sistem ini memastikan pengurusan pelanggan lebih **profesional, teratur dan patuh syariah**, dengan tambahan **sistem membership & point** untuk menggalakkan pelanggan setia.  

---

## 🎯 Target Market  
- Salon rambut muslimah (1–5 kerusi)  
- Spa & pusat rawatan kecantikan muslimah  
- Nail & henna studio muslimah  
- Home-based salon muslimah  

---

## 🌟 Unique Value (Berbeza Dari Salon Biasa)  
1. **Privasi Pelanggan** – hanya untuk wanita, patuh syariah.  
2. **Patuh Syariah** – staff wanita sahaja, suasana eksklusif.  
3. **Membership & Points** – pelanggan kumpul point setiap kali datang, tebus untuk diskaun atau free service.  
4. **Servis Custom Muslimah** – rawatan rambut, wajah, henna, spa muslimah.  

---

## 🎯 System Objectives  
1. **Tempahan Mudah** – booking via WhatsApp/QR/link.  
2. **Jadual Stylist Wanita** – urus staff & slot dengan jelas.  
3. **Rekod Servis** – track rawatan pelanggan untuk upsell.  
4. **Pembayaran Ringkas** – support tunai, QR Pay, FPX.  
5. **Membership & Points** – kumpul & tebus mata ganjaran.  
6. **Laporan Asas** – servis popular, pelanggan aktif, jualan bulanan.  

---

## ⚙️ Core Features (MVP)  
- 📅 **Booking & Calendar** → pilih slot & servis.  
- 👩 **Staff Management** → jadual stylist muslimah.  
- 🧾 **Service Menu Muslimah** → contoh: cuci rambut, blow dry, facial, henna, spa.  
- 💳 **Payment Tracker** → tunai/QR/FPX.  
- ⭐ **Membership & Points** →  
  - Pelanggan daftar jadi ahli.  
  - Dapat point untuk setiap RM dibelanjakan.  
  - Boleh tebus point untuk diskaun/free service.  
- 📊 **Dashboard** → revenue, pelanggan aktif, top service.  
- 🔔 **WhatsApp Reminder** → auto reminder appointment.  

---

## 🚀 Future Add-ons (Upsell Features)  
- Tier Membership (Silver / Gold / Platinum).  
- E-receipt & customer feedback.  
- Promosi bermusim (Ramadhan / Raya / Tahun Baru).  
- Bundle pakej kahwin & group booking.  

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

### Salon-Specific Features
- **WhatsApp Business API** - Integrasi reminder dan komunikasi pelanggan
- **QR Code Generation** - Sistem booking dan member card
- **Supabase Push Notifications** - Reminder appointment automatik
- **jsPDF** - Sistem resit digital dan laporan

### Development & Deployment
- **ESLint 9** - Konfigurasi linting standard SwiftApps
- **Turbopack** - Ultra-fast development builds
- **Vercel** - Platform deployment yang optimized
- **Supabase Cloud** - Database dan backend hosting

---

## 🌍 Vision Statement
Membantu usahawan salon muslimah **mengurus operasi dengan lebih efisien, mesra pelanggan dan patuh syariah**, serta meningkatkan **customer loyalty melalui membership & points system**.

---

## 📘 Business Rules – SwiftSalon Muslimah

### 1. Booking & Calendar
- Pelanggan boleh pilih servis dan masa melalui sistem booking (QR/link/WhatsApp).
- Slot akan dikunci selepas pengesahan.
- Satu slot = 1 pelanggan sahaja untuk jaga privasi.

### 2. Staff Management
- Hanya staff wanita dibenarkan untuk urus pelanggan.
- Jadual kerja staff boleh disusun ikut shift pagi/petang.

### 3. Service Menu
- Semua servis adalah muslimah-friendly:
  - ✅ Cuci rambut
  - ✅ Blow dry
  - ✅ Rawatan wajah
  - ✅ Inai tangan/kaki
  - ✅ Spa kaki

### 4. Pembayaran
- Kaedah bayaran:
  - Tunai
  - QR Pay (TnG, DuitNow)
  - FPX (Online transfer)
- Sistem akan rekod setiap transaksi.

### 5. Membership & Points
- Pelanggan boleh daftar sebagai ahli (percuma atau berbayar).
- Setiap RM1 dibelanjakan = 1 Point.
- Point boleh ditebus seperti berikut:
  - 50 point → RM5 diskaun
  - 100 point → RM15 diskaun
  - 200 point → Free servis tertentu (ikut admin setting)
- Point tidak boleh dipindah atau dikumpul antara akaun.
- Point akan tamat selepas 6 bulan jika tidak digunakan.

### 6. Reminder WhatsApp
- Reminder akan dihantar 1 hari sebelum appointment.
- Format mesej boleh di-custom oleh admin.

---

## 🔄 User Flow – SwiftSalon Muslimah

### 👩 Pelanggan
1. **Buka link booking (QR / WhatsApp / web)**  
2. **Pilih servis + masa**  
3. **Isi maklumat diri (nama, no telefon)**  
4. **Sahkan tempahan**  
5. **Terima WhatsApp confirmation & reminder**  
6. **Datang ke salon → buat bayaran**  
7. **Jika ahli: Point akan dikira secara automatik**  
8. **Tebus point bila cukup threshold**

---

### 👩‍💼 Admin / Owner
1. **Login ke sistem**  
2. **Lihat dashboard hari ini (booking, sales, etc)**  
3. **Update status booking (showed / no-show)**  
4. **Tambah/Edit servis, harga, staff**  
5. **Lihat senarai ahli & point terkumpul**  
6. **Setup promosi diskaun atau reward**  
7. **Cetak laporan bulanan**  

---

### ⭐ Flow: Membership Point (Earn & Redeem)

```mermaid
graph TD
    A[Pelanggan buat bayaran] --> B{Ahli?}
    B -- Ya --> C[Kira RM → Point]
    C --> D[Update point pelanggan]
    D --> E{Cukup point untuk redeem?}
    E -- Ya --> F[Admin offer diskaun / servis percuma]
    E -- Tidak --> G[Simpan point]
    B -- Bukan ahli --> H[Offer daftar jadi ahli]
