# 🐙 SwiftSalon GitHub Deployment - LXC Docker

**Deploy SwiftSalon directly from your GitHub repository with easy management and updates**

---

## 🎯 GitHub Repository Approach Benefits

✅ **Easy Management**: Update code via git push/pull
✅ **Version Control**: Full development history
✅ **Team Collaboration**: Multiple developers can contribute
✅ **CI/CD Ready**: GitHub Actions integration
✅ **Backup**: Code always backed up in GitHub

---

## 📋 Prerequisites

- GitHub repository with SwiftSalon code
- SSH keys or GitHub token for private repos
- Proxmox LXC container ready

---

## 🏗️ Step 1: Setup LXC Container

**On Proxmox host:**
```bash
pct create 300 local:vztmpl/ubuntu-22.04-standard_22.04-1_amd64.tar.zst \
  --hostname swiftsalon-github \
  --memory 6144 \
  --cores 4 \
  --rootfs local-lvm:40 \
  --net0 name=eth0,bridge=vmbr0,ip=dhcp \
  --features nesting=1,keyctl=1 \
  --privileged 1 \
  --onboot 1

pct start 300
pct enter 300
```

## 🐳 Step 2: Install Docker & Git

**Inside LXC:**
```bash
# Update system
apt update && apt upgrade -y

# Install essential tools
apt install -y git curl wget nano

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
systemctl start docker
systemctl enable docker

# Install Docker Compose
apt install -y docker-compose-plugin

# Create user
useradd -m -s /bin/bash swiftsalon
usermod -aG docker swiftsalon
```

---

## 🔑 Step 3: Setup GitHub Authentication

**Switch to swiftsalon user:**
```bash
su - swiftsalon
```

### **Option A: SSH Keys (Recommended)**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "swiftsalon@yourdomain.com"

# Display public key to add to GitHub
cat ~/.ssh/id_ed25519.pub

# Copy this key and add to GitHub: Settings > SSH and GPG keys > New SSH key
```

### **Option B: Personal Access Token**
```bash
# Configure Git with token (for HTTPS)
git config --global user.name "Your Name"
git config --global user.email "your.email@domain.com"

# Token will be prompted when cloning private repo
```

---

## 📂 Step 4: Repository Structure

**Your GitHub repository should have this structure:**

```
swiftsalon-repo/
├── docker-compose.yml          # Docker orchestration
├── docker-compose.prod.yml     # Production overrides
├── .env.example               # Environment template
├── app/                       # Next.js application
│   ├── package.json
│   ├── next.config.js
│   ├── src/
│   ├── prisma/
│   └── Dockerfile
├── nginx/
│   └── nginx.conf
├── database/
│   └── init/
├── scripts/
│   ├── deploy.sh
│   ├── backup.sh
│   └── update.sh
└── README.md
```

---

## 📥 Step 5: Clone and Deploy

### **Clone Repository**
```bash
# For public repository
git clone https://github.com/yourusername/swiftsalon-repo.git
cd swiftsalon-repo

# For private repository (SSH)
git clone git@github.com:yourusername/swiftsalon-repo.git
cd swiftsalon-repo

# For private repository (HTTPS - will prompt for token)
git clone https://github.com/yourusername/swiftsalon-repo.git
cd swiftsalon-repo
```

### **Setup Environment**
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

**Example .env file:**
```env
# Database Configuration
DATABASE_URL=postgresql://swiftsalon_user:SwiftSalon2024!@postgres:5432/swiftsalon_db
POSTGRES_DB=swiftsalon_db
POSTGRES_USER=swiftsalon_user
POSTGRES_PASSWORD=SwiftSalon2024!

# Redis Configuration
REDIS_URL=redis://:SwiftSalon2024!@redis:6379

# Application Configuration
NODE_ENV=production
NEXTAUTH_SECRET=your-super-secret-jwt-secret-change-this
NEXTAUTH_URL=http://your-domain.com
NEXT_PUBLIC_APP_URL=http://your-domain.com

# GitHub Configuration (for updates)
GITHUB_REPO=yourusername/swiftsalon-repo
GITHUB_BRANCH=main
```

---

## 🚀 Step 6: Docker Compose Configuration

**Create production docker-compose.yml in your repo:**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: swiftsalon_db
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - postgres_data:/var/lib/postgresql/data/pgdata
      - ./database/init:/docker-entrypoint-initdb.d
    networks:
      - swiftsalon_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: swiftsalon_redis
    restart: unless-stopped
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD:-SwiftSalon2024!}
    volumes:
      - redis_data:/data
    networks:
      - swiftsalon_network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  app:
    build:
      context: ./app
      dockerfile: Dockerfile
    container_name: swiftsalon_app
    restart: unless-stopped
    environment:
      - NODE_ENV=${NODE_ENV:-production}
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
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
  postgres_data:
  redis_data:

networks:
  swiftsalon_network:
    driver: bridge
```

---

## 🛠️ Step 7: Deployment Scripts

### **Create deployment script in your repo:**

**`scripts/deploy.sh`:**
```bash
#!/bin/bash

echo "🚀 Deploying SwiftSalon from GitHub..."

# Pull latest changes
echo "📥 Pulling latest code..."
git pull origin ${GITHUB_BRANCH:-main}

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker compose down

# Build and start services
echo "🏗️ Building and starting services..."
docker compose up -d --build

# Wait for database
echo "⏳ Waiting for database..."
sleep 30

# Run database migrations
echo "🗄️ Running database migrations..."
docker compose exec app npx prisma db push

# Seed database (only if empty)
echo "🌱 Seeding database (if needed)..."
docker compose exec app npm run db:seed

# Check health
echo "🔍 Checking application health..."
sleep 10
curl -f http://localhost:3000/api/health || echo "❌ Health check failed"

echo "✅ Deployment complete!"
echo "🌐 Application available at: http://$(hostname -I | awk '{print $1}'):3000"
```

**`scripts/update.sh`:**
```bash
#!/bin/bash

echo "🔄 Updating SwiftSalon..."

# Create backup
echo "💾 Creating backup..."
./scripts/backup.sh

# Pull latest changes
echo "📥 Pulling latest code..."
git pull origin ${GITHUB_BRANCH:-main}

# Rebuild only app container
echo "🏗️ Rebuilding application..."
docker compose up -d --build app

# Run migrations
echo "🗄️ Running database migrations..."
docker compose exec app npx prisma db push

echo "✅ Update complete!"
```

**`scripts/backup.sh`:**
```bash
#!/bin/bash

BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

echo "💾 Creating backup in $BACKUP_DIR..."

# Database backup
docker compose exec postgres pg_dump -U ${POSTGRES_USER} ${POSTGRES_DB} > $BACKUP_DIR/database.sql

# Environment backup
cp .env $BACKUP_DIR/

# Code backup
git log -1 --pretty=format:"%H %s" > $BACKUP_DIR/git_commit.txt

echo "✅ Backup complete: $BACKUP_DIR"
```

**Make scripts executable:**
```bash
chmod +x scripts/*.sh
```

---

## 🚀 Step 8: Deploy Application

```bash
# Run deployment script
./scripts/deploy.sh

# Check status
docker compose ps

# View logs
docker compose logs -f app
```

---

## 🔄 Step 9: Development Workflow

### **For Code Updates:**
```bash
# On your local machine - make changes and push
git add .
git commit -m "Update booking interface"
git push origin main

# On LXC server - deploy updates
./scripts/update.sh
```

### **For Emergency Rollback:**
```bash
# Rollback to previous commit
git reset --hard HEAD~1
docker compose up -d --build app
```

### **For Database Changes:**
```bash
# After updating Prisma schema
docker compose exec app npx prisma db push
docker compose exec app npx prisma generate
docker compose restart app
```

---

## 🎯 Step 10: Advanced GitHub Integration

### **GitHub Actions (Optional)**

**Create `.github/workflows/deploy.yml` in your repo:**
```yaml
name: Deploy to LXC

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SERVER_SSH_KEY }}
        script: |
          cd /home/swiftsalon/swiftsalon-repo
          ./scripts/update.sh
```

### **Repository Secrets:**
- `SERVER_HOST`: Your LXC IP address
- `SERVER_USER`: swiftsalon
- `SERVER_SSH_KEY`: Private SSH key for authentication

---

## 📊 Management Commands

### **Daily Operations:**
```bash
# Update from GitHub
./scripts/update.sh

# Backup data
./scripts/backup.sh

# View logs
docker compose logs -f app

# Check health
curl http://localhost:3000/api/health

# Restart services
docker compose restart

# Clean unused images
docker system prune -f
```

### **Development Commands:**
```bash
# Access application shell
docker compose exec app sh

# Access database
docker compose exec postgres psql -U swiftsalon_user -d swiftsalon_db

# View real-time logs
docker compose logs -f

# Check resource usage
docker stats
```

---

## 🔍 Monitoring & Troubleshooting

### **Health Checks:**
```bash
# Application health
curl http://localhost:3000/api/health

# Database connectivity
docker compose exec postgres pg_isready -U swiftsalon_user

# Container status
docker compose ps

# Resource usage
docker stats --no-stream
```

### **Common Issues:**

**1. Git Authentication Failed**
```bash
# Re-setup SSH key or use personal access token
ssh -T git@github.com  # Test SSH connection
```

**2. Build Failures**
```bash
# Clear build cache
docker compose build --no-cache app
```

**3. Database Connection Issues**
```bash
# Check database logs
docker compose logs postgres

# Reset database (caution: data loss)
docker compose down
docker volume rm swiftsalon-repo_postgres_data
./scripts/deploy.sh
```

---

## 📋 Repository Checklist

**Before first deployment, ensure your GitHub repo has:**

- ✅ `docker-compose.yml` with all services
- ✅ `app/Dockerfile` for Next.js application
- ✅ `app/package.json` with all dependencies
- ✅ `prisma/schema.prisma` database schema
- ✅ `nginx/nginx.conf` reverse proxy config
- ✅ `.env.example` environment template
- ✅ `scripts/deploy.sh` deployment automation
- ✅ `README.md` with setup instructions
- ✅ `.gitignore` excluding `.env`, `node_modules`, etc.

---

## 🎉 Benefits Summary

**✅ GitHub Approach Advantages:**

- **Version Control**: Full development history
- **Easy Updates**: `git pull` + `./scripts/update.sh`
- **Team Development**: Multiple developers can contribute
- **Backup**: Code always backed up in GitHub
- **CI/CD Ready**: GitHub Actions integration
- **Rollback**: Easy revert to previous versions
- **Documentation**: README and wiki in repository

**🚀 Perfect for production deployments with ongoing development!**

---

**Your SwiftSalon deployment is now fully GitHub-integrated with easy management and professional development workflow!**