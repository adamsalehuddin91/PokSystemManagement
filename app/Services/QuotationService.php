<?php

namespace App\Services;

use App\Models\Quotation;
use App\Models\QuotationItem;
use App\Services\InvoiceService;
use Illuminate\Support\Facades\DB;
use Exception;

class QuotationService
{
    public function __construct(
        protected InvoiceService $invoiceService
    ) {
    }

    public function generateQuotationNumber(): string
    {
        $prefix = config('company.doc_prefix', 'ZAS');
        $yy = now()->format('y');
        $mm = now()->format('m');
        $docPrefix = "{$prefix}Q{$yy}{$mm}/";

        $last = Quotation::where('quotation_number', 'like', "{$docPrefix}%")
            ->orderByRaw("CAST(SUBSTRING(quotation_number FROM LENGTH(?) + 1) AS INTEGER) DESC", [$docPrefix])
            ->first();

        if ($last) {
            $lastNumber = (int) substr($last->quotation_number, strlen($docPrefix));
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return $docPrefix . $newNumber;
    }

    public function createQuotation(array $data): Quotation
    {
        return DB::transaction(function () use ($data) {
            $quotationNumber = $this->generateQuotationNumber();

            $subtotal = 0;
            foreach ($data['items'] as $item) {
                $subtotal += $item['quantity'] * $item['unit_price'];
            }

            $taxRate = $data['tax_rate'] ?? 0;
            $taxAmount = $subtotal * ($taxRate / 100);
            $totalAmount = $subtotal + $taxAmount;

            $quotation = Quotation::create([
                'quotation_number' => $quotationNumber,
                'customer_id' => $data['customer_id'],
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'total_amount' => $totalAmount,
                'status' => 'draft',
                'valid_until' => $data['valid_until'] ?? null,
                'show_date_on_pdf' => $data['show_date_on_pdf'] ?? true,
                'notes' => $data['notes'] ?? null,
                'created_by' => auth()->id(),
            ]);

            foreach ($data['items'] as $item) {
                QuotationItem::create([
                    'quotation_id' => $quotation->id,
                    'sku_id' => $item['sku_id'],
                    'description' => $item['description'] ?? null,
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['quantity'] * $item['unit_price'],
                ]);
            }

            return $quotation->fresh(['items.sku', 'customer']);
        });
    }

    public function updateQuotation(Quotation $quotation, array $data): Quotation
    {
        return DB::transaction(function () use ($quotation, $data) {
            $subtotal = 0;
            foreach ($data['items'] as $item) {
                $subtotal += $item['quantity'] * $item['unit_price'];
            }

            $taxRate = $data['tax_rate'] ?? 0;
            $taxAmount = $subtotal * ($taxRate / 100);
            $totalAmount = $subtotal + $taxAmount;

            $quotation->update([
                'customer_id' => $data['customer_id'],
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'total_amount' => $totalAmount,
                'valid_until' => $data['valid_until'] ?? null,
                'show_date_on_pdf' => $data['show_date_on_pdf'] ?? true,
                'notes' => $data['notes'] ?? null,
            ]);

            // Delete old items and recreate
            $quotation->items()->delete();

            foreach ($data['items'] as $item) {
                QuotationItem::create([
                    'quotation_id' => $quotation->id,
                    'sku_id' => $item['sku_id'],
                    'description' => $item['description'] ?? null,
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['quantity'] * $item['unit_price'],
                ]);
            }

            return $quotation->fresh(['items.sku', 'customer']);
        });
    }

    public function updateStatus(Quotation $quotation, string $status): Quotation
    {
        $quotation->update(['status' => $status]);
        return $quotation->fresh();
    }

    public function convertToInvoice(Quotation $quotation): \App\Models\Invoice
    {
        return DB::transaction(function () use ($quotation) {
            $quotation->load(['items.sku', 'customer']);

            // Build invoice data from quotation
            $invoiceData = [
                'customer_id' => $quotation->customer_id,
                'quotation_id' => $quotation->id,
                'due_date' => now()->addDays(30)->toDateString(),
                'tax_rate' => $quotation->subtotal > 0
                    ? ($quotation->tax_amount / $quotation->subtotal) * 100
                    : 0,
                'notes' => $quotation->notes
                    ? "From {$quotation->quotation_number}. {$quotation->notes}"
                    : "From {$quotation->quotation_number}",
                'items' => $quotation->items->map(function ($item) {
                    return [
                        'sku_id' => $item->sku_id,
                        'description' => $item->description,
                        'quantity' => $item->quantity,
                        'unit_price' => $item->unit_price,
                    ];
                })->toArray(),
            ];

            $invoice = $this->invoiceService->createInvoice($invoiceData);

            // Link quotation to invoice
            $invoice->update(['quotation_id' => $quotation->id]);
            $quotation->update([
                'status' => 'converted',
                'converted_invoice_id' => $invoice->id,
            ]);

            return $invoice;
        });
    }
}
