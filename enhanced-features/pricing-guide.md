# Pricing Guide Runbook

**Trigger**: "price check", "berapa charge", "quote client"
**Purpose**: Help Adam quote system pricing based on Malaysian market rates and past client conversations

---

## Steps

### 1. Load pricing reference
Read `memory/reference_malaysia_system_pricing.md` (auto-memory) for:
- Malaysian market rates by system type
- Past client context (SRITI, HMS, Messy Playgroup, etc.)
- Add-on pricing
- Negotiation strategy

### 2. Ask 3 qualifying questions (if not already answered)
1. **Jenis system apa?** — CRM, school management, POS, booking, custom?
2. **Berapa ramai user?** — Solo, small team (2-5), medium (10+)?
3. **Ada integration tak?** — WhatsApp, payment gateway, existing system?

### 3. Output quote
Based on answers, output:

```
## Quote: [System Type] untuk [Client/Segment]

| | Harga |
|--|-------|
| Setup | RM X |
| Monthly | RM X/bln |
| [Add-on jika ada] | + RM X/bln |

Termasuk: hosting, domain, maintenance, support
Timeline build: X minggu

Negotiation notes:
- Setup boleh waive kalau perlu close deal
- Monthly jangan turun
- Demo dulu, harga kemudian
```

### 4. WA reply template (jika diminta)
Generate draft WA reply menggunakan template dari `reference_malaysia_system_pricing.md`

---

## Pricing Baseline (Malaysian Market)

| System | Setup | Monthly |
|--------|-------|---------|
| Basic CRUD app | RM 2,500 | RM 200 |
| Standard (multi-module) | RM 3,500 | RM 280 |
| Pro (complex + integrations) | RM 4,500+ | RM 350+ |
| School Management | RM 1,500–3,000 | RM 250–350 |
| CRM (Basic) | RM 3,500 | RM 200 |
| CRM (Pro + WA) | RM 8,000 | RM 400 |
| Small local biz | RM 2,500 | RM 180–200 |

## Key Rules
- Infra cost per project: ~RM 145/bln — margin target RM 150-200/bln minimum
- Setup fee = negotiable. Monthly = tidak
- Segment kerajaan/NGO/sekolah agama: budget terhad, keputusan melalui AJK
- First client dalam segment baru: prioritize portfolio + testimoni

---
**Version**: v1.0 | **Created**: 2026-04-30
