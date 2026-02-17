<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'company_name',
        'email',
        'phone',
        'address',
        'tax_id',
    ];

    /**
     * Get delivery orders for this customer
     */
    public function deliveryOrders(): HasMany
    {
        return $this->hasMany(DeliveryOrder::class);
    }

    /**
     * Get invoices for this customer
     */
    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function quotations(): HasMany
    {
        return $this->hasMany(Quotation::class);
    }

    /**
     * Get total sales amount to this customer
     */
    public function getTotalSalesAmountAttribute(): float
    {
        return $this->invoices()
            ->where('payment_status', 'paid')
            ->sum('total_amount');
    }

    /**
     * Get outstanding balance
     */
    public function getOutstandingBalanceAttribute(): float
    {
        return $this->invoices()
            ->whereIn('payment_status', ['unpaid', 'partial'])
            ->sum('total_amount');
    }

    /**
     * Get overdue invoices
     */
    public function getOverdueInvoicesAttribute()
    {
        return $this->invoices()
            ->whereIn('payment_status', ['unpaid', 'partial'])
            ->where('due_date', '<', now())
            ->get();
    }
}
