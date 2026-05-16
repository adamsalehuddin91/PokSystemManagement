# SwiftApps Taska — System Guide
**Version**: Standard Package v1.0  
**Last Updated**: 2026-05-12  
**Prepared by**: SwiftApps

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [User Roles](#2-user-roles)
3. [How to Access the System](#3-how-to-access-the-system)
4. [Admin & Teacher Modules](#4-admin--teacher-modules)
   - 4.1 Dashboard
   - 4.2 Pelajar (Students)
   - 4.3 Penjaga (Guardians)
   - 4.4 Kehadiran (Attendance)
   - 4.5 Parent Update
   - 4.6 Rekod Harian (Daily Child Record)
   - 4.7 Yuran & Resit (Fees & Receipts)
   - 4.8 Pengumuman (Announcements)
   - 4.9 Tetapan (Settings)
5. [Parent PWA Modules](#5-parent-pwa-modules)
   - 5.1 Home Dashboard
   - 5.2 Kehadiran (Attendance History)
   - 5.3 Aktiviti (Daily Activity Feed)
   - 5.4 Yuran (Fee & Receipt)
   - 5.5 Profil (Profile)
6. [Daily Workflow Guide](#6-daily-workflow-guide)
7. [FAQ](#7-faq)

---

## 1. System Overview

SwiftApps Taska is a digital childcare management system designed specifically for private childcare centers (taska) in Malaysia. It replaces manual logbooks, WhatsApp updates, and Excel spreadsheets with a centralized platform that is accessible from any device.

### What the System Does

| Before SwiftApps Taska | After SwiftApps Taska |
|---|---|
| Attendance in physical logbook | Digital check-in with QR code or manual |
| Parent updates via WhatsApp | Structured daily update in parent portal |
| Fees tracked in Excel | Automated fee records with receipt generation |
| Announcements via WhatsApp group | Official announcement with read tracking |
| Parent calls to check on child | Parent opens app anytime to see real-time info |

### System Components

```
SwiftApps Taska
├── Admin Web Dashboard      → For owner and admin staff
├── Teacher Web Dashboard    → For teachers (limited access)
└── Parent PWA               → For parents/guardians (mobile app)
```

---

## 2. User Roles

| Role | Access Level | Who Uses It |
|---|---|---|
| **Admin** | Full access — all modules including settings, fees, user management | Taska owner, centre manager |
| **Teacher (Guru)** | Attendance, parent updates, daily records, view-only for fees | Class teachers |
| **Parent/Guardian (Penjaga)** | Own child's data only — attendance, activities, fees, announcements | Ibu bapa, penjaga |

### Permission Summary

| Module | Admin | Teacher | Parent |
|---|---|---|---|
| Dashboard | ✅ Full | ✅ Limited | ❌ |
| Pelajar | ✅ Full CRUD | ✅ View only | ❌ |
| Penjaga | ✅ Full CRUD | ✅ View only | ❌ |
| Kehadiran | ✅ Full | ✅ Can record | ✅ Own child |
| Parent Update | ✅ Full | ✅ Can create | ✅ Own child |
| Rekod Harian | ✅ Full | ✅ Can create | ✅ Own child |
| Yuran & Resit | ✅ Full | ✅ View only | ✅ Own child |
| Pengumuman | ✅ Full CRUD | ✅ View only | ✅ Receive only |
| Tetapan | ✅ Full | ❌ | ❌ |

---

## 3. How to Access the System

### Admin & Teacher

1. Open browser — go to your taska system URL (e.g., `taska.swiftapps.my`)
2. Enter email and password
3. Click **Log Masuk**
4. You will be redirected to the Dashboard

**Demo credentials (for presentation):**
```
Admin  : admin@swifttaska.com  / password123
Teacher: sarah.t@swifttaska.com / password123
```

### Parent

1. Admin or teacher sends a **parent portal invitation** via email
2. Parent clicks the link in the email and sets a password
3. Parent accesses the portal via browser on their phone: `taska.swiftapps.my/parent`
4. To install as an app (PWA): tap the browser menu → **Add to Home Screen**

---

## 4. Admin & Teacher Modules

---

### 4.1 Dashboard

**URL**: `/dashboard`  
**Access**: Admin, Teacher

#### Purpose
The Dashboard is the first screen after login. It gives a real-time summary of the childcare centre's daily operations at a glance.

#### What You Can See

| Section | Information Shown |
|---|---|
| **Stat Cards** (top row) | Total students, present today, parent updates sent, monthly fee collection |
| **Tindakan Pantas** | Quick action buttons — Tambah Pelajar, Rekod Kehadiran, Buat Pengumuman, Jana Invois |
| **Ringkasan Kehadiran Mingguan** | Area chart showing attendance trend for the past 7 days |
| **Parent Update Terkini** | Latest 5 parent updates sent to parents |
| **Status Hadir Hari Ini** | Pie chart — Present / Absent / Not Yet Checked Out |
| **Pengumuman Terkini** | Latest announcements with date and type badge |

#### How to Use

- Use the **Tindakan Pantas** buttons to quickly navigate to the most common daily tasks
- Check **Status Hadir Hari Ini** every morning to see which students have not arrived yet
- Monitor **Ringkasan Kehadiran Mingguan** weekly to identify attendance patterns

---

### 4.2 Pelajar (Students)

**URL**: `/dashboard/pelajar`  
**Access**: Admin (full), Teacher (view)

#### Purpose
Manage all student records. This is the master data for every child enrolled in the taska.

#### Student List Page

**Features:**
- Search by name or student number
- Filter by class (Kelas Ceria, Kelas Pelangi, Kelas Matahari)
- Filter by status (Aktif, Trial, Alumni)
- Attendance progress bar per student
- Status badges (Aktif / Trial / Alumni)
- Click any row → opens Student Details page

**Right panel** shows:
- Students with incomplete profiles
- Students with no guardian linked
- Students with overdue fees

#### Tambah Pelajar (Add Student)

**URL**: `/dashboard/pelajar/tambah`

Fill in **3 sections**:

**Section 1 — Maklumat Pelajar**
| Field | Required | Notes |
|---|---|---|
| Nama Penuh | ✅ | As per birth certificate |
| Jantina | ✅ | Lelaki / Perempuan |
| Tarikh Lahir | ✅ | DD/MM/YYYY |
| No. MyKid / IC | ✅ | 12-digit number |
| Foto Pelajar | ❌ | JPG/PNG, max 2MB |
| Dokumen Sokongan | ❌ | Birth cert, medical docs |

**Section 2 — Maklumat Taska**
| Field | Required | Notes |
|---|---|---|
| Kelas | ✅ | Select from existing classes |
| Status Pelajar | ✅ | Aktif / Trial / Tidak Aktif |
| Alahan | ❌ | Food or medical allergies |
| Catatan Guru | ❌ | Short notes for teachers |

**Section 3 — Maklumat Penjaga**
| Field | Required | Notes |
|---|---|---|
| Nama Penjaga | ✅ | Primary guardian |
| Hubungan | ✅ | Ibu / Bapa / Penjaga |
| No. Telefon | ✅ | For contact and parent portal |
| E-mel | ✅ | For parent portal login invitation |

#### Student Details Page

**URL**: `/dashboard/pelajar/[id]`

Three tabs:

**Tab 1 — Profil**
- Personal info: MyKid, DOB, gender, class, enrolment date
- Health notes and allergies
- Document downloads (birth cert, MyKid)

**Tab 2 — Penjaga**
- List of linked guardians
- Phone, email, address per guardian
- Can add additional guardians from this tab

**Tab 3 — Yuran**
- Summary: Total Generated / Paid / Outstanding
- Full fee history with receipt numbers
- Button to record new payment

---

### 4.3 Penjaga (Guardians)

**URL**: `/dashboard/penjaga`  
**Access**: Admin (full), Teacher (view)

#### Purpose
Manage parent and guardian records. Each guardian can be linked to one or more students.

#### Guardian List Page

**Stats shown:**
- Total guardians registered
- Active guardians
- Total guardian-student links
- Guardians needing attention

**Table columns:** Name, Relationship, Phone, Email, Number of Children, Status, Actions

**Filters available:** Status, Relationship (Ibu/Bapa/Penjaga), Class

#### Tambah Penjaga (Add Guardian)

**URL**: `/dashboard/penjaga/tambah`

Fill in **3 sections**:

**Section 1 — Maklumat Peribadi**
| Field | Required | Notes |
|---|---|---|
| Nama Penuh | ✅ | Full name of guardian |
| Hubungan | ✅ | Ibu / Bapa / Datuk / Nenek / Penjaga Sah |
| Status | ✅ | Aktif / Tidak Aktif |
| Penjaga Utama | ❌ | Check if this is primary guardian |

**Section 2 — Maklumat Hubungi**
| Field | Required | Notes |
|---|---|---|
| No. Telefon | ✅ | Used for WhatsApp contact |
| E-mel | ✅ | For parent portal invitation |
| Alamat | ❌ | Home address |

**Section 3 — Kaitkan dengan Pelajar**
- Search for student by name
- Check the checkbox to link guardian to student
- One guardian can be linked to multiple children

> **Note**: After saving, go to the student's profile and send a **Parent Portal Invitation** from the Penjaga tab. The guardian will receive an email with a link to set their password.

---

### 4.4 Kehadiran (Attendance)

**URL**: `/dashboard/kehadiran`  
**Access**: Admin (full), Teacher (can record)

#### Purpose
Record and monitor daily student attendance. Supports manual check-in and QR code scanning.

#### What You Can See

| Section | Information |
| --- | --- |
| **QR Kod Kehadiran** | Display this QR on a tablet at the entrance for parent self-check-in |
| **Ringkasan Hari Ini** | Attendance bar chart by class |
| **Senarai Kehadiran** | Full list with check-in/check-out times, status, and pickup person |

#### Attendance Statuses

| Status | Meaning |
|---|---|
| **Hadir** | Child has checked in |
| **Belum Masuk** | Not yet arrived |
| **Tidak Hadir** | Absent for the day |
| **Cuti** | On approved leave |
| **Belum Keluar** | Checked in but not yet picked up |

#### How to Record Attendance

**Method 1 — Manual**
1. Go to Kehadiran page
2. Find student in the list
3. Click **Masuk** or **Keluar**
4. Record pickup person name (for check-out)

**Method 2 — QR Code**
1. Display the QR code on a screen at the entrance
2. Parent scans QR using their phone camera
3. System automatically records check-in time

#### Filters Available
- Date picker (default: today)
- Filter by class
- Filter by status (Hadir / Belum Masuk / Tidak Hadir)

---

### 4.5 Parent Update

**URL**: `/dashboard/parent-update`  
**Access**: Admin (full), Teacher (can create)

#### Purpose
Teachers post daily updates about the child's activities, progress, and wellbeing. Parents receive these updates in real-time through their portal.

#### What You Can See

- **Left panel**: List of students who have/have not received an update today
- **Update feed**: All updates sent today with timestamp, tags, and photos
- **Detail panel** (right): Full update content when clicked

#### How to Create a Parent Update

1. Click **Buat Update Baru** button
2. Select student
3. Fill in the update form:

| Field | Required | Notes |
|---|---|---|
| Tajuk Aktiviti | ✅ | E.g., "Aktiviti Seni & Kraf" |
| Penerangan | ✅ | What the child did today |
| Mood Hari Ini | ✅ | Select emoji (Gembira / Biasa / Sedih) |
| Tag Aktiviti | ❌ | #Makan #Tidur #Main #Belajar etc. |
| Foto | ❌ | Up to 5 photos per update |

4. Click **Hantar Update**
5. Parent receives update immediately in their portal

> **Best practice**: Send at least one update per child per day. Parents appreciate knowing what happened at taska even if it's brief.

---

### 4.6 Rekod Harian (Daily Child Record)

**URL**: `/dashboard/rekod-harian`  
**Access**: Admin (full), Teacher (can record)

#### Purpose
A detailed daily log for each child covering meals, sleep, health, mood, and other care activities. More structured than Parent Update — this is the operational record.

#### What to Record

**Section 1 — Susu & Minum (Milk & Drinks)**

| Field | Example |
|---|---|
| Susu Bancuhan | 150ml, 200ml |
| Bilangan Susu | 2 kali |
| Minuman Lain | Air kosong, air sejuk |
| Jumlah Air | 6 gelas |

**Section 2 — Sesi / Lampung (Diaper)**

| Field | Example |
|---|---|
| Bilangan Tukar | 4 kali |
| Jenis | Basah / Kotor |
| Catatan | Normal, ada ruam ringan |

**Section 3 — Tidur / Rehat**

| Field | Example |
|---|---|
| Masa Mula Tidur | 12:30 PM |
| Masa Bangun | 1:00 PM |
| Tempoh | 30 minit |
| Kualiti | Nyenyak / Gelisah / Tidak Tidur |

**Section 4 — Mood & Status Kesihatan**

| Field | Options |
|---|---|
| Mood | Gembira / Biasa / Tidak Sihat / Nangis |
| Suhu Badan | Normal / Demam Ringan / Demam |
| Catatan Kesihatan | Free text notes |

**Section 5 — Gambar Hari Ini**

- Upload up to 10 activity photos
- Photos appear in parent portal Aktiviti tab

> **Note**: Rekod Harian data feeds into the Parent PWA Aktiviti page. Parents see meal, sleep, and mood summaries directly.

---

### 4.7 Yuran & Resit (Fees & Receipts)

**URL**: `/dashboard/yuran`  
**Access**: Admin (full), Teacher (view only)

#### Purpose
Track monthly fee collection, record payments, generate receipts, and monitor outstanding fees.

#### Fee Overview Page

**Top stat cards:**
- Jumlah Dikutip bulan ini
- Tertunggak (outstanding)
- Bil Dijana (total invoices created)
- Resit Dikeluarkan

**Main table columns:** Student Name, Class, Month, Amount, Payment Date, Method, Status, Receipt Number

**Status types:**

| Status | Badge Colour | Meaning |
|---|---|---|
| Dibayar | Green | Fee fully paid |
| Tertunggak | Red | Overdue — not paid by due date |
| Dijadual | Blue | Invoice created, payment pending |

**Right panel shows:**
- Pie chart: Paid / Outstanding / Upcoming breakdown
- Per-class collection summary
- List of students with outstanding fees

#### Rekod Bayaran (Record Payment)

**URL**: `/dashboard/yuran/rekod-bayaran`

Step-by-step process:

1. **Pilih Pelajar** — Search for the student by name. The list only shows students with outstanding fees.
2. **Isi Butiran Bayaran**:
   - Kaedah Bayaran: Online Banking / DuitNow / Tunai / Cek / Pindahan Bank
   - Tarikh Bayar: Select the actual payment date (not today if payment was made earlier)
   - Nota: Optional — e.g., "Bayar tunai kepada Cikgu Sarah"
3. Click **Rekod & Jana Resit**
4. System records the payment and generates a receipt number automatically (e.g., RCP-0012)

> **Important**: Payment gateway is not integrated by default. Parents pay via bank transfer and admin records the payment manually here.

#### Filters & Export

- Filter by month, class, status
- Download receipt PDF per student
- Export full collection report (Premium feature)

---

### 4.8 Pengumuman (Announcements)

**URL**: `/dashboard/pengumuman`  
**Access**: Admin (full), Teacher (view only)

#### Purpose
Send official announcements to all parents or specific groups. All announcements appear in the parent portal.

#### Announcement Types

| Type | Badge | Example |
|---|---|---|
| Cuti | Orange | Public holiday, taska closed |
| Aktiviti | Green | Field trip, sports day, program |
| Yuran | Red | Fee reminder, late payment notice |
| Kesihatan | Blue | Health screening, illness alert |
| Umum | Grey | General information |

#### Announcement List Page

**Stats shown:**
- Total announcements this month
- Diterbitkan (published)
- Draf (draft — not yet sent)
- Bacaan (read count)

**Tabs:**
- **Terbaru** — Latest announcements
- **Draf** — Saved drafts
- **Jadual** — Scheduled announcements
- **Tamat** — Expired/archived

**Right panel:**
- Selected announcement full detail
- Read/unread statistics
- Attach PDF or image

#### How to Create an Announcement

1. Click **+ Pengumuman Baru**
2. Fill in:

| Field | Required | Notes |
|---|---|---|
| Tajuk | ✅ | Short, clear title |
| Jenis | ✅ | Cuti / Aktiviti / Yuran / Kesihatan / Umum |
| Kandungan | ✅ | Full announcement body |
| Tarikh Tamat | ❌ | When announcement expires |
| Lampiran | ❌ | PDF or image file |

3. Choose recipients:
   - **Semua Penjaga** — All parents
   - **Per Kelas** — Select specific class
4. Click **Terbitkan** to send immediately, or **Simpan Draf** to save and send later

---

### 4.9 Tetapan (Settings)

**URL**: `/dashboard/tetapan`  
**Access**: Admin only

#### Purpose
Configure all system-wide settings for the taska. Only admins can access this module.

The Settings page has **5 sections** in the left navigation:

---

#### Section A — Profil Taska

Configure the taska's basic identity information.

| Field | Notes |
|---|---|
| Logo Taska | Upload PNG/JPG, max 2MB — appears on receipts and parent portal |
| Nama Taska | Official name — appears everywhere in the system |
| No. Pendaftaran | Taska registration number (JKM or PPZ) |
| No. Telefon | Main contact number |
| E-mel | Admin email address |
| Waktu Buka | Opening time (e.g., 07:30) |
| Waktu Tutup | Closing time (e.g., 18:30) |
| Alamat | Full address — appears on receipts |

> Click **Simpan Perubahan** after editing.

---

#### Section B — Kelas

Manage class configurations.

| Action | How |
|---|---|
| View all classes | See name, age group, teacher, capacity, student count |
| Add new class | Click **+ Tambah Kelas** button |
| Edit class | Click **Edit** next to the class |
| Delete class | Click the trash icon — only if class has no active students |

**Each class has:**
- Nama Kelas (e.g., Kelas Ceria)
- Kumpulan Umur (e.g., 1-2 tahun)
- Kapasiti Maksimum
- Guru Kelas (assigned teacher)

---

#### Section C — Pengguna

Manage admin and teacher accounts.

| Action | How |
|---|---|
| View all users | See name, email, role, status |
| Invite new user | Click **+ Jemput Pengguna** — enter email, they receive an invitation |
| Change role | Edit user — select Admin or Guru |
| Remove user | Click **Buang** — user loses system access immediately |

**Roles available:**
- **Admin** — Full access
- **Guru** — Attendance, parent updates, daily records only

---

#### Section D — Notifikasi

Configure which notifications are active.

| Toggle | What it Does |
|---|---|
| Peringatan yuran tertunggak | Auto-remind parents with overdue fees |
| Notifikasi kehadiran | Alert if student not checked in by a set time |
| Pengumuman baru | Notify when a new announcement is published |
| Laporan mingguan | Weekly summary report every Friday |

> Turn on/off using the toggle switches. Click **Simpan** to save.

---

#### Section E — Keselamatan

| Action | Notes |
|---|---|
| Tukar Kata Laluan | Enter current password, then new password twice |
| Padam Akaun Taska | Permanent deletion — cannot be undone. Contact SwiftApps support first. |

---

## 5. Parent PWA Modules

The Parent PWA is a mobile-optimized web app. Parents access it from their phone browser and can install it like a native app (Add to Home Screen).

**URL**: `[your-taska-url]/parent`

**Navigation**: Bottom navigation bar with 5 tabs — Utama, Kehadiran, Aktiviti, Yuran, Profil

---

### 5.1 Home Dashboard (Utama)

**URL**: `/parent`

The home screen shows everything a parent needs at a glance for today.

| Section | Information |
|---|---|
| **Child Card** | Child name, class, age, today's attendance status |
| **Summary Cards** | Parent Update count, Makan & Minum rating, Tidur duration |
| **Yuran Terkini** | Outstanding balance with progress bar and quick pay prompt |
| **Kehadiran Bulan Ini** | Calendar grid — green = hadir, red = tidak hadir |
| **Parent Update Hari Ini** | Latest 2 updates from teacher with photos |
| **Pengumuman Terkini** | Last 2 announcements |

---

### 5.2 Kehadiran (Attendance History)

**URL**: `/parent/kehadiran`

Parents can view their child's full attendance history.

| Section | Information |
|---|---|
| **Stats** | Total days present, absent, attendance rate % |
| **Calendar** | Monthly view — green (hadir), red (tidak hadir), grey (holiday/future) |
| **Log Kehadiran** | Daily list with check-in time, check-out time, and who picked up |

**Month navigation**: Swipe left/right using the arrow buttons to change month.

---

### 5.3 Aktiviti (Daily Activity Feed)

**URL**: `/parent/aktiviti`

Detailed view of daily teacher updates, meals, sleep, and mood.

| Section | Information |
|---|---|
| **Day Selector** | Navigate between days using arrows |
| **Summary Cards** | Makan / Tidur / Mood / Kesihatan for the day |
| **Rekod Makan** | Breakfast, morning snack, lunch, evening snack, water intake |
| **Rekod Tidur** | Sleep time, duration, quality |
| **Update dari Cikgu** | Full text updates with photos from teacher |

**How to read the feed:**
- Latest updates appear at the top
- Tap on a photo to view full-size
- Tags (#Aktiviti, #Makan etc.) help categorise the update type

---

### 5.4 Yuran (Fees & Receipts)

**URL**: `/parent/yuran`

Parents can view their fee history and download receipts.

| Section | Information |
|---|---|
| **Tertunggak Alert** | Red banner if any outstanding fees — shows amount and month |
| **Stats** | Sudah Bayar total / Tertunggak amount |
| **Filter Tabs** | Semua / Tertunggak / Dibayar |
| **Fee List** | Month, amount, payment date, method, status |
| **Download Resit** | Tap the download button to get a PDF receipt |

> **Parents cannot pay online through the portal** (Standard Package). If there are outstanding fees, they should contact the taska admin directly. The contact button is at the bottom of the page.

---

### 5.5 Profil (Profile)

**URL**: `/parent/profil`

View and manage guardian and child profile information.

| Section | Information |
|---|---|
| **Guardian Card** | Guardian name, relationship, phone, email, address (blue card) |
| **Profil Anak** | Child details: MyKid, DOB, gender, class, allergies |
| **Tetapan Notifikasi** | Manage which notifications you receive |
| **Privasi & Keselamatan** | Change password |
| **Pakej Semasa** | Shows active package (Basic / Standard / Premium) and monthly rate |
| **Log Keluar** | Tap to log out of the portal |

---

## 6. Daily Workflow Guide

### Morning Routine (7:00 AM – 9:00 AM)

```
1. Open Dashboard → check Status Hadir Hari Ini
2. Go to Kehadiran → record student arrivals
   → QR scan (if set up) OR manual check-in
3. Note students who are absent → update status to "Tidak Hadir"
```

### During the Day (9:00 AM – 5:00 PM)

```
4. Rekod Harian → fill in meal, sleep, mood for each child
5. Parent Update → post at least 1 update per child
   → Include a photo where possible
6. Kehadiran → record check-outs as parents arrive
   → Record pickup person name
```

### End of Day (5:00 PM – 6:30 PM)

```
7. Check Kehadiran → confirm all students have checked out
   → Alert parents if child still at taska past closing time
8. Pengumuman → publish any tomorrow's announcements
9. Yuran → record any payments received today
```

### Monthly Tasks (1st week of each month)

```
10. Yuran → generate monthly fee invoices for all students
11. Pengumuman → publish fee reminder announcement
12. Check outstanding fees → follow up with parents
13. Export collection report (if Premium)
```

---

## 7. FAQ

**Q: Parent says they did not receive the portal invitation email.**
> Check spam/junk folder first. If not there, go to Peljaar → Student Details → Penjaga tab → click "Hantar Jemputan" again.

**Q: How do I add a second guardian for a student?**
> Go to the Student Details page → Penjaga tab → click "+ Tambah Penjaga" → fill in details and save.

**Q: Parent wants to change their email address.**
> Admin goes to Penjaga → find guardian → Edit → update email → Save. Then send a new invitation to the new email.

**Q: A student transferred out. How do I update their status?**
> Go to Pelajar → click student row → Edit Profil → change Status from "Aktif" to "Tidak Aktif" → Save.

**Q: How do I fix a wrong attendance entry?**
> Go to Kehadiran → find the entry → click Edit → update the status and time → Save.

**Q: Can parents pay fees directly through the app?**
> Not in the Standard Package. Payment gateway is a Premium add-on. Parents pay via bank transfer and admin records it in Yuran → Rekod Bayaran.

**Q: A teacher left. How do I remove their access?**
> Go to Tetapan → Pengguna → find the teacher → click Buang. Their access is removed immediately.

**Q: How do I back up the data?**
> The system is hosted on cloud servers with automatic daily backups. Contact SwiftApps support for a full data export.

**Q: Can I use the system on a tablet?**
> Yes. The admin dashboard is optimized for laptop/desktop and tablet (landscape). The parent portal is optimized for mobile phone.

**Q: How do I upgrade to Premium?**
> Contact SwiftApps via WhatsApp or email. Premium adds multi-branch, advanced analytics, WhatsApp automation, custom branding, and PDF/Excel export.

---

## Support Contact

**SwiftApps Support**  
WhatsApp: +60 13-209 4577  
Email: support@swiftapps.my  
Hours: Monday – Friday, 9:00 AM – 6:00 PM

---

*SwiftApps Taska — Pengurusan Taska Digital untuk Malaysia*  
*System Guide v1.0 | Standard Package | swiftapps.my*
