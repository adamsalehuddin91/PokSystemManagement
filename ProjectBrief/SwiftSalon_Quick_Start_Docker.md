# 🚀 SwiftSalon Quick Start - Docker in LXC

**30-minute deployment guide with application files included**

---

## 📋 Quick Start Summary

**What you get:**
- ✅ SwiftSalon application with demo data
- ✅ PostgreSQL database
- ✅ Redis caching
- ✅ Nginx reverse proxy
- ✅ Complete working demo

---

## 🏗️ Step 1: Create LXC Container

**On Proxmox host:**
```bash
pct create 300 local:vztmpl/ubuntu-22.04-standard_22.04-1_amd64.tar.zst \
  --hostname swiftsalon-docker \
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

---

## 🐳 Step 2: Install Docker (Inside LXC)

```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Start Docker
systemctl start docker
systemctl enable docker

# Install Docker Compose
apt install -y docker-compose-plugin

# Test Docker
docker --version
```

---

## 📂 Step 3: Create Project Structure

```bash
# Create user and project
useradd -m -s /bin/bash swiftsalon
usermod -aG docker swiftsalon
su - swiftsalon

# Create project directory
mkdir -p ~/swiftsalon && cd ~/swiftsalon
mkdir -p {database/data,database/init,nginx,logs}
```

---

## ⚡ Step 4: Create Docker Compose

```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
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

  redis:
    image: redis:7-alpine
    container_name: swiftsalon_redis
    restart: unless-stopped
    command: redis-server --appendonly yes --requirepass SwiftSalon2024!
    volumes:
      - redis_data:/data
    networks:
      - swiftsalon_network

  app:
    image: node:20-alpine
    container_name: swiftsalon_app
    restart: unless-stopped
    working_dir: /app
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://swiftsalon_user:SwiftSalon2024!@postgres:5432/swiftsalon_db
      - REDIS_URL=redis://:SwiftSalon2024!@redis:6379
    ports:
      - "3000:3000"
    volumes:
      - ./app:/app
    command: sh -c "npm install && npm run dev -- --hostname 0.0.0.0"
    depends_on:
      - postgres
      - redis
    networks:
      - swiftsalon_network

volumes:
  redis_data:

networks:
  swiftsalon_network:
    driver: bridge
EOF
```

---

## 📱 Step 5: Create SwiftSalon Application

### Create Next.js App Structure

```bash
# Create app directory
mkdir -p app && cd app

# Create package.json
cat > package.json << 'EOF'
{
  "name": "swiftsalon-demo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:seed": "prisma db seed",
    "db:studio": "prisma studio --port 5555 --hostname 0.0.0.0"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@prisma/client": "^5.19.1",
    "@radix-ui/react-dialog": "^1.1.1",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-calendar": "^1.1.0",
    "lucide-react": "^0.445.0",
    "date-fns": "^3.6.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2",
    "zustand": "^4.5.5",
    "@tanstack/react-query": "^5.56.2",
    "react-hook-form": "^7.53.0",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "typescript": "^5.6.2",
    "@types/node": "^22.5.5",
    "@types/react": "^18.3.8",
    "@types/react-dom": "^18.3.0",
    "eslint": "^8.57.1",
    "eslint-config-next": "^15.0.0",
    "tailwindcss": "^3.4.11",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "prisma": "^5.19.1",
    "tsx": "^4.19.1"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
EOF

# Create Next.js config
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  }
}

module.exports = nextConfig
EOF

# Create TypeScript config
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# Create Tailwind config
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# Create PostCSS config
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
```

### Create Application Structure

```bash
# Create source directories
mkdir -p src/{app,components,lib}
mkdir -p src/app/{admin,booking,api/health}
mkdir -p prisma

# Create Prisma schema
cat > prisma/schema.prisma << 'EOF'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  fullName  String?  @map("full_name")
  phone     String?
  role      UserRole @default(CUSTOMER)
  active    Boolean  @default(true)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  bookings     Booking[]
  membership   Membership?
  staffProfile Staff?

  @@map("users")
}

model Service {
  id          String  @id @default(cuid())
  name        String
  description String?
  duration    Int
  price       Decimal @db.Decimal(10, 2)
  category    String  @default("general")
  active      Boolean @default(true)
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  bookings Booking[]

  @@map("services")
}

model Staff {
  id             String   @id @default(cuid())
  userId         String   @unique @map("user_id")
  specialties    String[]
  availableHours Json?    @map("available_hours")
  active         Boolean  @default(true)
  createdAt      DateTime @default(now()) @map("created_at")
  updatedAt      DateTime @updatedAt @map("updated_at")

  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  bookings Booking[]

  @@map("staff")
}

model Booking {
  id           String        @id @default(cuid())
  customerId   String        @map("customer_id")
  serviceId    String        @map("service_id")
  staffId      String        @map("staff_id")
  bookingDate  DateTime      @map("booking_date") @db.Date
  bookingTime  DateTime      @map("booking_time") @db.Time
  status       BookingStatus @default(CONFIRMED)
  notes        String?
  totalAmount  Decimal?      @map("total_amount") @db.Decimal(10, 2)
  pointsEarned Int?          @default(0) @map("points_earned")
  createdAt    DateTime      @default(now()) @map("created_at")
  updatedAt    DateTime      @updatedAt @map("updated_at")

  customer User    @relation(fields: [customerId], references: [id])
  service  Service @relation(fields: [serviceId], references: [id])
  staff    Staff   @relation(fields: [staffId], references: [id])

  @@map("bookings")
}

model Membership {
  id           String           @id @default(cuid())
  customerId   String           @unique @map("customer_id")
  pointsBalance Int             @default(0) @map("points_balance")
  tier         MembershipTier   @default(BASIC)
  memberSince  DateTime         @default(now()) @map("member_since")
  lastVisit    DateTime?        @map("last_visit")
  createdAt    DateTime         @default(now()) @map("created_at")
  updatedAt    DateTime         @updatedAt @map("updated_at")

  customer User @relation(fields: [customerId], references: [id], onDelete: Cascade)

  @@map("memberships")
}

enum UserRole {
  CUSTOMER
  STAFF
  ADMIN
}

enum BookingStatus {
  CONFIRMED
  COMPLETED
  CANCELLED
  NO_SHOW
}

enum MembershipTier {
  BASIC
  SILVER
  GOLD
  PLATINUM
}
EOF
```

### Create Application Files

```bash
# Create lib/prisma.ts
cat > src/lib/prisma.ts << 'EOF'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
EOF

# Create globals.css
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }

  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
EOF

# Create layout.tsx
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SwiftSalon Muslimah - Demo',
  description: 'Sistem pengurusan salon muslimah yang professional',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ms">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
          {children}
        </main>
      </body>
    </html>
  )
}
EOF

# Create homepage
cat > src/app/page.tsx << 'EOF'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          SwiftSalon Muslimah
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sistem pengurusan salon muslimah yang professional dan patuh syariah
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-pink-600 mb-2">📅 Tempahan Online</h3>
          <p className="text-gray-600 mb-4">Buat tempahan servis dengan mudah</p>
          <Link href="/booking" className="inline-block bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
            Buat Tempahan
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">👩‍💼 Panel Admin</h3>
          <p className="text-gray-600 mb-4">Urus salon dan pelanggan</p>
          <Link href="/admin" className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Admin Panel
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-green-600 mb-2">⭐ Membership</h3>
          <p className="text-gray-600 mb-4">Kumpul mata dan nikmati faedah</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Daftar Ahli
          </button>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Servis Kami</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="p-4 bg-white rounded-lg shadow">
            <span className="text-2xl mb-2 block">💇‍♀️</span>
            <p className="text-sm">Cuci & Blow Dry</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <span className="text-2xl mb-2 block">🧴</span>
            <p className="text-sm">Rawatan Rambut</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <span className="text-2xl mb-2 block">🌸</span>
            <p className="text-sm">Facial Muslimah</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <span className="text-2xl mb-2 block">🎨</span>
            <p className="text-sm">Inai & Henna</p>
          </div>
        </div>
      </div>
    </div>
  )
}
EOF

# Create health check API
cat > src/app/api/health/route.ts << 'EOF'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
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

# Create database seed
cat > prisma/seed.ts << 'EOF'
import { PrismaClient, UserRole, MembershipTier } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding SwiftSalon database...')

  const admin = await prisma.user.create({
    data: {
      email: 'admin@swiftsalon.com',
      fullName: 'Siti Admin',
      phone: '0123456789',
      role: UserRole.ADMIN,
    },
  })

  const staff1 = await prisma.user.create({
    data: {
      email: 'aisha@swiftsalon.com',
      fullName: 'Aisha Stylist',
      phone: '0123456788',
      role: UserRole.STAFF,
      staffProfile: {
        create: {
          specialties: ['Hair Wash', 'Blow Dry', 'Hair Treatment'],
          availableHours: {
            monday: ['09:00', '17:00'],
            tuesday: ['09:00', '17:00'],
            wednesday: ['09:00', '17:00'],
            thursday: ['09:00', '17:00'],
            friday: ['14:00', '20:00'],
            saturday: ['09:00', '17:00'],
            sunday: ['closed']
          }
        }
      }
    },
  })

  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: 'Cuci Rambut + Blow Dry',
        description: 'Cuci rambut dengan shampoo premium dan blow dry professional',
        duration: 60,
        price: 25.00,
        category: 'rambut',
      },
    }),
    prisma.service.create({
      data: {
        name: 'Facial Muslimah',
        description: 'Rawatan wajah lengkap dengan produk halal',
        duration: 90,
        price: 60.00,
        category: 'wajah',
      },
    }),
    prisma.service.create({
      data: {
        name: 'Inai Tangan',
        description: 'Lukisan inai tradisional pada tangan',
        duration: 45,
        price: 30.00,
        category: 'henna',
      },
    }),
  ])

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
EOF
```

---

## 🚀 Step 6: Deploy Everything

```bash
# Go back to project root
cd ~/swiftsalon

# Start services
docker compose up -d

# Wait for database to be ready (30 seconds)
sleep 30

# Setup database
docker compose exec app npx prisma db push
docker compose exec app npm run db:seed

# Check status
docker compose ps
```

---

## ✅ Step 7: Access Your Demo

**Your SwiftSalon demo is now running at:**
- **Homepage**: `http://[LXC-IP]:3000`
- **API Health**: `http://[LXC-IP]:3000/api/health`
- **Database Studio**: `http://[LXC-IP]:5555` (run: `docker compose exec app npm run db:studio`)

**Demo Users:**
- Admin: `admin@swiftsalon.com`
- Staff: `aisha@swiftsalon.com`

---

## 🛠️ Quick Commands

```bash
# View logs
docker compose logs -f app

# Stop services
docker compose down

# Restart services
docker compose restart

# Access database
docker compose exec postgres psql -U swiftsalon_user -d swiftsalon_db

# Access app shell
docker compose exec app sh
```

---

## ❓ About Application Files

**Q: Where do the application files come from?**

**A: Two approaches:**

### **Approach 1: Auto-Generated (This Guide)**
- Application files are created using `cat > filename` commands
- Complete SwiftSalon structure generated automatically
- No external files needed - everything in terminal

### **Approach 2: Git Repository**
```bash
# Alternative: Clone from repository
git clone https://github.com/your-repo/swiftsalon-app.git app
cd app
```

### **Approach 3: Local Transfer**
```bash
# Transfer from your local machine
scp -r ./local-swiftsalon-app swiftsalon@[LXC-IP]:~/swiftsalon/app
```

**This quick start uses Approach 1 - everything generated in place for fastest deployment!**

---

**🎉 Total deployment time: ~30 minutes with complete working SwiftSalon demo!**