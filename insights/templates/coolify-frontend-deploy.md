# Coolify Frontend Deploy Template (React + Vite)

**Use this for any new React/Vite frontend deploying to Coolify.**
Copy 3 files into `app/` folder before first push.

---

## Rules (Learned from Qalbu deploy — 2026-04-20)

| Rule | Why |
|------|-----|
| Use `npm install` NOT `npm ci` in Dockerfile | Windows lock file missing Linux `@emnapi` platform packages — `npm ci` will always fail on Coolify |
| Must have `.dockerignore` | Without it, local `node_modules` gets sent to Docker context and OVERWRITES the fresh `npm install` in builder stage |
| Remove `puppeteer`/`sharp`/`playwright` from `package.json` | Native packages — Windows lock file won't include Linux variants, causes `@emnapi` crash |
| Keep screenshot/icon tools in separate local script | Never commit native tool devDeps to the deploy repo |
| Double-check GitHub remote URL before push | Pushing to wrong repo wastes time and corrupts unrelated repos |

---

## File 1 — Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## File 2 — docker/nginx.conf

### With API proxy (frontend + separate backend):
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Proxy /api to backend — update URL to match project
    location /api {
        proxy_pass https://YOUR-API-DOMAIN.swiftapps.my;
        proxy_set_header Host YOUR-API-DOMAIN.swiftapps.my;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_ssl_server_name on;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Service worker — no cache
    location = /sw.js {
        expires off;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

### Without API proxy (static frontend only):
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location = /sw.js {
        expires off;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

---

## File 3 — .dockerignore

```
node_modules
dist
screenshot
.git
*.md
```

---

## Coolify Setup (per project)

| Setting | Value |
|---------|-------|
| Source | GitHub → `adamsalehuddin91/[repo]` |
| Branch | `main` |
| Build Pack | `Dockerfile` |
| Root Directory | `app` (if monorepo with api/ + app/) |
| Port | `80` |
| Domain | `[project].swiftapps.my` |
| HTTPS | Enable (Let's Encrypt auto) |
| Env vars | Usually none needed — nginx handles proxy |

---

## Pre-Deploy Quick Check

```bash
ls app/.dockerignore          # exists?
grep "npm install" app/Dockerfile   # NOT npm ci?
grep -E "puppeteer|sharp" app/package.json  # empty?
git remote -v                 # correct repo URL?
```

All 4 pass → push → Coolify auto-deploy.

---

*Created: 2026-04-20 | Source: Qalbu frontend deploy session*
