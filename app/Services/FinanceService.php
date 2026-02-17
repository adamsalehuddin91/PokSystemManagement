<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\Invoice;
use App\Models\StockMovement;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FinanceService
{
    /**
     * Record revenue from invoice
     */
    public function recordInvoiceRevenue(Invoice $invoice): Transaction
    {
        return Transaction::create([
            'type' => 'revenue',
            'category' => 'sales',
            'amount' => $invoice->total_amount,
            'description' => "Revenue from Invoice {$invoice->invoice_number}",
            'reference_type' => 'invoice',
            'reference_id' => $invoice->id,
            'transaction_date' => now(),
            'created_by' => auth()->id(),
        ]);
    }

    /**
     * Record COGS from stock movement
     */
    public function recordCOGS(StockMovement $movement): ?Transaction
    {
        // Only record COGS for stock OUT movements
        if ($movement->type !== 'out') {
            return null;
        }

        $sku = $movement->sku;
        $cogsAmount = $movement->quantity * $sku->cost_price;

        return Transaction::create([
            'type' => 'cogs',
            'category' => 'cost_of_sales',
            'amount' => $cogsAmount,
            'description' => "COGS for {$sku->sku_code} - {$movement->quantity} units",
            'reference_type' => 'stock_movement',
            'reference_id' => $movement->id,
            'transaction_date' => $movement->created_at,
            'created_by' => $movement->created_by,
        ]);
    }

    /**
     * Record manual expense
     */
    public function recordExpense(array $data): Transaction
    {
        return Transaction::create([
            'type' => 'expense',
            'category' => $data['category'],
            'amount' => $data['amount'],
            'description' => $data['description'],
            'reference_type' => $data['reference_type'] ?? null,
            'reference_id' => $data['reference_id'] ?? null,
            'transaction_date' => $data['transaction_date'] ?? now(),
            'created_by' => auth()->id(),
        ]);
    }

    /**
     * Calculate Profit & Loss for date range
     */
    public function calculateProfitLoss(Carbon $startDate, Carbon $endDate): array
    {
        $revenue = Transaction::where('type', 'revenue')
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->sum('amount');

        $cogs = Transaction::where('type', 'cogs')
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->sum('amount');

        $expenses = Transaction::where('type', 'expense')
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->sum('amount');

        $grossProfit = $revenue - $cogs;
        $netProfit = $grossProfit - $expenses;

        // Calculate by category
        $expensesByCategory = Transaction::where('type', 'expense')
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->select('category', DB::raw('SUM(amount) as total'))
            ->groupBy('category')
            ->get()
            ->pluck('total', 'category')
            ->toArray();

        return [
            'period' => [
                'start' => $startDate->format('Y-m-d'),
                'end' => $endDate->format('Y-m-d'),
            ],
            'revenue' => $revenue,
            'cogs' => $cogs,
            'gross_profit' => $grossProfit,
            'gross_profit_margin' => $revenue > 0 ? ($grossProfit / $revenue) * 100 : 0,
            'expenses' => $expenses,
            'expenses_by_category' => $expensesByCategory,
            'net_profit' => $netProfit,
            'net_profit_margin' => $revenue > 0 ? ($netProfit / $revenue) * 100 : 0,
        ];
    }

    /**
     * Get summary for specific month
     */
    public function getMonthlySummary(string $monthYm): array
    {
        $date = Carbon::createFromFormat('Y-m', $monthYm);
        return $this->calculateProfitLoss(
            $date->copy()->startOfMonth(),
            $date->copy()->endOfMonth()
        );
    }

    /**
     * Get financial summary for dashboard
     */
    public function getFinancialSummary(): array
    {
        // Current month
        $currentMonth = $this->getMonthlySummary(now()->format('Y-m'));

        // Last month
        $lastMonth = $this->getMonthlySummary(now()->subMonth()->format('Y-m'));

        // Year to date
        $ytd = $this->calculateProfitLoss(
            now()->startOfYear(),
            now()
        );

        return [
            'current_month' => $currentMonth,
            'last_month' => $lastMonth,
            'ytd' => $ytd,
            'total_transactions' => Transaction::count(),
        ];
    }

    /**
     * Get monthly trend data for charts
     */
    public function getMonthlyTrend(int $months = 12): array
    {
        $data = [];

        for ($i = $months - 1; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $startDate = $date->copy()->startOfMonth();
            $endDate = $date->copy()->endOfMonth();

            $pl = $this->calculateProfitLoss($startDate, $endDate);

            $data[] = [
                'month' => $date->format('M Y'),
                'revenue' => $pl['revenue'],
                'expenses' => $pl['expenses'],
                'profit' => $pl['net_profit'],
            ];
        }

        return $data;
    }
}
