---
name: Prisma Docker deployment — avoid prisma.config.ts in runner
description: Lesson from SwiftApp OS deploy — Prisma v7 config file causes dep chain crash in minimal Docker runner
type: feedback
---

Avoid copying `prisma.config.ts` into the Docker runner stage for Next.js + Prisma projects.

**Why:** Prisma v7's `prisma.config.ts` is a TypeScript config loader. When present, the Prisma CLI loads `@prisma/dev` at runtime, which requires `valibot` — neither of which are in a minimal Alpine runner. This causes a crash loop on every container start. Adam noted this was unnecessarily complex compared to LorryTech's simpler Laravel setup.

**How to apply:**
- In Dockerfile runner stage: copy `prisma/` (schema + migrations) but NOT `prisma.config.ts`
- Copy `node_modules/prisma` + `node_modules/@prisma` to runner
- CMD: `node node_modules/prisma/build/index.js migrate deploy && node server.js`
- For new Next.js + Prisma projects: use classic `schema.prisma` approach, skip `prisma.config.ts`
- Adam's preference: keep DB/deploy setup as simple as LorryTech (Laravel) — no exotic configs
