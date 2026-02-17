$ErrorActionPreference = 'Stop'

function Confirm($Message) {
  $choice = Read-Host "$Message [y/N]"
  return $choice -match '^(y|yes)$'
}

$repoRoot = (Resolve-Path "$PSScriptRoot\..\..\..").Path
$target = Join-Path $repoRoot "SwiftApp Dev\swiftpos-laravel"
$templateDir = Join-Path $repoRoot "SwiftApp Dev\swiftpos-laravel-starter\templates"

if (Test-Path $target) {
  if (-not (Confirm "Target '$target' exists. Continue and copy templates?")) { exit 1 }
} else {
  Write-Host "Creating Laravel app at: $target" -ForegroundColor Cyan
  Push-Location (Split-Path $target)
  composer create-project laravel/laravel "swiftpos-laravel"
  Pop-Location
}

Push-Location $target
try {
  write-host "Installing Breeze..." -ForegroundColor Cyan
  composer require laravel/breeze --dev
  php artisan breeze:install blade
  npm install
}
catch { Write-Error $_; Pop-Location; exit 1 }

# Copy templates
function Copy-Template($src, $dst) {
  $dstDir = Split-Path $dst
  if (-not (Test-Path $dstDir)) { New-Item -Force -ItemType Directory -Path $dstDir | Out-Null }
  Copy-Item -Force $src $dst
}

# Models
Copy-Template (Join-Path $templateDir "app\Models\MenuItem.php") (Join-Path $target "app\Models\MenuItem.php")
Copy-Template (Join-Path $templateDir "app\Models\DiningTable.php") (Join-Path $target "app\Models\DiningTable.php")
Copy-Template (Join-Path $templateDir "app\Models\Order.php") (Join-Path $target "app\Models\Order.php")
Copy-Template (Join-Path $templateDir "app\Models\OrderItem.php") (Join-Path $target "app\Models\OrderItem.php")

# Controllers
Copy-Template (Join-Path $templateDir "app\Http\Controllers\PosController.php") (Join-Path $target "app\Http\Controllers\PosController.php")
Copy-Template (Join-Path $templateDir "app\Http\Controllers\TablesController.php") (Join-Path $target "app\Http\Controllers\TablesController.php")
Copy-Template (Join-Path $templateDir "app\Http\Controllers\KitchenController.php") (Join-Path $target "app\Http\Controllers\KitchenController.php")
Copy-Template (Join-Path $templateDir "app\Http\Controllers\CustomerController.php") (Join-Path $target "app\Http\Controllers\CustomerController.php")
Copy-Template (Join-Path $templateDir "app\Http\Controllers\OrderController.php") (Join-Path $target "app\Http\Controllers\OrderController.php")

# Views
Copy-Template (Join-Path $templateDir "routes_web_append.php") (Join-Path $target "routes\web.swiftpos.php")
Copy-Template (Join-Path $templateDir "layouts_app.blade.php") (Join-Path $target "resources\views\layouts\app.blade.php")
Copy-Template (Join-Path $templateDir "dashboard.blade.php") (Join-Path $target "resources\views\dashboard.blade.php")
Copy-Template (Join-Path $templateDir "customer.blade.php") (Join-Path $target "resources\views\customer.blade.php")
Copy-Template (Join-Path $templateDir "pos.blade.php") (Join-Path $target "resources\views\pos.blade.php")
Copy-Template (Join-Path $templateDir "tables.blade.php") (Join-Path $target "resources\views\tables.blade.php")
Copy-Template (Join-Path $templateDir "kitchen.blade.php") (Join-Path $target "resources\views\kitchen.blade.php")

# Migrations
Copy-Template (Join-Path $templateDir "database\migrations\2024_11_05_000001_create_menu_items_table.php") (Join-Path $target "database\migrations\2024_11_05_000001_create_menu_items_table.php")
Copy-Template (Join-Path $templateDir "database\migrations\2024_11_05_000002_create_dining_tables_table.php") (Join-Path $target "database\migrations\2024_11_05_000002_create_dining_tables_table.php")
Copy-Template (Join-Path $templateDir "database\migrations\2024_11_05_000003_create_orders_table.php") (Join-Path $target "database\migrations\2024_11_05_000003_create_orders_table.php")
Copy-Template (Join-Path $templateDir "database\migrations\2024_11_05_000004_create_order_items_table.php") (Join-Path $target "database\migrations\2024_11_05_000004_create_order_items_table.php")

# Seeders
Copy-Template (Join-Path $templateDir "database\seeders\MenuItemSeeder.php") (Join-Path $target "database\seeders\MenuItemSeeder.php")
Copy-Template (Join-Path $templateDir "database\seeders\DiningTableSeeder.php") (Join-Path $target "database\seeders\DiningTableSeeder.php")
Copy-Template (Join-Path $templateDir "database\seeders\DatabaseSeeder.php") (Join-Path $target "database\seeders\DatabaseSeeder.php")

# Merge routes
$webPath = Join-Path $target "routes\web.php"
$webContent = Get-Content $webPath -Raw
if ($webContent -notmatch 'SWIFTPOS_ROUTES_START') {
  $append = Get-Content (Join-Path $templateDir "routes_web_append.php") -Raw
  Add-Content -Path $webPath -Value "`n`n$append"
  Write-Host "Merged SwiftPOS routes into routes/web.php" -ForegroundColor Green
} else {
  Write-Host "SwiftPOS routes already present, skipping merge." -ForegroundColor Yellow
}

# Configure SQLite in .env
$envPath = Join-Path $target ".env"
if (Test-Path $envPath) {
  $lines = Get-Content $envPath
  $updated = @()
  foreach ($line in $lines) {
    if ($line -match '^DB_CONNECTION=') { $updated += 'DB_CONNECTION=sqlite' }
    elseif ($line -match '^DB_(HOST|PORT|DATABASE|USERNAME|PASSWORD)=') { $updated += "# $line" }
    else { $updated += $line }
  }
  Set-Content -Path $envPath -Value ($updated -join "`n")
  Write-Host "Configured .env for SQLite" -ForegroundColor Green
}

# Ensure SQLite file exists
$sqlitePath = Join-Path $target "database\database.sqlite"
if (-not (Test-Path $sqlitePath)) {
  New-Item -ItemType File -Path $sqlitePath | Out-Null
  Write-Host "Created database/database.sqlite" -ForegroundColor Green
}

# Run migrations and seeders
php artisan migrate --force
php artisan db:seed --force

php artisan key:generate

Write-Host "--- Setup complete ---" -ForegroundColor Green
Write-Host "Next:" -ForegroundColor Yellow
Write-Host "1) cd '$target'" -ForegroundColor Yellow
Write-Host "2) npm run dev  (assets)" -ForegroundColor Yellow
Write-Host "3) php artisan serve (app)" -ForegroundColor Yellow
Write-Host "4) Visit http://localhost:8000, register/login (Breeze), then access POS pages" -ForegroundColor Yellow
Pop-Location
