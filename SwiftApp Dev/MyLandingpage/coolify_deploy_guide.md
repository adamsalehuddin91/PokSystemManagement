# Panduan Deployment: SwiftApps Landing Page (Hetzner + Coolify)

Sistem ini telah dikonfigurasi sepenuhnya untuk production deployment berprestasi tinggi menggunakan arsitektur kontena (*containerized architecture*) menerusi fail `Dockerfile` (Next.js Standalone).

Sila ikuti langkah-langkah di bawah pada dashboard Coolify anda:

## Langkah 1: Push Kod Terkini ke GitHub
Pastikan semua perubahan terkini termasuk `Dockerfile`, `.dockerignore`, dan `next.config.ts` telah di-push:
```bash
git add .
git commit -m "build: Add Docker and Next.js standalone config for Coolify"
git push origin main
```

## Langkah 2: Tambah Resource di Coolify
1. Buka dashboard **Coolify** anda.
2. Pergi ke **Project** >> Pilih **Environment** (contoh: Production).
3. Klik butang **Add New Resource** (+).
4. Pilih **Public Repository** (jika repo open source) atau **Private Repository** (jika private).
5. Pilih repositori GitHub anda: `adamsalehuddin91/SwiftAppsPage`.
6. Tetapkan branch kepada `main`.

## Langkah 3: Konfigurasi Deployment
Apabila resources telah dihubungkan, buat tetapan berikut dalam konfigurasi projek di Coolify:

- **Build Pack**: Pilih `Docker` (Sistem akan secara automatik membaca fail `Dockerfile` yang telah kita bina).
- **Domains**: Masukkan domain rasmi laman web (contoh: `https://swiftapps.my` atau subdomain sementara).
- **Port**: Pastikan port diset kepada `3000`. Next.js Dockerfile ini mengikut standard eksport port 3000.
- **Environment Variables**: Jika anda ada menambah sebarang rahsia/API key pada masa hadapan, masukkan di tab *Environment Variables*.
- **Post-Deployment Hooks**: Tiada operasi pangkalan data diperlukan untuk landing page statik/client ini, jadi tak perlu tetapkan database migration.

## Langkah 4: Deploy
Klik butang **Deploy** di penjuru atas. Coolify akan mula menarik kod:
- Memasang *dependencies* Node.js dalam kontena berasingan.
- Menjalankan `npm run build`.
- Mengekstrak folder `.next/standalone` (saiz imej yang jauh lebih kecil dan laju).
- Menjalankan node server.

## Kenapa "Standalone" Mode?
Kita mengkonfigurasi `next.config.ts` untuk mod `standalone`. Ini bermakna Next.js akan memaparkan fail pelayan yang telah diekstrak dengan saiz minimum, tanpa perlukan folder `node_modules` yang berat. Sesuai untuk persekitaran self-hosted pada Hetzner VPS (melalui Coolify) dengan penggunaan RAM yang sangat rendah.
