# Tokwi MemoryCore — Master Index
*Portable — disimpan dalam external hard disk. Cucuk ke mana-mana PC, terus available.*

> ⚠️ Source of truth ada sini (E:\). C:\Users\Admin\.claude\ adalah PC-specific — jangan rely pada tu.

---

## Sistem & Navigation
- **Tokwi identity + Adam full profile** → `main/main-memory.md` *(stable, jarang berubah)*
- **Session RAM** → `main/current-session.md` *(reset setiap session, max 3 sessions)*
- **Session archive** → `main/session-archive/` *(compressed, older sessions)*
- **Projects** → `projects/project-list.md` + `projects/coding-projects/active/`
- **Knowledge registries** → `insights/` folder

### Rule: Adam facts baru pergi mana?
| Jenis fact | Simpan di |
|------------|-----------|
| Cara Adam bekerja, personality, preferences | `main/main-memory.md` |
| Specific life facts (career, infrastructure, tools) | `memory/user_*.md` ← sini |
| Behavioral corrections / confirmations | `memory/feedback_*.md` |
| Pricing, templates, external data | `memory/reference_*.md` |

---

## Adam Profile
- [user_career_transition.md](user_career_transition.md) — Adam age 35, MSS ~RM200K, 10-year roadmap: lorry business + SwiftApps freelance dual income
- [user_infrastructure.md](user_infrastructure.md) — Hetzner VPS + Coolify + Cloudflare production setup, deployment patterns per stack

## Behavioral Feedback
- [feedback_realistic_advice.md](feedback_realistic_advice.md) — Adam wants grounded realistic advice, no sugarcoating or motivational filler
- [feedback_prisma_docker_setup.md](feedback_prisma_docker_setup.md) — Never copy prisma.config.ts to Docker — triggers @prisma/dev+valibot crash
- [feedback_pwa_iab_detection.md](feedback_pwa_iab_detection.md) — PWA on Facebook WAJIB ada BrowserGate IAB detection. Auto-implement, no need to ask.
- [feedback_pricing_approach.md](feedback_pricing_approach.md) — Bila Adam tanya harga, refer Malaysian market rates. Demo dulu, harga kemudian. Setup boleh waive, monthly jangan turun.

## Reference Data
- [reference_quotation_template.md](reference_quotation_template.md) — SwiftApps quotation: Basic RM2.5K/RM200mo, Standard RM3.5K/RM280mo, Pro RM4.5K/RM350mo
- [reference_malaysia_system_pricing.md](reference_malaysia_system_pricing.md) — Harga pasaran Malaysia: School RM250-350/bln, CRM RM200-400/bln, add-ons, negotiation strategy, WA templates

---

## Knowledge Registries (auto-growing)

| File | Count | Auto-trigger |
|------|-------|-------------|
| `insights/error-registry.md` | 11 errors | Adam share error |
| `insights/anti-patterns.md` | 11 patterns | Bug di-fix |
| `insights/patterns.md` | 9 patterns | Pattern berjaya |
| `insights/cross-project-learnings.md` | 12 lessons | Cross-project insight |

Full learning spec: `enhanced-features/continuous-learning.md`
