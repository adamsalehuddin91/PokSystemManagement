# Pattern Registry — Proven Solutions
*Counterpart kepada anti-patterns.md — ini yang BERJAYA dan patut diulang*

---

## Next.js / TypeScript Deploy

### P-011 — Next.js + Supabase: ignoreBuildErrors untuk untyped schema
**Bila guna:** Next.js project guna Supabase joins tapi belum setup `supabase gen types`. Build akan fail dengan TS type mismatch pada Coolify walaupun app berfungsi betul.
**Template — tambah dalam `next.config.ts` sebelum first Coolify deploy:**
```ts
const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,  // Supabase joins return `any` without typed schema
  },
};
```
**Kenapa selamat:** Hanya skip TypeScript check masa build. Runtime logic, Supabase queries, dan RLS semua masih berfungsi. Tak ada functional regression.
**Upgrade path:** Bila ready, run `supabase gen types typescript --project-id <id> > src/types/supabase.ts` dan remove `ignoreBuildErrors`.
**Pre-deploy checklist item:** Next.js + Supabase project → check `next.config.ts` ada `ignoreBuildErrors: true` ATAU `supabase.ts` generated types wujud.
**Project:** SRITI (2026-05-06), applicable to semua Supabase + Next.js projects

---

## Supabase / PostgreSQL

### P-001 — SECURITY DEFINER RPC untuk bypass RLS
**Pattern:** Bila client-side query kena block RLS, buat RPC dengan `SECURITY DEFINER`.
**Bila guna:** Admin operations, cross-table updates, complex atomic transactions.
**Template:**
```sql
CREATE OR REPLACE FUNCTION public.do_something(p_user_id UUID)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- 3-layer security check
  IF auth.uid() != p_user_id THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = p_user_id AND role IN ('admin','auditor'))
    THEN RAISE EXCEPTION 'Insufficient role'; END IF;
  -- logic here
END;
$$;
```
**Project:** HMS Salon edit_sale, SRITI invite-parent

---

### P-002 — Commission pre-compute sebelum loop
**Pattern:** Compute shared values (count, flags) ONCE sebelum loop — jangan compute dalam loop.
**Bila guna:** Bila loop modify data yang sama yang dipakai untuk condition dalam loop.
**Project:** HMS Salon v_is_sharing (2026-04-22, 2026-04-30)

---

### P-003 — useRef untuk Supabase client
**Pattern:** `const supabase = useRef(createClient()).current`
**Bila guna:** SELALU dalam React components yang guna Supabase.
**Project:** SRITI, HMS Salon

---

### P-004 — commissionSecondaryMap untuk secondary staff
**Pattern:** Bila secondary staff disimpan dalam table lain (commissions), fetch separately dan bina lookup map:
```typescript
const map: Record<string, Record<string, string | null>> = {}
// map[saleId][saleItemId] = secondaryStaffId
```
**Project:** HMS Salon fetchTransactions (2026-04-30)

---

### P-005 — Original props untuk visibility gate
**Pattern:** Untuk UI element yang visibility bergantung pada original data (bukan user input), guna props — bukan state.
```tsx
// ✅ Check original data
{tx.sale_items_detail.find(d => d.id === item.id)?.field !== null && <Element />}
// ❌ Check mutable state
{item.field !== null && <Element />}
```
**Project:** HMS Salon EditReceiptModal (2026-04-30)

---

## Next.js / React

### P-006 — Parallel tool calls untuk independent data
**Pattern:** Fetch independent data dalam parallel, bukan sequential.
```typescript
const [dataA, dataB] = await Promise.all([fetchA(), fetchB()])
```
**Bila guna:** Dashboard stats, multi-table fetches yang tak dependent.

---

### P-007 — useCallback untuk fetch functions
**Pattern:** Wrap fetch functions dalam `useCallback` supaya boleh di-pass sebagai dependency dan dipanggil dari child components.
**Project:** HMS Salon fetchTransactions (2026-04-22)

---

## Stack Patterns

### P-008 — ToyyibPay untuk payment gateway Malaysia
**Pattern:** Segment sekolah agama, NGO, komuniti → ToyyibPay (bukan Stripe/Billplz).
**Sebab:** Familiar dengan segment, support FPX, RM1+1% fee, API simple.

---

### P-009 — Subtree push untuk monorepo
**Pattern:** Untuk push subfolder ke repo berasingan:
```bash
git subtree push --prefix="SwiftApp Dev/[project]" [remote] main
```
**Project:** SRITI ke SritiManagementSystem repo (2026-04-29)

---

## Format Entry Baru
```
### P-XXX — [Nama Pattern]
**Pattern:** [description]
**Bila guna:** [context/trigger]
**Template:** [code jika ada]
**Project:** [nama project] (tarikh)
```

---
*Last updated: 2026-04-30 | Total patterns: 9*
