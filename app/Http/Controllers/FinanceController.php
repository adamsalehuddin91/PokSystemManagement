<?php

namespace App\Http\Controllers;

use App\Services\FinanceService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class FinanceController extends Controller
{
    public function __construct(
        protected FinanceService $financeService
    ) {
    }

    /**
     * Finance Dashboard
     */
    public function index()
    {
        $summary = $this->financeService->getFinancialSummary();
        $monthlyTrend = $this->financeService->getMonthlyTrend(6);

        return Inertia::render('Finance/Dashboard', [
            'summary' => $summary,
            'monthlyTrend' => $monthlyTrend,
        ]);
    }

    /**
     * Profit & Loss Report
     */
    public function profitLoss(Request $request)
    {
        $startDate = $request->start_date
            ? Carbon::parse($request->start_date)
            : now()->startOfMonth();

        $endDate = $request->end_date
            ? Carbon::parse($request->end_date)
            : now()->endOfMonth();

        $report = $this->financeService->calculateProfitLoss($startDate, $endDate);

        return Inertia::render('Finance/ProfitLoss', [
            'report' => $report,
            'filters' => [
                'start_date' => $startDate->format('Y-m-d'),
                'end_date' => $endDate->format('Y-m-d'),
            ],
        ]);
    }

    /**
     * Profit & Loss PDF Export
     */
    public function profitLossPdf(Request $request)
    {
        $startDate = $request->start_date
            ? Carbon::parse($request->start_date)
            : now()->startOfMonth();

        $endDate = $request->end_date
            ? Carbon::parse($request->end_date)
            : now()->endOfMonth();

        $report = $this->financeService->calculateProfitLoss($startDate, $endDate);

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('finance.profit_loss_pdf', [
            'report' => $report,
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
        ]);

        return $pdf->download('profit_loss_' . $startDate->format('Ymd') . '-' . $endDate->format('Ymd') . '.pdf');
    }

    /**
     * Transactions List
     */
    public function transactions(Request $request)
    {
        $query = \App\Models\Transaction::query()
            ->when($request->type, function ($q) use ($request) {
                $q->where('type', $request->type);
            })
            ->when($request->category, function ($q) use ($request) {
                $q->where('category', $request->category);
            })
            ->when($request->start_date, function ($q) use ($request) {
                $q->where('transaction_date', '>=', $request->start_date);
            })
            ->when($request->end_date, function ($q) use ($request) {
                $q->where('transaction_date', '<=', $request->end_date);
            });

        $transactions = $query->with('creator')
            ->latest('transaction_date')
            ->paginate(20);

        return Inertia::render('Finance/Transactions', [
            'transactions' => $transactions,
            'filters' => $request->only(['type', 'category', 'start_date', 'end_date']),
        ]);
    }

    /**
     * Create manual expense
     */
    public function storeExpense(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string',
            'amount' => 'required|numeric|min:0',
            'description' => 'required|string',
            'transaction_date' => 'required|date',
        ]);

        $this->financeService->recordExpense($validated);

        return back()->with('success', 'Expense recorded successfully');
    }
}
