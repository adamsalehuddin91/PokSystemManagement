<?php

namespace App\Services;

use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use Illuminate\Support\Facades\DB;
use Exception;

class PurchaseOrderService
{
    /**
     * Generate unique PO number
     */
    public function generatePoNumber(): string
    {
        $year = now()->year;
        $prefix = "PO-{$year}-";

        $lastPo = PurchaseOrder::where('po_number', 'like', "{$prefix}%")
            ->orderBy('po_number', 'desc')
            ->first();

        if ($lastPo) {
            $lastNumber = (int) substr($lastPo->po_number, -4);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return $prefix . str_pad($newNumber, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Create new Purchase Order
     */
    public function createPurchaseOrder(array $data): PurchaseOrder
    {
        return DB::transaction(function () use ($data) {
            // Generate PO number
            $poNumber = $this->generatePoNumber();

            // Create PO header
            $po = PurchaseOrder::create([
                'po_number' => $poNumber,
                'supplier_id' => $data['supplier_id'],
                'total_amount' => 0,
                'status' => $data['status'] ?? 'draft',
                'notes' => $data['notes'] ?? null,
                'created_by' => auth()->id(),
            ]);

            // Create PO items
            $totalAmount = 0;
            foreach ($data['items'] as $item) {
                $itemTotal = $item['quantity'] * $item['unit_price'];

                PurchaseOrderItem::create([
                    'purchase_order_id' => $po->id,
                    'sku_id' => $item['sku_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $itemTotal,
                ]);

                $totalAmount += $itemTotal;
            }

            // Update total amount
            $po->update(['total_amount' => $totalAmount]);

            return $po->fresh(['items.sku', 'supplier']);
        });
    }

    /**
     * Update Purchase Order
     */
    public function updatePurchaseOrder(PurchaseOrder $po, array $data): PurchaseOrder
    {
        if (!in_array($po->status, ['draft', 'pending'])) {
            throw new Exception("Cannot update PO with status: {$po->status}");
        }

        return DB::transaction(function () use ($po, $data) {
            // Update PO header
            $po->update([
                'supplier_id' => $data['supplier_id'],
                'notes' => $data['notes'] ?? null,
            ]);

            // Delete existing items
            $po->items()->delete();

            // Create new items
            $totalAmount = 0;
            foreach ($data['items'] as $item) {
                $itemTotal = $item['quantity'] * $item['unit_price'];

                PurchaseOrderItem::create([
                    'purchase_order_id' => $po->id,
                    'sku_id' => $item['sku_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $itemTotal,
                ]);

                $totalAmount += $itemTotal;
            }

            // Update total amount
            $po->update(['total_amount' => $totalAmount]);

            return $po->fresh(['items.sku', 'supplier']);
        });
    }

    /**
     * Approve Purchase Order
     */
    public function approvePurchaseOrder(PurchaseOrder $po): PurchaseOrder
    {
        if ($po->status !== 'pending') {
            throw new Exception("Only pending POs can be approved");
        }

        $po->update([
            'status' => 'approved',
            'approved_by' => auth()->id(),
            'approved_at' => now(),
        ]);

        return $po->fresh();
    }

    /**
     * Submit PO for approval
     */
    public function submitForApproval(PurchaseOrder $po): PurchaseOrder
    {
        if ($po->status !== 'draft') {
            throw new Exception("Only draft POs can be submitted");
        }

        $po->update(['status' => 'pending']);

        return $po->fresh();
    }

    /**
     * Cancel Purchase Order
     */
    public function cancelPurchaseOrder(PurchaseOrder $po): PurchaseOrder
    {
        if ($po->status === 'received') {
            throw new Exception("Cannot cancel received PO");
        }

        $po->update(['status' => 'cancelled']);

        return $po->fresh();
    }

    /**
     * Mark as received (for DO integration)
     */
    public function markAsReceived(PurchaseOrder $po): PurchaseOrder
    {
        if ($po->status !== 'approved') {
            throw new Exception("Only approved POs can be marked as received");
        }

        $po->update(['status' => 'received']);

        return $po->fresh();
    }

    /**
     * Get PO summary statistics
     */
    public function getPoSummary(): array
    {
        return [
            'total_pos' => PurchaseOrder::count(),
            'draft_count' => PurchaseOrder::where('status', 'draft')->count(),
            'pending_count' => PurchaseOrder::where('status', 'pending')->count(),
            'approved_count' => PurchaseOrder::where('status', 'approved')->count(),
            'total_value' => PurchaseOrder::whereIn('status', ['approved', 'received'])->sum('total_amount'),
        ];
    }
}
