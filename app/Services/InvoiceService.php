<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Receipt;
use App\Services\FinanceService;
use Illuminate\Support\Facades\DB;
use Exception;

class InvoiceService
{
    public function __construct(
        protected FinanceService $financeService
    ) {
    }

    /**
     * Generate unique Invoice number
     */
    public function generateInvoiceNumber(): string
    {
        $prefix = config('company.doc_prefix', 'ZAS');
        $yy = now()->format('y');
        $mm = now()->format('m');
        $docPrefix = "{$prefix}{$yy}{$mm}/";

        $lastInvoice = Invoice::where('invoice_number', 'like', "{$docPrefix}%")
            ->orderByRaw("CAST(SUBSTRING(invoice_number FROM LENGTH(?) + 1) AS INTEGER) DESC", [$docPrefix])
            ->first();

        if ($lastInvoice) {
            $lastNumber = (int) substr($lastInvoice->invoice_number, strlen($docPrefix));
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return $docPrefix . $newNumber;
    }

    /**
     * Create Invoice
     */
    public function createInvoice(array $data): Invoice
    {
        return DB::transaction(function () use ($data) {
            $invoiceNumber = $this->generateInvoiceNumber();

            // Calculate totals
            $subtotal = 0;
            foreach ($data['items'] as $item) {
                $subtotal += $item['quantity'] * $item['unit_price'];
            }

            $taxRate = $data['tax_rate'] ?? 0;
            $taxAmount = $subtotal * ($taxRate / 100);
            $totalAmount = $subtotal + $taxAmount;

            $invoice = Invoice::create([
                'invoice_number' => $invoiceNumber,
                'delivery_order_id' => $data['delivery_order_id'] ?? null,
                'customer_id' => $data['customer_id'],
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'total_amount' => $totalAmount,
                'payment_status' => 'unpaid',
                'due_date' => $data['due_date'],
                'notes' => $data['notes'] ?? null,
            ]);

            foreach ($data['items'] as $item) {
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'sku_id' => $item['sku_id'],
                    'description' => $item['description'] ?? null,
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['quantity'] * $item['unit_price'],
                ]);
            }

            // Record revenue transaction
            $this->financeService->recordInvoiceRevenue($invoice);

            return $invoice->fresh(['items.sku', 'customer', 'deliveryOrder']);
        });
    }

    /**
     * Record payment (Receipt)
     */
    public function recordPayment(Invoice $invoice, array $data): Receipt
    {
        return DB::transaction(function () use ($invoice, $data) {
            $receiptNumber = $this->generateReceiptNumber();

            $receipt = Receipt::create([
                'receipt_number' => $receiptNumber,
                'invoice_id' => $invoice->id,
                'payment_method' => $data['payment_method'],
                'amount_paid' => $data['amount_paid'],
                'payment_date' => $data['payment_date'] ?? now(),
                'notes' => $data['notes'] ?? null,
            ]);

            // Update invoice payment status
            $totalPaid = $invoice->receipts()->sum('amount_paid');

            if ($totalPaid >= $invoice->total_amount) {
                $invoice->update(['payment_status' => 'paid']);
            } elseif ($totalPaid > 0) {
                $invoice->update(['payment_status' => 'partial']);
            }

            return $receipt->fresh(['invoice']);
        });
    }

    /**
     * Generate unique Receipt number
     */
    public function generateReceiptNumber(): string
    {
        $prefix = config('company.doc_prefix', 'ZAS');
        $yy = now()->format('y');
        $mm = now()->format('m');
        $docPrefix = "{$prefix}R{$yy}{$mm}/";

        $lastReceipt = Receipt::where('receipt_number', 'like', "{$docPrefix}%")
            ->orderByRaw("CAST(SUBSTRING(receipt_number FROM LENGTH(?) + 1) AS INTEGER) DESC", [$docPrefix])
            ->first();

        if ($lastReceipt) {
            $lastNumber = (int) substr($lastReceipt->receipt_number, strlen($docPrefix));
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return $docPrefix . $newNumber;
    }
}
