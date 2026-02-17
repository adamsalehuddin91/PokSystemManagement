<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'company_name',
        'contact_person',
        'email',
        'phone',
        'address',
    ];

    /**
     * Get purchase orders for this supplier
     */
    public function purchaseOrders(): HasMany
    {
        return $this->hasMany(PurchaseOrder::class);
    }

    public function supplierInvoices(): HasMany
    {
        return $this->hasMany(SupplierInvoice::class);
    }

    /**
     * Get total purchase amount from this supplier
     */
    public function getTotalPurchaseAmountAttribute(): float
    {
        return $this->purchaseOrders()
            ->where('status', 'received')
            ->sum('total_amount');
    }

    /**
     * Get active purchase orders count
     */
    public function getActivePurchaseOrdersCountAttribute(): int
    {
        return $this->purchaseOrders()
            ->whereIn('status', ['pending', 'approved'])
            ->count();
    }
}
