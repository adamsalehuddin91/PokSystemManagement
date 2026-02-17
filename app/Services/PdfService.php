<?php

namespace App\Services;

use App\Models\PurchaseOrder;
use App\Models\Invoice;
use App\Models\DeliveryOrder;
use App\Models\Quotation;
use Barryvdh\DomPDF\Facade\Pdf;

class PdfService
{
    /**
     * Generate Purchase Order PDF
     */
    public function generatePurchaseOrderPdf(PurchaseOrder $po)
    {
        $po->load(['supplier', 'items.sku', 'creator', 'approver']);

        $pdf = Pdf::loadView('pdf.purchase-order', ['po' => $po])
            ->setPaper('a4', 'portrait');

        return $pdf;
    }

    /**
     * Generate Invoice PDF
     */
    public function generateInvoicePdf(Invoice $invoice)
    {
        $invoice->load(['customer', 'items.sku', 'deliveryOrder', 'receipts']);

        $pdf = Pdf::loadView('pdf.invoice', ['invoice' => $invoice])
            ->setPaper('a4', 'portrait');

        return $pdf;
    }

    /**
     * Generate Quotation PDF
     */
    public function generateQuotationPdf(Quotation $quotation)
    {
        $quotation->load(['customer', 'items.sku', 'creator']);

        $pdf = Pdf::loadView('pdf.quotation', ['quotation' => $quotation])
            ->setPaper('a4', 'portrait');

        return $pdf;
    }

    /**
     * Generate Delivery Order PDF
     */
    public function generateDeliveryOrderPdf(DeliveryOrder $deliveryOrder)
    {
        $deliveryOrder->load(['customer', 'items.sku', 'purchaseOrder']);

        $pdf = Pdf::loadView('pdf.delivery-order', ['deliveryOrder' => $deliveryOrder])
            ->setPaper('a4', 'portrait');

        return $pdf;
    }

    /**
     * Stream PDF inline (view in browser)
     */
    public function streamPdf($pdf, string $filename)
    {
        return $pdf->stream(str_replace(['/', '\\'], '-', $filename));
    }

    /**
     * Download PDF
     */
    public function downloadPdf($pdf, string $filename)
    {
        return $pdf->download(str_replace(['/', '\\'], '-', $filename));
    }
}
