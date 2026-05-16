---
name: Adam's VPS Infrastructure
description: Adam's production infrastructure — Hetzner VPS + Coolify + Cloudflare, used for deploying all SwiftApps projects
type: reference
---

Adam has a self-hosted production setup:
- **VPS**: Hetzner
- **PaaS**: Coolify (self-hosted, manages Docker deployments)
- **DNS/CDN**: Cloudflare (proxied, Full Strict SSL)
- **Domain**: swiftapps.my (subdomains per app)

**Deployment patterns used:**
- Next.js apps: Dockerfile with standalone mode (e.g. SwiftApps Landing Page)
- Laravel apps: Dockerfile with PHP-FPM + Nginx + Supervisor (e.g. SwiftMoney)
- PokSystem: Railway with Nixpacks (PostgreSQL)
- HMS Salon: Vercel + Supabase

**How to apply:** When deploying new projects, default to Coolify + Docker unless Adam specifies otherwise. Always include persistent volume config for databases and uploads.
