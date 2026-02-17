# POK-SaaS Setup Guide

## Quick Start (For Users Without Composer Installed Globally)

### Option 1: Install Composer Globally (Recommended)

1. Download Composer from https://getcomposer.org/download/
2. Run the installer
3. Restart terminal
4. Verify: `composer --version`

### Option 2: Use Laravel Installer

```bash
# Install Laravel installer globally
composer global require laravel/installer

# Create new Laravel 11 project
laravel new PokSystemManagement --git --pest

# Navigate to project
cd PokSystemManagement

# Install Inertia.js with React
php artisan breeze:install react

# Install dependencies
npm install
```

### Option 3: Use Composer Create-Project

```bash
# Create Laravel project using Composer
composer create-project laravel/laravel PokSystemManagement

# Navigate to project
cd PokSystemManagement

# Install Breeze with Inertia + React
composer require laravel/breeze --dev
php artisan breeze:install react

# Install dependencies
npm install
```

## Manual Setup Steps

If you need to set up manually, follow these steps:

### 1. Initialize Laravel 11 Project

```bash
composer create-project laravel/laravel:^11.0 PokSystemManagement
cd PokSystemManagement
```

### 2. Install Inertia.js + React

```bash
# Install Laravel Breeze (includes Inertia + React)
composer require laravel/breeze --dev
php artisan breeze:install react

# Or install Inertia manually
composer require inertiajs/inertia-laravel
npm install @inertiajs/react react react-dom
```

### 3. Install Additional Dependencies

```bash
# Backend
composer require spatie/laravel-permission  # Role & permissions
composer require barryvdh/laravel-dompdf    # PDF generation

# Frontend
npm install @headlessui/react @heroicons/react
npm install chart.js react-chartjs-2
npm install date-fns
```

### 4. Setup Database

```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE pok_saas;
EXIT;

# Configure .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pok_saas
DB_USERNAME=root
DB_PASSWORD=your_password

# Run migrations
php artisan migrate
```

### 5. Development Server

```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server
npm run dev
```

Access: http://localhost:8000

## Project Structure Setup

After Laravel is installed, create the Service Pattern structure:

```bash
# Create service directories
mkdir -p app/Services
mkdir -p app/Repositories
mkdir -p app/Http/Resources

# Create base service files
touch app/Services/InventoryService.php
touch app/Services/DocumentService.php
touch app/Services/FinanceService.php
touch app/Services/AIService.php
```

## Next Steps

1. ✅ Laravel 11 installed
2. ✅ Inertia.js + React configured
3. ✅ Tailwind CSS ready
4. ✅ Database connected
5. ⏳ Run migrations (Phase 2)
6. ⏳ Build modules (Phase 3-6)

## Troubleshooting

### Composer not found
- Install Composer: https://getcomposer.org/download/
- Add to PATH: `C:\ProgramData\ComposerSetup\bin`

### Node/NPM not found
- Install Node.js: https://nodejs.org/
- Verify: `node --version` and `npm --version`

### MySQL connection error
- Start MySQL service
- Check credentials in .env
- Verify database exists

### Vite build errors
- Clear cache: `npm run build -- --force`
- Delete node_modules: `rm -rf node_modules && npm install`

## Development Workflow

```bash
# Daily development
1. Start Laravel: php artisan serve
2. Start Vite: npm run dev
3. Code in resources/js/Pages/
4. Hot reload automatic

# Before commit
1. Run tests: php artisan test
2. Format code: ./vendor/bin/pint
3. Build assets: npm run build
```

Ready to proceed with Phase 2: Database Migrations! 🚀
