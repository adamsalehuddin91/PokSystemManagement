<?php

namespace App\Services;

use App\Models\Sku;
use App\Models\StockMovement;
use Illuminate\Support\Facades\DB;
use Exception;

class InventoryService
{
    /**
     * Create a new SKU
     */
    public function createSku(array $data): Sku
    {
        return DB::transaction(function () use ($data) {
            $sku = Sku::create($data);

            // Create initial stock movement if stock > 0
            if ($sku->current_stock > 0) {
                $this->recordStockMovement(
                    sku: $sku,
                    type: 'in',
                    quantity: $sku->current_stock,
                    notes: 'Initial stock',
                    createdBy: auth()->id()
                );
            }

            return $sku->fresh();
        });
    }

    /**
     * Update SKU
     */
    public function updateSku(Sku $sku, array $data): Sku
    {
        $sku->update($data);
        return $sku->fresh();
    }

    /**
     * Adjust stock manually
     */
    public function adjustStock(
        Sku $sku,
        int $quantity,
        string $type = 'adjustment',
        ?string $notes = null
    ): StockMovement {
        return DB::transaction(function () use ($sku, $quantity, $type, $notes) {
            // Update current stock
            $newStock = $sku->current_stock + $quantity;

            if ($newStock < 0) {
                throw new Exception("Insufficient stock. Current: {$sku->current_stock}, Requested: " . abs($quantity));
            }

            $sku->update(['current_stock' => $newStock]);

            // Record movement
            return $this->recordStockMovement(
                sku: $sku,
                type: $type,
                quantity: abs($quantity),
                notes: $notes ?? "Manual {$type}",
                createdBy: auth()->id()
            );
        });
    }

    /**
     * Deduct stock (for sales/DO)
     */
    public function deductStock(
        Sku $sku,
        int $quantity,
        string $referenceType,
        int $referenceId,
        ?string $notes = null
    ): StockMovement {
        return DB::transaction(function () use ($sku, $quantity, $referenceType, $referenceId, $notes) {
            if ($sku->current_stock < $quantity) {
                throw new Exception("Insufficient stock for SKU: {$sku->name}. Available: {$sku->current_stock}, Required: {$quantity}");
            }

            // Deduct stock
            $sku->decrement('current_stock', $quantity);

            // Record movement
            return $this->recordStockMovement(
                sku: $sku,
                type: 'out',
                quantity: $quantity,
                referenceType: $referenceType,
                referenceId: $referenceId,
                notes: $notes,
                createdBy: auth()->id()
            );
        });
    }

    /**
     * Add stock (for receiving/PO)
     */
    public function addStock(
        Sku $sku,
        int $quantity,
        string $referenceType,
        int $referenceId,
        ?string $notes = null
    ): StockMovement {
        return DB::transaction(function () use ($sku, $quantity, $referenceType, $referenceId, $notes) {
            // Add stock
            $sku->increment('current_stock', $quantity);

            // Record movement
            return $this->recordStockMovement(
                sku: $sku,
                type: 'in',
                quantity: $quantity,
                referenceType: $referenceType,
                referenceId: $referenceId,
                notes: $notes,
                createdBy: auth()->id()
            );
        });
    }

    /**
     * Record stock movement
     */
    protected function recordStockMovement(
        Sku $sku,
        string $type,
        int $quantity,
        ?string $referenceType = null,
        ?int $referenceId = null,
        ?string $notes = null,
        ?int $createdBy = null
    ): StockMovement {
        return StockMovement::create([
            'sku_id' => $sku->id,
            'type' => $type,
            'quantity' => $quantity,
            'reference_type' => $referenceType,
            'reference_id' => $referenceId,
            'notes' => $notes,
            'created_by' => $createdBy ?? auth()->id(),
        ]);
    }

    /**
     * Get low stock SKUs
     */
    public function getLowStockSkus()
    {
        return Sku::active()
            ->lowStock()
            ->with('category')
            ->orderBy('current_stock', 'asc')
            ->get();
    }

    /**
     * Get out of stock SKUs
     */
    public function getOutOfStockSkus()
    {
        return Sku::active()
            ->outOfStock()
            ->with('category')
            ->get();
    }

    /**
     * Get stock movement history for SKU
     */
    public function getStockHistory(Sku $sku, int $days = 30)
    {
        return $sku->stockMovements()
            ->with('creator')
            ->recent($days)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get total inventory value
     */
    public function getTotalInventoryValue(): float
    {
        return Sku::active()
            ->get()
            ->sum(fn($sku) => $sku->stock_value);
    }

    /**
     * Get inventory summary
     */
    public function getInventorySummary(): array
    {
        $skus = Sku::active()->get();

        return [
            'total_skus' => $skus->count(),
            'total_value' => $skus->sum(fn($sku) => $sku->stock_value),
            'low_stock_count' => $skus->filter(fn($sku) => $sku->isLowStock())->count(),
            'out_of_stock_count' => $skus->filter(fn($sku) => $sku->isOutOfStock())->count(),
            'total_items' => $skus->sum('current_stock'),
        ];
    }

    /**
     * Search SKUs
     */
    public function searchSkus(string $query)
    {
        return Sku::active()
            ->where(function ($q) use ($query) {
                $q->where('sku_code', 'like', "%{$query}%")
                    ->orWhere('name', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%");
            })
            ->with('category')
            ->get();
    }
}
