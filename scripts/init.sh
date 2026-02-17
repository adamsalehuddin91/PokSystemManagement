#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../../.." && pwd)"
TARGET_DIR="$ROOT_DIR/SwiftApp Dev/swiftpos-laravel"
TEMPLATE_DIR="$ROOT_DIR/SwiftApp Dev/swiftpos-laravel-starter/templates"

if [ -d "$TARGET_DIR" ]; then
  read -r -p "Target '$TARGET_DIR' exists. Continue and copy templates? [y/N] " yn
  case $yn in
    [Yy]*) ;;
    *) exit 1;;
  esac
else
  echo "Creating Laravel app at: $TARGET_DIR"
  ( cd "$(dirname "$TARGET_DIR")" && composer create-project laravel/laravel "$(basename "$TARGET_DIR")" )
fi

cd "$TARGET_DIR"
composer require laravel/breeze --dev
php artisan breeze:install blade
npm install

mkdir -p "resources/views/layouts" "resources/views" "app/Models" "database/migrations" "database/seeders" "app/Http/Controllers"
# Models
cp -f "$TEMPLATE_DIR/app/Models/MenuItem.php" "app/Models/MenuItem.php"
cp -f "$TEMPLATE_DIR/app/Models/DiningTable.php" "app/Models/DiningTable.php"
cp -f "$TEMPLATE_DIR/app/Models/Order.php" "app/Models/Order.php"
cp -f "$TEMPLATE_DIR/app/Models/OrderItem.php" "app/Models/OrderItem.php"

# Controllers
cp -f "$TEMPLATE_DIR/app/Http/Controllers/PosController.php" "app/Http/Controllers/PosController.php"
cp -f "$TEMPLATE_DIR/app/Http/Controllers/TablesController.php" "app/Http/Controllers/TablesController.php"
cp -f "$TEMPLATE_DIR/app/Http/Controllers/KitchenController.php" "app/Http/Controllers/KitchenController.php"
cp -f "$TEMPLATE_DIR/app/Http/Controllers/CustomerController.php" "app/Http/Controllers/CustomerController.php"
cp -f "$TEMPLATE_DIR/app/Http/Controllers/OrderController.php" "app/Http/Controllers/OrderController.php"

# Views
cp -f "$TEMPLATE_DIR/layouts_app.blade.php" "resources/views/layouts/app.blade.php"
cp -f "$TEMPLATE_DIR/dashboard.blade.php" "resources/views/dashboard.blade.php"
cp -f "$TEMPLATE_DIR/customer.blade.php" "resources/views/customer.blade.php"
cp -f "$TEMPLATE_DIR/pos.blade.php" "resources/views/pos.blade.php"
cp -f "$TEMPLATE_DIR/tables.blade.php" "resources/views/tables.blade.php"
cp -f "$TEMPLATE_DIR/kitchen.blade.php" "resources/views/kitchen.blade.php"
if ! grep -q 'SWIFTPOS_ROUTES_START' "routes/web.php"; then
  cat "$TEMPLATE_DIR/routes_web_append.php" >> "routes/web.php"
  echo "Merged SwiftPOS routes into routes/web.php"
else
  echo "SwiftPOS routes already present, skipping merge."
fi

php artisan key:generate

# Migrations
cp -f "$TEMPLATE_DIR/database/migrations/2024_11_05_000001_create_menu_items_table.php" "database/migrations/2024_11_05_000001_create_menu_items_table.php"
cp -f "$TEMPLATE_DIR/database/migrations/2024_11_05_000002_create_dining_tables_table.php" "database/migrations/2024_11_05_000002_create_dining_tables_table.php"
cp -f "$TEMPLATE_DIR/database/migrations/2024_11_05_000003_create_orders_table.php" "database/migrations/2024_11_05_000003_create_orders_table.php"
cp -f "$TEMPLATE_DIR/database/migrations/2024_11_05_000004_create_order_items_table.php" "database/migrations/2024_11_05_000004_create_order_items_table.php"

# Seeders
cp -f "$TEMPLATE_DIR/database/seeders/MenuItemSeeder.php" "database/seeders/MenuItemSeeder.php"
cp -f "$TEMPLATE_DIR/database/seeders/DiningTableSeeder.php" "database/seeders/DiningTableSeeder.php"
cp -f "$TEMPLATE_DIR/database/seeders/DatabaseSeeder.php" "database/seeders/DatabaseSeeder.php"

# Configure SQLite in .env
if grep -q '^DB_CONNECTION=' .env; then
  sed -i -E 's/^DB_CONNECTION=.*/DB_CONNECTION=sqlite/' .env
else
  printf '\nDB_CONNECTION=sqlite\n' >> .env
fi
sed -i -E 's/^(DB_HOST|DB_PORT|DB_DATABASE|DB_USERNAME|DB_PASSWORD)=/# \1=/' .env || true

# Ensure SQLite file exists
mkdir -p database
: > database/database.sqlite

# Migrate and seed
php artisan migrate --force
php artisan db:seed --force

echo "--- Setup complete ---"
echo "Next:"
echo "1) cd '$TARGET_DIR'"
echo "2) npm run dev  (assets)"
echo "3) php artisan serve (app)"
echo "4) Visit http://localhost:8000, register/login (Breeze), then access POS pages"
