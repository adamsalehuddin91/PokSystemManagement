<?php

namespace App\Services;

use App\Models\SupplierInvoice;
use App\Models\SupplierInvoiceItem;
use App\Models\Sku;
use App\Services\InventoryService;
use App\Services\FinanceService;
use Illuminate\Support\Facades\DB;
use Exception;

class SupplierInvoiceService
{
    public function __construct(
        protected InventoryService $inventoryService,
        protected FinanceService $financeService
    ) {
    }

    public function generateNumber(): string
    {
        $prefix = config('company.doc_prefix', 'ZAS');
        $yy = now()->format('y');
        $mm = now()->format('m');
        $docPrefix = "{$prefix}SI{$yy}{$mm}/";

        $last = SupplierInvoice::where('supplier_invoice_number', 'like', "{$docPrefix}%")
            ->orderByRaw("CAST(SUBSTRING(supplier_invoice_number FROM LENGTH(?) + 1) AS INTEGER) DESC", [$docPrefix])
            ->first();

        if ($last) {
            $lastNumber = (int) substr($last->supplier_invoice_number, strlen($docPrefix));
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return $docPrefix . $newNumber;
    }

    public function createSupplierInvoice(array $data): SupplierInvoice
    {
        return DB::transaction(function () use ($data) {
            $number = $this->generateNumber();

            $totalAmount = 0;
            foreach ($data['items'] as $item) {
                $totalAmount += $item['quantity'] * $item['unit_cost'];
            }

            $invoice = SupplierInvoice::create([
                'supplier_invoice_number' => $number,
                'supplier_ref_number' => $data['supplier_ref_number'] ?? null,
                'supplier_id' => $data['supplier_id'],
                'purchase_order_id' => $data['purchase_order_id'] ?? null,
                'total_amount' => $totalAmount,
                'status' => 'draft',
                'invoice_date' => $data['invoice_date'],
                'notes' => $data['notes'] ?? null,
                'created_by' => auth()->id(),
            ]);

            foreach ($data['items'] as $item) {
                SupplierInvoiceItem::create([
                    'supplier_invoice_id' => $invoice->id,
                    'sku_id' => $item['sku_id'],
                    'quantity' => $item['quantity'],
                    'unit_cost' => $item['unit_cost'],
                    'total_cost' => $item['quantity'] * $item['unit_cost'],
                ]);
            }

            return $invoice->fresh(['items.sku', 'supplier', 'purchaseOrder']);
        });
    }

    public function confirmInvoice(SupplierInvoice $invoice): SupplierInvoice
    {
        if ($invoice->status !== 'draft') {
            throw new Exception('Only draft supplier invoices can be confirmed');
        }

        return DB::transaction(function () use ($invoice) {
            $invoice->load('items.sku');

            // Add stock for each item and update cost_price
            foreach ($invoice->items as $item) {
                // Add stock
                $this->inventoryService->addStock(
                    $item->sku,
                    $item->quantity,
                    'supplier_invoice',
                    $invoice->id,
                    "Supplier Invoice {$invoice->supplier_invoice_number}"
                );

                // Update SKU cost_price with latest purchase cost
                $item->sku->update(['cost_price' => $item->unit_cost]);
            }

            // Record expense in finance
            $this->financeService->recordExpense([
                'category' => 'purchase',
                'amount' => $invoice->total_amount,
                'description' => "Supplier Invoice {$invoice->supplier_invoice_number}",
                'reference_type' => 'supplier_invoice',
                'reference_id' => $invoice->id,
            ]);

            // Update status
            $invoice->update(['status' => 'confirmed']);

            // Mark linked PO as received if exists
            if ($invoice->purchase_order_id) {
                $po = $invoice->purchaseOrder;
                if ($po && $po->status === 'approved') {
                    app(PurchaseOrderService::class)->markAsReceived($po);
                }
            }

            return $invoice->fresh(['items.sku', 'supplier']);
        });
    }
}
