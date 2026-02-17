<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Supplier;
use App\Models\Customer;
use App\Models\Category;
use App\Models\Sku;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use App\Models\DeliveryOrder;
use App\Models\DeliveryOrderItem;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Receipt;
use App\Models\Transaction;
use Carbon\Carbon;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('🌱 Seeding Demo Data...');

        // 1. Users
        $admin = User::firstOrCreate(
            ['email' => 'admin@pok.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );
        $staff = User::firstOrCreate(
            ['email' => 'staff@pok.com'],
            [
                'name' => 'Staff Member',
                'password' => Hash::make('password'),
            ]
        );
        $this->command->info('✅ Users seeded');

        // 2. Suppliers
        $suppliers = [
            ['name' => 'TechDistrio Sdn Bhd', 'company_name' => 'TechDistrio Sdn Bhd', 'email' => 'sales@techdistrio.com', 'phone' => '03-12345678', 'address' => '123, Jalan Teknologi, Cyberjaya'],
            ['name' => 'MegaBytes Solutions', 'company_name' => 'MegaBytes Solutions', 'email' => 'orders@megabytes.com', 'phone' => '03-87654321', 'address' => '45, Wisma IT, Petaling Jaya'],
            ['name' => 'Global Chips Supply', 'company_name' => 'Global Chips Supply', 'email' => 'raj@globalchips.com', 'phone' => '012-3456789', 'address' => '88, Industrial Park, Shah Alam'],
        ];

        foreach ($suppliers as $s) {
            Supplier::firstOrCreate(['email' => $s['email']], $s);
        }
        $supplierModels = Supplier::all();
        $this->command->info('✅ Suppliers seeded');

        // 3. Customers
        $customers = [
            ['name' => 'Alpha Corp', 'email' => 'procurement@alphacorp.com', 'phone' => '03-55551111', 'address' => 'Menara Alpha, KL'],
            ['name' => 'Beta Ventures', 'email' => 'finance@beta.com', 'phone' => '03-55552222', 'address' => 'Suite 2-B, Mid Valley'],
            ['name' => 'Gamma SME', 'email' => 'boss@gamma.com', 'phone' => '019-8887777', 'address' => '12, Shoplot 3, Puchong'],
        ];

        foreach ($customers as $c) {
            Customer::firstOrCreate(['email' => $c['email']], $c);
        }
        $customerModels = Customer::all();
        $this->command->info('✅ Customers seeded');

        // 4. Categories & SKUs (Inventory)
        $categories = [
            'Laptops' => [
                ['sku_code' => 'NB-DELL-5420', 'name' => 'Dell Latitude 5420', 'description' => 'Business Laptop, i5, 8GB RAM, 256GB SSD', 'price' => 3200, 'cost' => 2500, 'stock' => 15, 'unit' => 'unit'],
                ['sku_code' => 'NB-HP-440', 'name' => 'HP ProBook 440 G8', 'description' => 'Business Laptop, i5, 16GB RAM, 512GB SSD', 'price' => 3500, 'cost' => 2800, 'stock' => 8, 'unit' => 'unit'],
            ],
            'Peripherals' => [
                ['sku_code' => 'PER-LOG-M170', 'name' => 'Logitech M170 Mouse', 'description' => 'Wireless Mouse', 'price' => 45, 'cost' => 25, 'stock' => 50, 'unit' => 'unit'],
                ['sku_code' => 'PER-LOG-K120', 'name' => 'Logitech K120 Keyboard', 'description' => 'USB Wired Keyboard', 'price' => 35, 'cost' => 20, 'stock' => 45, 'unit' => 'unit'],
                ['sku_code' => 'MON-DELL-24', 'name' => 'Dell E2422H Monitor', 'description' => '24-inch FHD Monitor', 'price' => 550, 'cost' => 400, 'stock' => 12, 'unit' => 'unit'],
            ],
            'Software' => [
                ['sku_code' => 'SOFT-OFF-365', 'name' => 'Office 365 Business', 'description' => '1 Year Subscription', 'price' => 450, 'cost' => 380, 'stock' => 100, 'unit' => 'license'],
                ['sku_code' => 'SOFT-WIN-11', 'name' => 'Windows 11 Pro', 'description' => 'OEM License', 'price' => 650, 'cost' => 500, 'stock' => 30, 'unit' => 'license'],
            ],
        ];

        foreach ($categories as $catName => $skus) {
            $category = Category::firstOrCreate(['name' => $catName]);

            foreach ($skus as $skuData) {
                Sku::firstOrCreate(
                    ['sku_code' => $skuData['sku_code']],
                    [
                        'name' => $skuData['name'],
                        'description' => $skuData['description'],
                        'category_id' => $category->id,
                        'unit_price' => $skuData['price'],
                        'cost_price' => $skuData['cost'],
                        'current_stock' => $skuData['stock'],
                        'min_stock_level' => 10,
                        'status' => 'active',
                    ]
                );
            }
        }
        $allSkus = Sku::all();
        $this->command->info('✅ Inventory seeded');

        // 5. Purchase Orders
        // PO 1: Approved & Received (Completed)
        $po1 = PurchaseOrder::where('po_number', 'PO-' . date('Y') . '-0001')->first();
        if (!$po1) {
            $po1 = PurchaseOrder::create([
                'po_number' => 'PO-' . date('Y') . '-0001',
                'supplier_id' => $supplierModels[0]->id,
                'status' => 'received',
                'total_amount' => 14000,
                'notes' => 'Initial stock for Dell Laptops',
                'created_by' => $admin->id,
                'approved_by' => $admin->id,
                'approved_at' => now()->subDays(10),
                'created_at' => now()->subDays(12),
            ]);
            PurchaseOrderItem::create([
                'purchase_order_id' => $po1->id,
                'sku_id' => $allSkus->where('sku_code', 'NB-DELL-5420')->first()->id,
                'quantity' => 5,
                'unit_price' => 2500, // Cost price
                'total_price' => 12500,
            ]);
            PurchaseOrderItem::create([
                'purchase_order_id' => $po1->id,
                'sku_id' => $allSkus->where('sku_code', 'MON-DELL-24')->first()->id,
                'quantity' => 5, // Only 5 ordered but stock is 12 (maybe from other POs)
                'unit_price' => 300, // Deal price
                'total_price' => 1500,
            ]);
        }

        // PO 2: Pending Approval
        $po2 = PurchaseOrder::where('po_number', 'PO-' . date('Y') . '-0002')->first();
        if (!$po2) {
            $po2 = PurchaseOrder::create([
                'po_number' => 'PO-' . date('Y') . '-0002',
                'supplier_id' => $supplierModels[1]->id,
                'status' => 'pending',
                'total_amount' => 2800,
                'notes' => 'Restock HP Laptops urgently',
                'created_by' => $staff->id,
                'created_at' => now()->subDays(2),
            ]);
            PurchaseOrderItem::create([
                'purchase_order_id' => $po2->id,
                'sku_id' => $allSkus->where('sku_code', 'NB-HP-440')->first()->id,
                'quantity' => 1,
                'unit_price' => 2800,
                'total_price' => 2800,
            ]);
        }

        $this->command->info('✅ Purchase Orders seeded');

        // 6. Delivery Orders & Invoices (Sales Cycle)

        // Scenario 1: Completed Cycle (DO -> Invoice -> Paid)
        $do1 = DeliveryOrder::where('do_number', 'DO-' . date('Y') . '-0001')->first();
        if (!$do1) {
            $do1 = DeliveryOrder::create([
                'do_number' => 'DO-' . date('Y') . '-0001',
                'purchase_order_id' => null, // Direct sale
                'customer_id' => $customerModels[0]->id, // Alpha Corp
                'status' => 'delivered',
                'delivery_date' => now()->subDays(5),
                'notes' => 'Delivered to reception',
                'created_at' => now()->subDays(6),
            ]);
            $doItem1 = DeliveryOrderItem::create([
                'delivery_order_id' => $do1->id,
                'sku_id' => $allSkus->where('sku_code', 'NB-DELL-5420')->first()->id,
                'quantity' => 2,
                'unit_price' => 3200, // Selling price
                'total_price' => 6400,
            ]);

            // COGS Transaction for DO1 (Cost of the 2 laptops)
            Transaction::create([
                'type' => 'cogs',
                'category' => 'cost_of_sales',
                'amount' => 2 * 2500, // 2 units * 2500 cost
                'description' => "COGS for NB-DELL-5420 - 2 units",
                'reference_type' => 'delivery_order', // Simplified reference
                'reference_id' => $do1->id,
                'transaction_date' => now()->subDays(5), // When delivered
            ]);
        }

        // Generate Invoice for DO1
        $inv1 = Invoice::where('invoice_number', 'INV-' . date('Y') . '-0001')->first();
        if (!$inv1 && $do1) {
            $inv1 = Invoice::create([
                'invoice_number' => 'INV-' . date('Y') . '-0001',
                'delivery_order_id' => $do1->id,
                'customer_id' => $customerModels[0]->id,
                'payment_status' => 'paid',
                'subtotal' => 6400,
                'tax_amount' => 0,
                'total_amount' => 6400,
                'due_date' => now()->addDays(25),
                'notes' => 'Thank you for your business',
                'created_at' => now()->subDays(5),
            ]);
            InvoiceItem::create([
                'invoice_id' => $inv1->id,
                'sku_id' => $allSkus->where('sku_code', 'NB-DELL-5420')->first()->id,
                'quantity' => 2,
                'unit_price' => 3200,
                'total_price' => 6400,
                'description' => 'Laptop Purchase',
            ]);

            // Receipt and Revenue Transaction for Inv1
            Receipt::create([
                'receipt_number' => 'RCP-' . date('Y') . '-0001',
                'invoice_id' => $inv1->id,
                'amount_paid' => 6400,
                'payment_date' => now()->subDays(4),
                'payment_method' => 'bank_transfer',
            ]);

            Transaction::create([
                'type' => 'revenue',
                'category' => 'sales',
                'amount' => 6400,
                'description' => "Revenue from Invoice {$inv1->invoice_number}",
                'reference_type' => 'invoice',
                'reference_id' => $inv1->id,
                'transaction_date' => now()->subDays(4),
            ]);
        }


        // Scenario 2: Pending Payment (DO -> Invoice -> Unpaid)
        $do2 = DeliveryOrder::where('do_number', 'DO-' . date('Y') . '-0002')->first();
        if (!$do2) {
            $do2 = DeliveryOrder::create([
                'do_number' => 'DO-' . date('Y') . '-0002',
                'purchase_order_id' => null,
                'customer_id' => $customerModels[1]->id, // Beta Ventures
                'status' => 'delivered', // Goods delivered
                'delivery_date' => now()->subDays(2),
                'created_at' => now()->subDays(3),
            ]);
            $doItem2 = DeliveryOrderItem::create([
                'delivery_order_id' => $do2->id,
                'sku_id' => $allSkus->where('sku_code', 'SOFT-OFF-365')->first()->id,
                'quantity' => 10,
                'unit_price' => 450,
                'total_price' => 4500,
            ]);

            // COGS for Software (Cost 380 * 10)
            Transaction::create([
                'type' => 'cogs',
                'category' => 'cost_of_sales',
                'amount' => 10 * 380,
                'description' => "COGS for SOFT-OFF-365 - 10 units",
                'reference_type' => 'delivery_order',
                'reference_id' => $do2->id,
                'transaction_date' => now()->subDays(2),
            ]);
        }

        $inv2 = Invoice::where('invoice_number', 'INV-' . date('Y') . '-0002')->first();
        if (!$inv2 && $do2) {
            $inv2 = Invoice::create([
                'invoice_number' => 'INV-' . date('Y') . '-0002',
                'delivery_order_id' => $do2->id,
                'customer_id' => $customerModels[1]->id,
                'payment_status' => 'unpaid',
                'subtotal' => 4500,
                'tax_amount' => 0,
                'total_amount' => 4500,
                'due_date' => now()->addDays(30),
                'created_at' => now()->subDays(2),
            ]);
            InvoiceItem::create([
                'invoice_id' => $inv2->id,
                'sku_id' => $allSkus->where('sku_code', 'SOFT-OFF-365')->first()->id,
                'quantity' => 10,
                'unit_price' => 450,
                'total_price' => 4500,
                'description' => 'Office 365 Subscription',
            ]);

            // Use FinanceService logic manually here to record Revenue (Accrual basis)
            Transaction::create([
                'type' => 'revenue',
                'category' => 'sales',
                'amount' => 4500,
                'description' => "Revenue from Invoice {$inv2->invoice_number}",
                'reference_type' => 'invoice',
                'reference_id' => $inv2->id,
                'transaction_date' => now()->subDays(2),
            ]);
        }


        // 7. Manual Expenses (Rent, Utilities)
        if (Transaction::where('category', 'rent')->where('description', 'Office Rent for ' . now()->format('F Y'))->doesntExist()) {
            Transaction::create([
                'type' => 'expense',
                'category' => 'rent',
                'amount' => 1500,
                'description' => 'Office Rent for ' . now()->format('F Y'),
                'transaction_date' => now()->startOfMonth(),
            ]);
        }

        if (Transaction::where('category', 'utilities')->where('description', 'Electricity & Water Bill')->doesntExist()) {
            Transaction::create([
                'type' => 'expense',
                'category' => 'utilities',
                'amount' => 250.50,
                'description' => 'Electricity & Water Bill',
                'transaction_date' => now()->subDays(1),
            ]);
        }

        if (Transaction::where('category', 'salaries')->where('description', 'Staff Salaries')->doesntExist()) {
            Transaction::create([
                'type' => 'expense',
                'category' => 'salaries',
                'amount' => 3500,
                'description' => 'Staff Salaries',
                'transaction_date' => now()->startOfMonth()->addDays(25), // Forecasted or last month
            ]);
        }

        $this->command->info('✅ Sales, Finance & Expenses seeded');

        $this->command->info('🎉 Demo Data Seeding Complete!');
    }
}
