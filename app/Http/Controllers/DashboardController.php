<?php

namespace App\Http\Controllers;

use App\Services\FinanceService;
use App\Models\Sku;
use App\Models\PurchaseOrder;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        protected FinanceService $financeService
    ) {
    }

    public function index()
    {
        $financeSummary = $this->financeService->getMonthlySummary(now()->format('Y-m'));

        $skuMetrics = Sku::selectRaw('
            COUNT(*) as total,
            SUM(CASE WHEN current_stock <= min_stock_level THEN 1 ELSE 0 END) as low_stock,
            SUM(CASE WHEN current_stock <= 0 THEN 1 ELSE 0 END) as out_of_stock
        ')->first();

        return Inertia::render('Dashboard', [
            'finance' => $financeSummary,
            'inventory' => [
                'total' => (int) $skuMetrics->total,
                'low_stock' => (int) $skuMetrics->low_stock,
                'out_of_stock' => (int) $skuMetrics->out_of_stock,
            ],
            'actions' => [
                'pending_pos' => PurchaseOrder::where('status', 'pending')->count(),
                'unpaid_invoices' => Invoice::where('payment_status', 'unpaid')->count(),
                'overdue_invoices' => Invoice::where('payment_status', '!=', 'paid')
                    ->where('due_date', '<', now())
                    ->count(),
            ],
        ]);
    }
}
