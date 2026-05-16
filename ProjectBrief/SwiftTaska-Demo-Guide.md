# SwiftApps Taska — Demo Guide untuk Owner Taska
**Version**: v1.0
**Date**: 2026-05-11
**Login**: admin@swifttaska.com / password123
**URL**: http://localhost:3000

---

## SEBELUM DEMO
- Buka `http://localhost:3000` — pastikan loading
- Login: `admin@swifttaska.com` / `password123`
- Full screen browser (F11) — nampak lebih professional

---

## URUTAN DEMO (15–20 minit)

**1. Dashboard (2 minit)**
> *"Ini first page yang cikgu/admin nampak setiap pagi. Semua maklumat penting dalam satu skrin."*
- Tunjuk 4 stat cards: Pelajar, Hadir hari ini, Parent Update, Yuran
- Tunjuk chart kehadiran mingguan
- Tunjuk "Tindakan Pantas" — 4 shortcut button

**2. Kehadiran + QR (3 minit)**
> *"Ibu bapa tak perlu sign buku lagi. Scan je QR, terus masuk sistem."*
- Tunjuk QR code — explain ibu bapa scan masa hantar & ambil anak
- Tunjuk table — check-in, check-out, penjemput, status badge
- Highlight: Belum Keluar vs Hadir vs Tidak Hadir

**3. Parent Update (3 minit)**
> *"Ibu bapa boleh tengok anak buat apa setiap hari. Macam WhatsApp tapi lebih tersusun."*
- Tunjuk feed list sebelah kiri
- Klik satu update — tunjuk detail panel
- Tunjuk compose box bawah — gambar, video, tag aktiviti

**4. Rekod Harian (3 minit)**
> *"Cikgu boleh rekod tidur, makan, mood, kesihatan — semua dalam satu page."*
- Tunjuk student selector (anak pertama → anak kedua)
- Toggle tidur ON/OFF
- Pilih mood emoji
- Tunjuk status kesihatan + suhu badan

**5. Yuran & Resit (2 minit)**
> *"Yuran boleh track siapa dah bayar, siapa belum. Boleh hantar peringatan terus."*
- Tunjuk 4 KPI cards — highlight "Tertunggak RM 5,660"
- Filter status: Tertunggak — tunjuk siapa yang belum bayar
- Tunjuk button "Peringat" — boleh terus notif penjaga

**6. Parent PWA Mobile (2 minit)**
> *"Ibu bapa ada app sendiri dekat phone. Tak perlu install — buka browser je."*
- Buka `http://localhost:3000/parent` dekat phone atau resize browser jadi mobile
- Tunjuk: card anak, status hadir, yuran, update hari ni, bottom nav

---

## SOALAN LAZIM CLIENT & JAWAPAN

| Soalan | Jawapan |
|--------|---------|
| *"Boleh guna dekat phone?"* | Ya — ibu bapa ada portal mobile sendiri, admin ada desktop |
| *"Kalau internet down?"* | Data tersimpan dalam sistem — boleh semak balik bila internet ada |
| *"Boleh multi-taska?"* | Basic 1 taska, Premium boleh manage beberapa cawangan |
| *"Data selamat ke?"* | Server kami di Malaysia, backup harian, data owner taska sendiri |
| *"Boleh custom nama taska?"* | Ya — logo, nama, warna semua boleh customize |
| *"Berapa caj yuran?"* | Basic RM200/bln, Standard RM280/bln, Premium RM350/bln |

---

## CLOSING LINE

> *"System ni untuk tolong cikgu fokus pada anak-anak, bukan admin kerja. Cuba free 30 hari, kalau sesuai baru sign up."*

---

## FILES RUJUKAN
- Wireframe: `ProjectBrief/SwiftTaska-Wireframe.md`
- Project Brief: `C:\Users\Admin\Downloads\swiftapps_taska_project_brief_packages_en.md`
- Source code: `SwiftApp Dev/SwiftTaska/`
