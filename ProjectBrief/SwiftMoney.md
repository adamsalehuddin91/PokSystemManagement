Proposal Projek: SwiftMoney PWA (Private MVP)

1. Ringkasan Eksekutif

SwiftMoney adalah aplikasi pengurusan aliran tunai domestik yang direka khusus untuk menggantikan rekod manual dlm WhatsApp. Ia membolehkan pasangan (Abg & Ayg) menguruskan bajet, komitmen bulanan, dan pengurangan hutang secara real-time dengan seni bina yang SaaS-ready.

2. Objektif Teknikal

Shared State: Menggunakan Laravel Reverb (WebSockets) untuk penyelarasan status bayaran segera.

PWA Experience: Optimal untuk mobile (Add to Home Screen) dengan keupayaan offline caching melalui Vite PWA.

Architectural Integrity: Menggunakan Service Pattern di backend untuk memisahkan logic perniagaan daripada Controller.

3. Struktur Data (MySQL Schema)

Sebagai Senior Architect, skema ini direka untuk menyokong Multi-tenancy melalui family_id.

A. Pengurusan Organisasi

families: id, name, created_at

users: id, family_id, name, email, password, role (admin/member)

B. Pengurusan Pendapatan (Income)

incomes:

id, family_id, user_id

source (string: e.g., 'Gaji', 'Hasil Felda')

amount (decimal 12,2)

month_year (string: '03-2026')

is_recurring (boolean)

C. Pengurusan Bil & Komitmen (Expenses)

bill_templates: (Master data untuk auto-generate setiap bulan)

id, family_id, category, title, default_amount, assigned_to (Abg/Ayg)

bill_records: (Instance bulanan)

id, bill_template_id, month_year, actual_amount, is_paid, paid_at, receipt_path

D. Pengurusan Hutang (Debt Amortization)

debts: (Untuk hutang jangka panjang: CC, Gelang, Kakak)

id, family_id, title, total_amount, current_balance, type (fixed/flexible)

debt_payments: (Audit trail bayaran hutang)

id, debt_id, bill_record_id (nullable), amount_paid, payment_date

4. Business Rules & Logic

Rule 1: The 25th Auto-Clone

Setiap 25hb, satu Scheduled Job akan menarik data dari bill_templates dan mencipta rekod baru dlm bill_records untuk kitaran bulan depan.

Rule 2: Debt Offset Logic

Apabila satu bill_record yang berkaitan dengan debt_id ditanda sebagai is_paid, sistem secara automatik akan:

Menambah rekod dlm debt_payments.

Melakukan decrement() pada debts.current_balance.
Wajib dibungkus dlm DB Transaction.

Rule 3: Selective Masking (Privacy Mode)

Data Rahsia: incomes.amount, totals.net_balance, debts.total_amount.

Data Terbuka: Semua bill_records (Expenses) dan baki unpaid_bills.

UI akan menggunakan localStorage untuk mengekalkan status privacy_mode (true/false) pada peranti.

5. API / Inertia Payload Structure

Contoh JSON yang akan di-pass ke Dashboard React:

{
  "user": { "name": "Abg", "family_id": 1 },
  "summary": {
    "net_balance": 6699.55,
    "total_income": 10950.00,
    "total_unpaid": 4250.45,
    "progress_pct": 65
  },
  "categorized_bills": {
    "Sekolah": [ ... ],
    "Rumah": [ ... ]
  },
  "active_debts": [
    {
      "title": "Hutang Kakak",
      "remaining": 3540.00,
      "total": 5140.00,
      "pct": 31
    }
  ]
}


6. Roadmap Projek

Sprint 1 (Backend Core): Migrations, Auth (Breeze), Service Classes (Income/Bill/Debt).

Sprint 2 (UI/PWA): Dashboard PWA, Privacy Toggle, Modal Add Income/Bills.

Sprint 3 (Debt Module): Logic Flexible Debt (Gelang/Kakak) & History Log.

Sprint 4 (Real-time): Laravel Reverb integration & Receipt Upload.

Status: Ready for Development
Architect: [Your Name/Senior Architect]