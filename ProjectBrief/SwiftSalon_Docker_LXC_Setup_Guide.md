# 🐳 SwiftSalon Docker Setup Guide - Proxmox LXC

**Complete step-by-step guide for deploying SwiftSalon Muslimah using Docker containers in Proxmox LXC environment**

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [LXC Container Setup](#lxc-container-setup)
3. [Docker Installation](#docker-installation)
4. [SwiftSalon Docker Configuration](#swiftsalon-docker-configuration)
5. [Database Setup](#database-setup)
6. [Application Deployment](#application-deployment)
7. [Network Configuration](#network-configuration)
8. [Maintenance & Monitoring](#maintenance--monitoring)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Prerequisites

### Proxmox VE Requirements
- Proxmox VE 7.0 or higher
- Sufficient resources: 8GB RAM, 50GB storage minimum
- Internet connectivity for downloading images
- SSH access to Proxmox host

### Knowledge Requirements
- Basic Linux command line
- Docker fundamentals
- Proxmox LXC container management

---

## 🏗️ LXC Container Setup

### Step 1: Create LXC Container

**Run on Proxmox host:**

```bash
# Create privileged LXC container for Docker support
pct create 300 local:vztmpl/ubuntu-22.04-standard_22.04-1_amd64.tar.zst \
  --hostname swiftsalon-docker \
  --memory 6144 \
  --cores 4 \
  --rootfs local-lvm:40 \
  --net0 name=eth0,bridge=vmbr0,ip=dhcp \
  --features nesting=1,keyctl=1 \
  --privileged 1 \
  --onboot 1

# Start the container
pct start 300

# Enter the container
pct enter 300
```

### Step 2: Container Initial Configuration

**Inside LXC container:**

```bash
# Update system packages
apt update && apt upgrade -y

# Install essential tools
apt install -y \
  curl \
  wget \
  git \
  unzip \
  nano \
  htop \
  net-tools \
  software-properties-common \
  apt-transport-https \
  ca-certificates \
  gnupg \
  lsb-release

# Create application user
useradd -m -s /bin/bash swiftsalon
usermod -aG sudo swiftsalon
echo "swiftsalon ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
```

### Step 3: Configure Container for Docker

```bash
# Enable cgroup v2 (required for modern Docker)
echo 'GRUB_CMDLINE_LINUX="systemd.unified_cgroup_hierarchy=1"' >> /etc/default/grub

# Configure systemd for containers
mkdir -p /etc/systemd/system/systemd-logind.service.d/
cat > /etc/systemd/system/systemd-logind.service.d/override.conf << 'EOF'
[Service]
KillMode=mixed
KillSignal=SIGTERM
TimeoutStopSec=30s
EOF

# Restart container to apply changes
exit  # Exit to Proxmox host
pct reboot 300
sleep 30
pct enter 300
```

---

## 🐳 Docker Installation

### Step 1: Install Docker Engine

```bash
# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update and install Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start and enable Docker service
systemctl start docker
systemctl enable docker

# Add user to docker group
usermod -aG docker swiftsalon

# Verify Docker installation
docker --version
docker compose version
```

### Step 2: Configure Docker for LXC

```bash
# Configure Docker daemon for LXC
cat > /etc/docker/daemon.json << 'EOF'
{
  "storage-driver": "overlay2",
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "live-restore": true,
  "userland-proxy": false,
  "experimental": false
}
EOF

# Restart Docker service
systemctl restart docker

# Test Docker installation
docker run hello-world
```

---

## 🚀 SwiftSalon Docker Configuration

### Step 1: Create Project Structure

```bash
# Switch to application user
su - swiftsalon

# Create project directory
mkdir -p ~/swiftsalon-docker
cd ~/swiftsalon-docker

# Create directory structure
mkdir -p {app,database/data,nginx,scripts,logs}
```

### Step 2: Create Docker Compose Configuration

```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: swiftsalon_db
    restart: unless-stopped
    environment:
      POSTGRES_DB: swiftsalon_db
      POSTGRES_USER: swiftsalon_user
      POSTGRES_PASSWORD: SwiftSalon2024!
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - ./database/data:/var/lib/postgresql/data/pgdata
      - ./database/init:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"
    networks:
      - swiftsalon_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U swiftsalon_user -d swiftsalon_db"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis for Caching
  redis:
    image: redis:7-alpine
    container_name: swiftsalon_redis
    restart: unless-stopped
    command: redis-server --appendonly yes --requirepass SwiftSalon2024!
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    networks:
      - swiftsalon_network
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  # SwiftSalon Application
  app:
    build:
      context: ./app
      dockerfile: Dockerfile
    container_name: swiftsalon_app
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://swiftsalon_user:SwiftSalon2024!@postgres:5432/swiftsalon_db
      - REDIS_URL=redis://:SwiftSalon2024!@redis:6379
      - NEXTAUTH_SECRET=your-super-secret-jwt-secret-here
      - NEXTAUTH_URL=http://localhost:3000
      - NEXT_PUBLIC_APP_URL=http://localhost:3000
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - swiftsalon_network
    volumes:
      - ./logs:/app/logs
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: swiftsalon_nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - ./logs/nginx:/var/log/nginx
    depends_on:
      - app
    networks:
      - swiftsalon_network

volumes:
  redis_data:
    driver: local

networks:
  swiftsalon_network:
    driver: bridge
EOF
```

### Step 3: Create Application Dockerfile

```bash
cat > app/Dockerfile << 'EOF'
# Multi-stage build for production optimization
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npm install -g pnpm
RUN pnpm prisma generate

# Build application
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma files
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
EOF
```

### Step 4: Create Nginx Configuration

```bash
cat > nginx/nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    server {
        listen 80;
        server_name _;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

        # Gzip compression
        gzip on;
        gzip_vary on;
        gzip_min_length 1024;
        gzip_proxied any;
        gzip_comp_level 6;
        gzip_types
            text/plain
            text/css
            text/xml
            text/javascript
            application/json
            application/javascript
            application/xml+rss
            application/atom+xml
            image/svg+xml;

        # Proxy to Next.js app
        location / {
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Static files caching
        location /_next/static {
            proxy_pass http://app;
            add_header Cache-Control "public, max-age=31536000, immutable";
        }

        # Favicon
        location = /favicon.ico {
            proxy_pass http://app;
            add_header Cache-Control "public, max-age=86400";
        }
    }
}
EOF
```

---

## 🗄️ Database Setup

### Step 1: Create Database Initialization Script

```bash
cat > database/init/01-init.sql << 'EOF'
-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Set timezone
SET timezone = 'Asia/Kuala_Lumpur';

-- Create database (if not exists)
SELECT 'CREATE DATABASE swiftsalon_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'swiftsalon_db')\gexec
EOF
```

### Step 2: Create Environment File

```bash
cat > .env << 'EOF'
# Database Configuration
DATABASE_URL="postgresql://swiftsalon_user:SwiftSalon2024!@postgres:5432/swiftsalon_db"
POSTGRES_DB=swiftsalon_db
POSTGRES_USER=swiftsalon_user
POSTGRES_PASSWORD=SwiftSalon2024!

# Redis Configuration
REDIS_URL="redis://:SwiftSalon2024!@redis:6379"

# Application Configuration
NODE_ENV=production
NEXTAUTH_SECRET=your-super-secret-jwt-secret-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# WhatsApp API (Optional)
NEXT_PUBLIC_WHATSAPP_API_URL=https://api.whatsapp.com/send

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EOF
```

---

## 🚀 Application Deployment

### Step 1: Prepare Application Code

```bash
# Navigate to app directory
cd ~/swiftsalon-docker/app

# Initialize Next.js application
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Install SwiftSalon dependencies
npm install @prisma/client prisma
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-calendar
npm install lucide-react date-fns clsx tailwind-merge
npm install zustand @tanstack/react-query
npm install react-hook-form @hookform/resolvers zod
npm install qrcode html2canvas jspdf
npm install redis
npm install @types/qrcode -D

# Create Prisma schema (copy from previous setup)
mkdir -p prisma
# ... (Use the Prisma schema from previous sections)

# Configure Next.js for standalone output
cat >> next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  }
}

module.exports = nextConfig
EOF
```

### Step 2: Create Health Check Endpoint

```bash
mkdir -p src/app/api/health
cat > src/app/api/health/route.ts << 'EOF'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    )
  }
}
EOF
```

### Step 3: Deploy with Docker Compose

```bash
# Navigate back to project root
cd ~/swiftsalon-docker

# Build and start all services
docker compose up -d --build

# Check service status
docker compose ps

# View logs
docker compose logs -f app
```

---

## 🌐 Network Configuration

### Step 1: Configure LXC Network Access

**From Proxmox host (if needed):**

```bash
# Allow access from outside Proxmox (optional)
# Get LXC IP address
LXC_IP=$(pct exec 300 -- ip route get 1 | awk '{print $7; exit}')

# Create port forwarding rules (optional)
iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to $LXC_IP:80
iptables -t nat -A PREROUTING -p tcp --dport 8443 -j DNAT --to $LXC_IP:443
iptables -t nat -A POSTROUTING -s $LXC_IP/32 -j MASQUERADE

# Save iptables rules (varies by distro)
iptables-save > /etc/iptables/rules.v4
```

### Step 2: SSL Configuration (Optional)

```bash
# Inside LXC container, create self-signed certificate
mkdir -p ~/swiftsalon-docker/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ~/swiftsalon-docker/nginx/ssl/swiftsalon.key \
  -out ~/swiftsalon-docker/nginx/ssl/swiftsalon.crt \
  -subj "/C=MY/ST=KualaLumpur/L=KualaLumpur/O=SwiftSalon/CN=swiftsalon.local"

# Update nginx.conf for SSL (add to existing config)
```

---

## 🔧 Maintenance & Monitoring

### Step 1: Create Management Scripts

```bash
cat > scripts/manage.sh << 'EOF'
#!/bin/bash

case "$1" in
  start)
    echo "Starting SwiftSalon services..."
    docker compose up -d
    ;;
  stop)
    echo "Stopping SwiftSalon services..."
    docker compose down
    ;;
  restart)
    echo "Restarting SwiftSalon services..."
    docker compose restart
    ;;
  logs)
    docker compose logs -f ${2:-app}
    ;;
  status)
    docker compose ps
    ;;
  backup)
    echo "Creating database backup..."
    docker compose exec postgres pg_dump -U swiftsalon_user swiftsalon_db > backups/backup_$(date +%Y%m%d_%H%M%S).sql
    ;;
  restore)
    if [ -z "$2" ]; then
      echo "Usage: $0 restore <backup_file>"
      exit 1
    fi
    echo "Restoring database from $2..."
    docker compose exec -T postgres psql -U swiftsalon_user -d swiftsalon_db < "$2"
    ;;
  update)
    echo "Updating SwiftSalon application..."
    docker compose down
    docker compose pull
    docker compose up -d --build
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|logs|status|backup|restore|update}"
    exit 1
    ;;
esac
EOF

chmod +x scripts/manage.sh
```

### Step 2: Create Backup Directory and Cron Job

```bash
# Create backup directory
mkdir -p ~/swiftsalon-docker/backups

# Add automated backup (crontab)
crontab -e

# Add this line for daily backups at 2 AM:
# 0 2 * * * cd /home/swiftsalon/swiftsalon-docker && ./scripts/manage.sh backup
```

### Step 3: Monitoring Setup

```bash
cat > scripts/monitor.sh << 'EOF'
#!/bin/bash

echo "=== SwiftSalon System Status ==="
echo "Date: $(date)"
echo

echo "=== Docker Services ==="
docker compose ps
echo

echo "=== System Resources ==="
echo "Memory Usage:"
free -h
echo
echo "Disk Usage:"
df -h /home/swiftsalon/swiftsalon-docker
echo

echo "=== Container Health ==="
docker compose exec app curl -s http://localhost:3000/api/health | jq '.'
echo

echo "=== Database Connection ==="
docker compose exec postgres pg_isready -U swiftsalon_user -d swiftsalon_db
echo

echo "=== Recent Logs (Last 10 lines) ==="
docker compose logs --tail=10 app
EOF

chmod +x scripts/monitor.sh
```

---

## 🔍 Troubleshooting

### Common Issues and Solutions

#### 1. Docker Service Won't Start in LXC

```bash
# Check if container is privileged
pct config 300 | grep privileged

# If not privileged, stop and modify:
pct stop 300
pct set 300 -privileged 1
pct start 300
```

#### 2. Database Connection Issues

```bash
# Check if PostgreSQL is running
docker compose logs postgres

# Test database connection
docker compose exec postgres psql -U swiftsalon_user -d swiftsalon_db -c "SELECT 1;"
```

#### 3. Application Won't Build

```bash
# Check build logs
docker compose logs app

# Rebuild without cache
docker compose build --no-cache app
```

#### 4. Network Connectivity Issues

```bash
# Check container networking
docker network ls
docker compose exec app nslookup postgres

# Test internal connectivity
docker compose exec app ping postgres
```

#### 5. Memory/Performance Issues

```bash
# Check container resource usage
docker stats

# Increase LXC memory if needed:
pct set 300 -memory 8192
pct reboot 300
```

### Logs Location

- **Application Logs**: `~/swiftsalon-docker/logs/`
- **Docker Logs**: `docker compose logs <service>`
- **Nginx Logs**: `~/swiftsalon-docker/logs/nginx/`
- **System Logs**: `/var/log/` in LXC container

---

## 📊 Final Verification

### Access Points

After successful deployment:

- **Application**: `http://[LXC-IP]:80` or `http://[LXC-IP]:3000`
- **Database**: `[LXC-IP]:5432` (internal access only)
- **Redis**: `[LXC-IP]:6379` (internal access only)

### Test Commands

```bash
# Test all services
./scripts/monitor.sh

# Test application health
curl http://localhost/api/health

# Test database
docker compose exec postgres psql -U swiftsalon_user -d swiftsalon_db -c "\dt"
```

---

## 🎯 Production Considerations

### Security
- Change all default passwords
- Use proper SSL certificates
- Configure firewall rules
- Regular security updates
- Database access restrictions

### Performance
- Configure database connection pooling
- Set up Redis caching
- Optimize Docker images
- Monitor resource usage
- Set up proper logging

### Backup & Recovery
- Automated daily backups
- Test restore procedures
- Off-site backup storage
- Database replication (optional)

---

**✅ SwiftSalon Docker deployment in Proxmox LXC is now complete with full containerization, database persistence, and production-ready configuration!**