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
use App\Models\Quotation;
use App\Models\QuotationItem;
use App\Models\SupplierInvoice;
use App\Models\SupplierInvoiceItem;
use Carbon\Carbon;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $prefix = config('company.doc_prefix', 'ZAS');
        $yy = now()->format('y');
        $mm = now()->format('m');

        $this->command->info('Seeding Demo Data...');

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
        $this->command->info('Users seeded');

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
        $this->command->info('Suppliers seeded');

        // 3. Customers
        $customers = [
            ['name' => 'Alpha Corp', 'company_name' => 'Alpha Corp Sdn Bhd', 'email' => 'procurement@alphacorp.com', 'phone' => '03-55551111', 'address' => 'Menara Alpha, KL'],
            ['name' => 'Beta Ventures', 'company_name' => 'Beta Ventures Sdn Bhd', 'email' => 'finance@beta.com', 'phone' => '03-55552222', 'address' => 'Suite 2-B, Mid Valley'],
            ['name' => 'Gamma SME', 'company_name' => 'Gamma SME Enterprise', 'email' => 'boss@gamma.com', 'phone' => '019-8887777', 'address' => '12, Shoplot 3, Puchong'],
            ['name' => 'Delta Trading', 'company_name' => 'Delta Trading Sdn Bhd', 'email' => 'order@deltatrading.com', 'phone' => '03-66669999', 'address' => '56, Jalan Industri, Klang'],
        ];

        foreach ($customers as $c) {
            Customer::firstOrCreate(['email' => $c['email']], $c);
        }
        $customerModels = Customer::all();
        $this->command->info('Customers seeded');

        // 4. Categories & SKUs (Inventory)
        $categories = [
            'Laptops' => [
                ['sku_code' => 'NB-DELL-5420', 'name' => 'Dell Latitude 5420', 'description' => 'Business Laptop, i5, 8GB RAM, 256GB SSD', 'price' => 3200, 'cost' => 2500, 'stock' => 15, 'unit' => 'unit'],
                ['sku_code' => 'NB-HP-440', 'name' => 'HP ProBook 440 G8', 'description' => 'Business Laptop, i5, 16GB RAM, 512GB SSD', 'price' => 3500, 'cost' => 2800, 'stock' => 8, 'unit' => 'unit'],
                ['sku_code' => 'NB-LENOVO-T14', 'name' => 'Lenovo ThinkPad T14', 'description' => 'Business Laptop, i7, 16GB RAM, 512GB SSD', 'price' => 4200, 'cost' => 3300, 'stock' => 5, 'unit' => 'unit'],
            ],
            'Peripherals' => [
                ['sku_code' => 'PER-LOG-M170', 'name' => 'Logitech M170 Mouse', 'description' => 'Wireless Mouse', 'price' => 45, 'cost' => 25, 'stock' => 50, 'unit' => 'unit'],
                ['sku_code' => 'PER-LOG-K120', 'name' => 'Logitech K120 Keyboard', 'description' => 'USB Wired Keyboard', 'price' => 35, 'cost' => 20, 'stock' => 45, 'unit' => 'unit'],
                ['sku_code' => 'MON-DELL-24', 'name' => 'Dell E2422H Monitor', 'description' => '24-inch FHD Monitor', 'price' => 550, 'cost' => 400, 'stock' => 12, 'unit' => 'unit'],
                ['sku_code' => 'PER-HDMI-2M', 'name' => 'HDMI Cable 2M', 'description' => 'HDMI 2.0 Cable 2 Meter', 'price' => 25, 'cost' => 10, 'stock' => 100, 'unit' => 'unit'],
            ],
            'Software' => [
                ['sku_code' => 'SOFT-OFF-365', 'name' => 'Office 365 Business', 'description' => '1 Year Subscription', 'price' => 450, 'cost' => 380, 'stock' => 100, 'unit' => 'license'],
                ['sku_code' => 'SOFT-WIN-11', 'name' => 'Windows 11 Pro', 'description' => 'OEM License', 'price' => 650, 'cost' => 500, 'stock' => 30, 'unit' => 'license'],
            ],
            'Networking' => [
                ['sku_code' => 'NET-TPLINK-8P', 'name' => 'TP-Link 8-Port Switch', 'description' => '8-Port Gigabit Ethernet Switch', 'price' => 120, 'cost' => 75, 'stock' => 20, 'unit' => 'unit'],
                ['sku_code' => 'NET-CAT6-30M', 'name' => 'Cat6 Cable 30M', 'description' => 'Cat6 UTP Cable 30 Meter', 'price' => 45, 'cost' => 22, 'stock' => 3, 'unit' => 'unit'],
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
        $this->command->info('Inventory seeded (' . $allSkus->count() . ' SKUs)');

        // 5. Purchase Orders (ZAS format)
        $po1 = PurchaseOrder::where('po_number', "{$prefix}P{$yy}{$mm}/1")->first();
        if (!$po1) {
            $po1 = PurchaseOrder::create([
                'po_number' => "{$prefix}P{$yy}{$mm}/1",
                'supplier_id' => $supplierModels[0]->id,
                'status' => 'received',
                'total_amount' => 14000,
                'notes' => 'Initial stock for Dell Laptops & Monitors',
                'created_by' => $admin->id,
                'approved_by' => $admin->id,
                'approved_at' => now()->subDays(10),
                'created_at' => now()->subDays(12),
            ]);
            PurchaseOrderItem::create([
                'purchase_order_id' => $po1->id,
                'sku_id' => $allSkus->where('sku_code', 'NB-DELL-5420')->first()->id,
                'quantity' => 5,
                'unit_price' => 2500,
                'total_price' => 12500,
            ]);
            PurchaseOrderItem::create([
                'purchase_order_id' => $po1->id,
                'sku_id' => $allSkus->where('sku_code', 'MON-DELL-24')->first()->id,
                'quantity' => 5,
                'unit_price' => 300,
                'total_price' => 1500,
            ]);
        }

        $po2 = PurchaseOrder::where('po_number', "{$prefix}P{$yy}{$mm}/2")->first();
        if (!$po2) {
            $po2 = PurchaseOrder::create([
                'po_number' => "{$prefix}P{$yy}{$mm}/2",
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

        $po3 = PurchaseOrder::where('po_number', "{$prefix}P{$yy}{$mm}/3")->first();
        if (!$po3) {
            $po3 = PurchaseOrder::create([
                'po_number' => "{$prefix}P{$yy}{$mm}/3",
                'supplier_id' => $supplierModels[2]->id,
                'status' => 'approved',
                'total_amount' => 6600,
                'notes' => 'Networking equipment restock',
                'created_by' => $admin->id,
                'approved_by' => $admin->id,
                'approved_at' => now()->subDays(1),
                'created_at' => now()->subDays(3),
            ]);
            PurchaseOrderItem::create([
                'purchase_order_id' => $po3->id,
                'sku_id' => $allSkus->where('sku_code', 'NET-TPLINK-8P')->first()->id,
                'quantity' => 20,
                'unit_price' => 75,
                'total_price' => 1500,
            ]);
            PurchaseOrderItem::create([
                'purchase_order_id' => $po3->id,
                'sku_id' => $allSkus->where('sku_code', 'NET-CAT6-30M')->first()->id,
                'quantity' => 50,
                'unit_price' => 22,
                'total_price' => 1100,
            ]);
            PurchaseOrderItem::create([
                'purchase_order_id' => $po3->id,
                'sku_id' => $allSkus->where('sku_code', 'NB-LENOVO-T14')->first()->id,
                'quantity' => 4,
                'unit_price' => 1000, // deal price
                'total_price' => 4000,
            ]);
        }
        $this->command->info('Purchase Orders seeded');

        // 6. Supplier Invoices (ZAS format)
        // SI 1: Confirmed (linked to PO1 - received)
        $si1 = SupplierInvoice::where('supplier_invoice_number', "{$prefix}SI{$yy}{$mm}/1")->first();
        if (!$si1) {
            $si1 = SupplierInvoice::create([
                'supplier_invoice_number' => "{$prefix}SI{$yy}{$mm}/1",
                'supplier_ref_number' => 'TD-INV-2026-0088',
                'supplier_id' => $supplierModels[0]->id,
                'purchase_order_id' => $po1->id,
                'total_amount' => 14000,
                'status' => 'confirmed',
                'invoice_date' => now()->subDays(9),
                'notes' => 'From PO ' . $po1->po_number,
                'created_by' => $admin->id,
            ]);
            SupplierInvoiceItem::create([
                'supplier_invoice_id' => $si1->id,
                'sku_id' => $allSkus->where('sku_code', 'NB-DELL-5420')->first()->id,
                'quantity' => 5,
                'unit_cost' => 2500,
                'total_cost' => 12500,
            ]);
            SupplierInvoiceItem::create([
                'supplier_invoice_id' => $si1->id,
                'sku_id' => $allSkus->where('sku_code', 'MON-DELL-24')->first()->id,
                'quantity' => 5,
                'unit_cost' => 300,
                'total_cost' => 1500,
            ]);

            // Expense transaction for confirmed SI
            Transaction::create([
                'type' => 'expense',
                'category' => 'purchase',
                'amount' => 14000,
                'description' => "Supplier Invoice {$si1->supplier_invoice_number} - TechDistrio Sdn Bhd",
                'reference_type' => 'supplier_invoice',
                'reference_id' => $si1->id,
                'transaction_date' => now()->subDays(9),
            ]);
        }

        // SI 2: Draft (standalone, no PO)
        $si2 = SupplierInvoice::where('supplier_invoice_number', "{$prefix}SI{$yy}{$mm}/2")->first();
        if (!$si2) {
            $si2 = SupplierInvoice::create([
                'supplier_invoice_number' => "{$prefix}SI{$yy}{$mm}/2",
                'supplier_ref_number' => 'MB-2026-0055',
                'supplier_id' => $supplierModels[1]->id,
                'purchase_order_id' => null,
                'total_amount' => 1900,
                'status' => 'draft',
                'invoice_date' => now()->subDays(1),
                'notes' => 'Peripherals restock from MegaBytes',
                'created_by' => $staff->id,
            ]);
            SupplierInvoiceItem::create([
                'supplier_invoice_id' => $si2->id,
                'sku_id' => $allSkus->where('sku_code', 'PER-LOG-M170')->first()->id,
                'quantity' => 20,
                'unit_cost' => 25,
                'total_cost' => 500,
            ]);
            SupplierInvoiceItem::create([
                'supplier_invoice_id' => $si2->id,
                'sku_id' => $allSkus->where('sku_code', 'PER-LOG-K120')->first()->id,
                'quantity' => 20,
                'unit_cost' => 20,
                'total_cost' => 400,
            ]);
            SupplierInvoiceItem::create([
                'supplier_invoice_id' => $si2->id,
                'sku_id' => $allSkus->where('sku_code', 'PER-HDMI-2M')->first()->id,
                'quantity' => 100,
                'unit_cost' => 10,
                'total_cost' => 1000,
            ]);
        }
        $this->command->info('Supplier Invoices seeded');

        // 7. Delivery Orders & Invoices (Sales Cycle)

        // DO 1: Completed cycle (DO -> Invoice -> Paid)
        $do1 = DeliveryOrder::where('do_number', "{$prefix}D{$yy}{$mm}/1")->first();
        if (!$do1) {
            $do1 = DeliveryOrder::create([
                'do_number' => "{$prefix}D{$yy}{$mm}/1",
                'purchase_order_id' => null,
                'customer_id' => $customerModels[0]->id,
                'status' => 'delivered',
                'delivery_date' => now()->subDays(5),
                'notes' => 'Delivered to reception',
                'created_at' => now()->subDays(6),
            ]);
            DeliveryOrderItem::create([
                'delivery_order_id' => $do1->id,
                'sku_id' => $allSkus->where('sku_code', 'NB-DELL-5420')->first()->id,
                'quantity' => 2,
                'unit_price' => 3200,
                'total_price' => 6400,
            ]);

            Transaction::create([
                'type' => 'cogs',
                'category' => 'cost_of_sales',
                'amount' => 2 * 2500,
                'description' => "COGS for NB-DELL-5420 - 2 units",
                'reference_type' => 'delivery_order',
                'reference_id' => $do1->id,
                'transaction_date' => now()->subDays(5),
            ]);
        }

        $inv1 = Invoice::where('invoice_number', "{$prefix}{$yy}{$mm}/1")->first();
        if (!$inv1 && $do1) {
            $inv1 = Invoice::create([
                'invoice_number' => "{$prefix}{$yy}{$mm}/1",
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
                'description' => 'Dell Latitude 5420 Laptop',
            ]);

            Receipt::create([
                'receipt_number' => "{$prefix}R{$yy}{$mm}/1",
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

        // DO 2: Pending payment (DO -> Invoice -> Unpaid)
        $do2 = DeliveryOrder::where('do_number', "{$prefix}D{$yy}{$mm}/2")->first();
        if (!$do2) {
            $do2 = DeliveryOrder::create([
                'do_number' => "{$prefix}D{$yy}{$mm}/2",
                'purchase_order_id' => null,
                'customer_id' => $customerModels[1]->id,
                'status' => 'delivered',
                'delivery_date' => now()->subDays(2),
                'created_at' => now()->subDays(3),
            ]);
            DeliveryOrderItem::create([
                'delivery_order_id' => $do2->id,
                'sku_id' => $allSkus->where('sku_code', 'SOFT-OFF-365')->first()->id,
                'quantity' => 10,
                'unit_price' => 450,
                'total_price' => 4500,
            ]);

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

        $inv2 = Invoice::where('invoice_number', "{$prefix}{$yy}{$mm}/2")->first();
        if (!$inv2 && $do2) {
            $inv2 = Invoice::create([
                'invoice_number' => "{$prefix}{$yy}{$mm}/2",
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
                'description' => 'Office 365 Business Subscription',
            ]);

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

        // DO 3: Pending delivery
        $do3 = DeliveryOrder::where('do_number', "{$prefix}D{$yy}{$mm}/3")->first();
        if (!$do3) {
            $do3 = DeliveryOrder::create([
                'do_number' => "{$prefix}D{$yy}{$mm}/3",
                'purchase_order_id' => null,
                'customer_id' => $customerModels[2]->id,
                'status' => 'pending',
                'delivery_date' => now()->addDays(2),
                'notes' => 'Customer requested afternoon delivery',
                'created_at' => now()->subDays(1),
            ]);
            DeliveryOrderItem::create([
                'delivery_order_id' => $do3->id,
                'sku_id' => $allSkus->where('sku_code', 'NB-LENOVO-T14')->first()->id,
                'quantity' => 1,
                'unit_price' => 4200,
                'total_price' => 4200,
            ]);
            DeliveryOrderItem::create([
                'delivery_order_id' => $do3->id,
                'sku_id' => $allSkus->where('sku_code', 'PER-LOG-M170')->first()->id,
                'quantity' => 1,
                'unit_price' => 45,
                'total_price' => 45,
            ]);
            DeliveryOrderItem::create([
                'delivery_order_id' => $do3->id,
                'sku_id' => $allSkus->where('sku_code', 'PER-LOG-K120')->first()->id,
                'quantity' => 1,
                'unit_price' => 35,
                'total_price' => 35,
            ]);
        }
        $this->command->info('Delivery Orders & Invoices seeded');

        // 8. Quotations (ZAS format)

        // QUO 1: Accepted (ready to convert)
        $quo1 = Quotation::where('quotation_number', "{$prefix}Q{$yy}{$mm}/1")->first();
        if (!$quo1) {
            $quo1 = Quotation::create([
                'quotation_number' => "{$prefix}Q{$yy}{$mm}/1",
                'customer_id' => $customerModels[3]->id, // Delta Trading
                'subtotal' => 18200,
                'tax_amount' => 0,
                'total_amount' => 18200,
                'status' => 'accepted',
                'valid_until' => now()->addDays(14),
                'show_date_on_pdf' => true,
                'notes' => 'Bulk laptop order for new office setup',
                'created_by' => $admin->id,
                'created_at' => now()->subDays(3),
            ]);
            QuotationItem::create([
                'quotation_id' => $quo1->id,
                'sku_id' => $allSkus->where('sku_code', 'NB-DELL-5420')->first()->id,
                'description' => 'Dell Latitude 5420 - Business Laptop',
                'quantity' => 3,
                'unit_price' => 3200,
                'total_price' => 9600,
            ]);
            QuotationItem::create([
                'quotation_id' => $quo1->id,
                'sku_id' => $allSkus->where('sku_code', 'MON-DELL-24')->first()->id,
                'description' => 'Dell 24" Monitor',
                'quantity' => 3,
                'unit_price' => 550,
                'total_price' => 1650,
            ]);
            QuotationItem::create([
                'quotation_id' => $quo1->id,
                'sku_id' => $allSkus->where('sku_code', 'SOFT-OFF-365')->first()->id,
                'description' => 'Office 365 Business - 1 Year',
                'quantity' => 3,
                'unit_price' => 450,
                'total_price' => 1350,
            ]);
            QuotationItem::create([
                'quotation_id' => $quo1->id,
                'sku_id' => $allSkus->where('sku_code', 'SOFT-WIN-11')->first()->id,
                'description' => 'Windows 11 Pro OEM',
                'quantity' => 3,
                'unit_price' => 650,
                'total_price' => 1950,
            ]);
            QuotationItem::create([
                'quotation_id' => $quo1->id,
                'sku_id' => $allSkus->where('sku_code', 'PER-LOG-M170')->first()->id,
                'description' => 'Wireless Mouse',
                'quantity' => 3,
                'unit_price' => 45,
                'total_price' => 135,
            ]);
            QuotationItem::create([
                'quotation_id' => $quo1->id,
                'sku_id' => $allSkus->where('sku_code', 'PER-LOG-K120')->first()->id,
                'description' => 'USB Keyboard',
                'quantity' => 3,
                'unit_price' => 35,
                'total_price' => 105,
            ]);
            QuotationItem::create([
                'quotation_id' => $quo1->id,
                'sku_id' => $allSkus->where('sku_code', 'NET-TPLINK-8P')->first()->id,
                'description' => '8-Port Network Switch',
                'quantity' => 1,
                'unit_price' => 120,
                'total_price' => 120,
            ]);
            QuotationItem::create([
                'quotation_id' => $quo1->id,
                'sku_id' => $allSkus->where('sku_code', 'PER-HDMI-2M')->first()->id,
                'description' => 'HDMI Cable',
                'quantity' => 6,
                'unit_price' => 25,
                'total_price' => 150,
            ]);
            // Recalc: 9600+1650+1350+1950+135+105+120+150 = 15060
            // Fix total
            $realTotal = 9600 + 1650 + 1350 + 1950 + 135 + 105 + 120 + 150;
            $quo1->update(['subtotal' => $realTotal, 'total_amount' => $realTotal]);
        }

        // QUO 2: Draft (new quotation)
        $quo2 = Quotation::where('quotation_number', "{$prefix}Q{$yy}{$mm}/2")->first();
        if (!$quo2) {
            $quo2 = Quotation::create([
                'quotation_number' => "{$prefix}Q{$yy}{$mm}/2",
                'customer_id' => $customerModels[2]->id, // Gamma SME
                'subtotal' => 4700,
                'tax_amount' => 0,
                'total_amount' => 4700,
                'status' => 'draft',
                'valid_until' => now()->addDays(30),
                'show_date_on_pdf' => true,
                'notes' => 'Single workstation setup for boss room',
                'created_by' => $staff->id,
                'created_at' => now()->subDays(1),
            ]);
            QuotationItem::create([
                'quotation_id' => $quo2->id,
                'sku_id' => $allSkus->where('sku_code', 'NB-LENOVO-T14')->first()->id,
                'description' => 'ThinkPad T14 - Premium Laptop',
                'quantity' => 1,
                'unit_price' => 4200,
                'total_price' => 4200,
            ]);
            QuotationItem::create([
                'quotation_id' => $quo2->id,
                'sku_id' => $allSkus->where('sku_code', 'PER-LOG-M170')->first()->id,
                'description' => 'Wireless Mouse',
                'quantity' => 1,
                'unit_price' => 45,
                'total_price' => 45,
            ]);
            QuotationItem::create([
                'quotation_id' => $quo2->id,
                'sku_id' => $allSkus->where('sku_code', 'SOFT-OFF-365')->first()->id,
                'description' => 'Office 365 - 1 Year License',
                'quantity' => 1,
                'unit_price' => 450,
                'total_price' => 450,
            ]);
            // Fix: 4200+45+450 = 4695
            $realTotal2 = 4200 + 45 + 450;
            $quo2->update(['subtotal' => $realTotal2, 'total_amount' => $realTotal2]);
        }

        // QUO 3: Sent (waiting for customer response)
        $quo3 = Quotation::where('quotation_number', "{$prefix}Q{$yy}{$mm}/3")->first();
        if (!$quo3) {
            $quo3 = Quotation::create([
                'quotation_number' => "{$prefix}Q{$yy}{$mm}/3",
                'customer_id' => $customerModels[0]->id, // Alpha Corp
                'subtotal' => 7000,
                'tax_amount' => 0,
                'total_amount' => 7000,
                'status' => 'sent',
                'valid_until' => now()->addDays(7),
                'show_date_on_pdf' => false,
                'notes' => 'Follow-up order for additional HP laptops',
                'created_by' => $admin->id,
                'created_at' => now()->subDays(2),
            ]);
            QuotationItem::create([
                'quotation_id' => $quo3->id,
                'sku_id' => $allSkus->where('sku_code', 'NB-HP-440')->first()->id,
                'description' => 'HP ProBook 440 G8',
                'quantity' => 2,
                'unit_price' => 3500,
                'total_price' => 7000,
            ]);
        }

        // QUO 4: Converted (already turned into invoice)
        $quo4 = Quotation::where('quotation_number', "{$prefix}Q{$yy}{$mm}/4")->first();
        if (!$quo4) {
            // Create invoice first from quotation
            $inv3 = Invoice::where('invoice_number', "{$prefix}{$yy}{$mm}/3")->first();
            if (!$inv3) {
                $inv3 = Invoice::create([
                    'invoice_number' => "{$prefix}{$yy}{$mm}/3",
                    'customer_id' => $customerModels[1]->id, // Beta Ventures
                    'payment_status' => 'unpaid',
                    'subtotal' => 1300,
                    'tax_amount' => 0,
                    'total_amount' => 1300,
                    'due_date' => now()->addDays(14),
                    'notes' => 'Converted from quotation',
                    'created_at' => now()->subDays(1),
                ]);
                InvoiceItem::create([
                    'invoice_id' => $inv3->id,
                    'sku_id' => $allSkus->where('sku_code', 'SOFT-WIN-11')->first()->id,
                    'quantity' => 2,
                    'unit_price' => 650,
                    'total_price' => 1300,
                    'description' => 'Windows 11 Pro OEM License',
                ]);

                Transaction::create([
                    'type' => 'revenue',
                    'category' => 'sales',
                    'amount' => 1300,
                    'description' => "Revenue from Invoice {$inv3->invoice_number}",
                    'reference_type' => 'invoice',
                    'reference_id' => $inv3->id,
                    'transaction_date' => now()->subDays(1),
                ]);
            }

            $quo4 = Quotation::create([
                'quotation_number' => "{$prefix}Q{$yy}{$mm}/4",
                'customer_id' => $customerModels[1]->id,
                'subtotal' => 1300,
                'tax_amount' => 0,
                'total_amount' => 1300,
                'status' => 'converted',
                'valid_until' => now()->addDays(7),
                'show_date_on_pdf' => true,
                'notes' => 'Windows licenses for Beta Ventures',
                'converted_invoice_id' => $inv3->id,
                'created_by' => $admin->id,
                'created_at' => now()->subDays(4),
            ]);
            QuotationItem::create([
                'quotation_id' => $quo4->id,
                'sku_id' => $allSkus->where('sku_code', 'SOFT-WIN-11')->first()->id,
                'description' => 'Windows 11 Pro OEM License',
                'quantity' => 2,
                'unit_price' => 650,
                'total_price' => 1300,
            ]);

            // Link invoice back to quotation
            if ($inv3) {
                $inv3->update(['quotation_id' => $quo4->id]);
            }
        }
        $this->command->info('Quotations seeded');

        // 9. Manual Expenses (Rent, Utilities, Salaries)
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
                'transaction_date' => now()->startOfMonth()->addDays(25),
            ]);
        }

        $this->command->info('Finance & Expenses seeded');
        $this->command->info('Demo Data Seeding Complete!');
    }
}
