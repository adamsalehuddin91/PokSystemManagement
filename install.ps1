# POK-SaaS Installation Script
# This script will guide you through the installation process

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  POK-SaaS IT Management System Setup  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check PHP
Write-Host "Checking PHP..." -ForegroundColor Yellow
try {
    $phpVersion = php --version 2>$null
    if ($phpVersion) {
        Write-Host "✓ PHP is installed" -ForegroundColor Green
        Write-Host $phpVersion[0] -ForegroundColor Gray
    }
} catch {
    Write-Host "✗ PHP is not installed or not in PATH" -ForegroundColor Red
    Write-Host "  Please install PHP 8.2+ from: https://windows.php.net/download/" -ForegroundColor Yellow
    Write-Host "  Or use XAMPP/Laragon which includes PHP" -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") { exit }
}

# Check Composer
Write-Host "`nChecking Composer..." -ForegroundColor Yellow
try {
    $composerVersion = composer --version 2>$null
    if ($composerVersion) {
        Write-Host "✓ Composer is installed" -ForegroundColor Green
        Write-Host $composerVersion -ForegroundColor Gray
    }
} catch {
    Write-Host "✗ Composer is not installed or not in PATH" -ForegroundColor Red
    Write-Host "  Please install Composer from: https://getcomposer.org/download/" -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") { exit }
}

# Check Node.js
Write-Host "`nChecking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "✗ Node.js is not installed" -ForegroundColor Red
    Write-Host "  Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    exit
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Starting Installation...              " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Step 1: Install Composer dependencies
Write-Host "`n[1/6] Installing PHP dependencies..." -ForegroundColor Yellow
if (Test-Path "composer.json") {
    composer install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ PHP dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install PHP dependencies" -ForegroundColor Red
        exit
    }
} else {
    Write-Host "✗ composer.json not found" -ForegroundColor Red
    exit
}

# Step 2: Copy .env file
Write-Host "`n[2/6] Setting up environment file..." -ForegroundColor Yellow
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✓ .env file created" -ForegroundColor Green
} else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}

# Step 3: Generate application key
Write-Host "`n[3/6] Generating application key..." -ForegroundColor Yellow
php artisan key:generate
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Application key generated" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to generate application key" -ForegroundColor Red
}

# Step 4: Install NPM dependencies
Write-Host "`n[4/6] Installing Node.js dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Node.js dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install Node.js dependencies" -ForegroundColor Red
    exit
}

# Step 5: Database setup
Write-Host "`n[5/6] Database setup..." -ForegroundColor Yellow
Write-Host "Please configure your database in .env file:" -ForegroundColor Cyan
Write-Host "  DB_DATABASE=pok_saas" -ForegroundColor Gray
Write-Host "  DB_USERNAME=root" -ForegroundColor Gray
Write-Host "  DB_PASSWORD=your_password" -ForegroundColor Gray
Write-Host ""
$runMigrations = Read-Host "Run database migrations now? (y/n)"
if ($runMigrations -eq "y") {
    php artisan migrate
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Database migrations completed" -ForegroundColor Green
    } else {
        Write-Host "✗ Database migrations failed" -ForegroundColor Red
        Write-Host "  Make sure your database is configured correctly in .env" -ForegroundColor Yellow
    }
}

# Step 6: Build assets
Write-Host "`n[6/6] Building frontend assets..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend assets built" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to build frontend assets" -ForegroundColor Red
}

# Done!
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Installation Complete!                 " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Configure your database in .env file" -ForegroundColor White
Write-Host "2. Run: php artisan migrate (if not done)" -ForegroundColor White
Write-Host "3. Run: php artisan serve" -ForegroundColor White
Write-Host "4. In another terminal: npm run dev" -ForegroundColor White
Write-Host "5. Visit: http://localhost:8000" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
