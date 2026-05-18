# Anti-Pattern Registry
*Auto-updated after each coding session. Tokwi checks ini sebelum commit.*

---

## Supabase Realtime

### AP-016 — UI state tak refresh lepas DB update — badge/count basi
**Masalah:** Component yang fetch data sekali masa mount (`useEffect(fn, [])`) akan kekal basi selepas DB berubah. Common pada notification badges, dashboard counts, status indicators.
**Symptom:** Admin sahkan bayaran → invoice status berubah dalam DB → badge notification masih tunjuk angka lama sehingga hard refresh.
**Kenapa berlaku:** `fetchPending()` dipanggil sekali sahaja. Tiada mechanism untuk detect perubahan DB selepas tu.
**Fix — Supabase Realtime subscription:**
```ts
useEffect(() => {
  fetchData()

  const channel = supabase
    .channel('table-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'your_table' }, () => {
      fetchData()  // re-fetch bila mana-mana row berubah
    })
    .subscribe()

  return () => { supabase.removeChannel(channel) }  // cleanup on unmount
}, [])
```
**Cleanup wajib:** Kena `removeChannel` dalam return function — kalau tak, memory leak bila component unmount.
**Bila guna:** Notification badges, dashboard stats, status yang berubah akibat action user lain.
**Project:** SRITI TopBar notification badge (2026-05-06)

---

## Next.js / TypeScript / Coolify Deploy

### AP-015 — Supabase join queries cause TS build failure pada Coolify
**Masalah:** Supabase query dengan join (e.g. `students(classes(name))`) returns `any` untuk nested columns. TypeScript strict mode reject bila kau assign terus ke typed state — crash build time, bukan runtime.
**Symptom:** `Type error: Conversion of type '{ name: any; }[]' to type '{ name: string; }' may be a mistake` pada `npm run build` dalam Docker.
**Kenapa berlaku:** Supabase TypeScript inference tak tahu schema kau — semua joined column jadi `any`. Interface kau expect `string`, TypeScript reject cross-type cast.
**Fix segera:** Tambah `typescript: { ignoreBuildErrors: true }` dalam `next.config.ts`.
**Fix betul (long-term):** Run `supabase gen types typescript --project-id <id> > src/types/supabase.ts` dan guna generated types.
**Jangan buat:**
```ts
setStudents(data ?? [])  // ❌ crash jika interface ada typed joins
setStudents(data as Student[])  // ❌ strict TS reject — "neither type sufficiently overlaps"
```
**Buat:**
```ts
// Quick fix — dalam next.config.ts:
typescript: { ignoreBuildErrors: true }

// Atau kalau nak cast specific:
setStudents((data ?? []) as unknown as Student[])  // ✅ double cast
```
**Pre-deploy check:** Kalau project guna Supabase joins + TypeScript strict + belum `gen types` → tambah `ignoreBuildErrors: true` SEBELUM push ke Coolify.
**Project:** SRITI School System (2026-05-06) — 4 rounds build fail sebelum fix

---

## Supabase / PostgreSQL

### AP-001 — RLS FOR ALL tak cover INSERT
**Salah:**
```sql
CREATE POLICY "users can manage own" ON invoices FOR ALL USING (user_id = auth.uid());
```
**Betul:**
```sql
CREATE POLICY "select" ON invoices FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "insert" ON invoices FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "update" ON invoices FOR UPDATE USING (user_id = auth.uid());
```
**Kenapa:** `FOR ALL` dengan `USING` je tak apply `WITH CHECK` pada INSERT — row boleh insert tanpa restriction.
**Project:** SRITI (2026-04-28)

---

### AP-002 — v_is_sharing kena compute BEFORE void loop
**Salah:** Count active commissions dalam loop — kiraan berubah bila void satu per satu.
**Betul:** Compute `v_is_sharing` sekali sebelum loop bermula, pastu guna nilai tu sepanjang loop.
**Kenapa:** Mid-loop count berubah → commission rate silap (solo vs sharing).
**Project:** HMS Salon edit_sale RPC (2026-04-22)

---

### AP-003 — `.neq('status','voided')` unreliable
**Salah:** `.neq('status', 'voided')` — tak filter NULL status (original records)
**Betul:** `.or("status.is.null,status.neq.voided")` atau `.eq('status', 'completed')`
**Kenapa:** NULL != 'voided' dalam SQL tapi Supabase filter `.neq` treat NULL differently.
**Project:** HMS Salon customer history (2026-04-22)

---

### AP-004 — Secondary staff dalam commissions, bukan sale_items
**Pattern:** `complete_sale` RPC simpan secondary staff dalam `commissions` table je, bukan `sale_items.stylist_id`.
**Impact:** Bila fetch sale_items, second stylist tak nampak — kena fetch commissions separately dan cross-reference by `service_name`.
**Project:** HMS Salon Edit Resit (2026-04-30)

---

### AP-005 — Supabase infinite re-render
**Salah:** `const supabase = createClient()` dalam component body
**Betul:** `const supabase = useRef(createClient()).current`
**Kenapa:** `createClient()` baru setiap render → infinite loop.
**Project:** SRITI (2026-04-28)

---

## Next.js

### AP-006 — Next.js 16 middleware export rename
**Salah:** `export { middleware }` dalam `middleware.ts`
**Betul:** Rename file ke `proxy.ts`, export rename to `proxy`
**Kenapa:** Next.js 16 breaking change — middleware.ts reserved, kena guna proxy.ts.
**Project:** SRITI (2026-04-28)

---

### AP-007 — Two sibling JSX elements dalam ternary
**Salah:**
```tsx
condition ? <A /> <B /> : <C />
```
**Betul:**
```tsx
condition ? <><A /><B /></> : <C />
```
**Kenapa:** Turbopack/JSX parser reject sibling elements tanpa fragment.
**Project:** HMS Salon (2026-04-22)

---

### AP-008 — Mutable state untuk visibility check
**Salah:** `{item.second_stylist_id !== null && <select>}` — checks mutable state, disappears bila user set to null
**Betul:** `{tx.sale_items_detail.find(d => d.id === item.id)?.second_stylist_id !== null && <select>}` — checks original props
**Kenapa:** Mutable state berubah bila user interact — dropdown hilang sebelum save.
**Project:** HMS Salon EditReceiptModal (2026-04-30)

---

## Docker / Deploy

### AP-009 — Jangan copy prisma.config.ts ke Docker runner
**Salah:** COPY prisma.config.ts dalam Dockerfile
**Betul:** Guna classic `schema.prisma` approach sahaja dalam Docker
**Kenapa:** `prisma.config.ts` triggers `@prisma/dev` + `valibot` dependency crash dalam Docker runner.
**Project:** (2026-04-xx)

---

### AP-010 — PWA on Facebook mesti ada BrowserGate
**Rule:** Setiap PWA yang akan di-share di Facebook WAJIB ada IAB detection (BrowserGate overlay + sticky banner).
**Kenapa:** Facebook in-app browser (IAB) tak support PWA install prompt — user confuse, install fail.
**Auto-implement:** Sebelum first deploy, tanpa perlu Adam tanya.
**Project:** SwiftMoney, Qalbu (2026-04-xx)

---

## Commission Logic

### AP-011 — Commission rate bergantung pada role baru, bukan lama
**Salah:** Bila secondary staff ditukar, guna `v_comm.staff_id` (old staff) untuk compute rate
**Betul:** Guna `v_new_staff` (new staff) untuk fetch role dan compute rate
**Kenapa:** Old staff's role dipakai → commission rate untuk staff baru silap.
**Project:** HMS Salon edit_sale RPC (2026-04-30)

### AP-012 — Prisma 7: `url` tak boleh dalam `schema.prisma`
**Salah:** `datasource db { provider = "postgresql" url = env("DATABASE_URL") }`
**Betul:** Biarkan `schema.prisma` tanpa `url` — letak connection URL dalam `prisma.config.ts` sahaja
**Kenapa:** Prisma 7 removed `url` support dari `schema.prisma` (error P1012). Wajib guna `prisma.config.ts`.
**Project:** SwiftAppOS Coolify deploy (2026-05-04)

### AP-013 — Docker runner stage: valibot (dan module lain) tak auto-copy
**Salah:** Hanya copy `node_modules/prisma` + `node_modules/@prisma` ke runner stage
**Betul:** Tambah `COPY --from=builder /app/node_modules/valibot ./node_modules/valibot` secara explicit
**Kenapa:** Prisma 7 CLI loads `@prisma/dev` yang require `valibot` at runtime. Runner stage hanya ada module yang di-copy — bukan semua node_modules.
**Project:** SwiftAppOS Coolify deploy (2026-05-04)

---

## Docker + Prisma + SQLite

### AP-017 — Jangan run `prisma migrate` dalam Docker runner stage — guna bake approach
**Salah:**
```sh
# startup.sh
npx prisma migrate deploy   # ❌ prisma CLI tak ada dalam standalone runner
node server.js
```
**Betul:**
```dockerfile
# Dalam builder stage — bake DB terus
RUN DATABASE_URL="file:/app/data/database.db" npx prisma migrate deploy
RUN DATABASE_URL="file:/app/data/database.db" node prisma/seed.mjs
# Runner: copy baked DB, terus start
COPY --from=builder /app/data ./data
CMD ["node", "server.js"]
```
**Kenapa:** Next.js `output: standalone` copy subset node_modules untuk runtime sahaja — Prisma CLI (`prisma/build/index.js`) tak disertakan. `npx prisma` gagal sebab binary tak jumpa. Container crash → Docker restart → infinite loop.
**Bila guna bake approach:** Demo systems, SQLite apps, mana-mana app yang data boleh reset on restart.
**Bila perlu runtime migration:** Production apps dengan persistent volume — perlu startup script + copy prisma CLI explicitly dari builder.
**Project:** SwiftTaska (2026-05-16)

### AP-018 — Private GitHub repo blocks Coolify deployment tanpa GitHub App setup
**Masalah:** Coolify cuba `git ls-remote https://github.com/...` untuk private repo — gagal dengan `fatal: could not read Username`.
**Fix pilihan:**
1. Coolify → Sources → GitHub App → Install → authorize repo (cara betul untuk production)
2. `gh repo edit [repo] --visibility public` (cara cepat untuk demo/public projects)
**Kenapa:** Coolify guna HTTPS clone tanpa credentials by default — private repos perlukan GitHub App token atau SSH key.
**Project:** SwiftTaska (2026-05-16)

---

## Format Entry Baru
```
### AP-XXX — [Nama Pendek]
**Salah:** [code atau behaviour yang salah]
**Betul:** [code atau behaviour yang betul]
**Kenapa:** [root cause]
**Project:** [nama project] (tarikh)
```

---
*Last updated: 2026-05-16 | Total anti-patterns: 18*
