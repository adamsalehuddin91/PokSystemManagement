<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use App\Models\Supplier;
use App\Models\Sku;
use App\Services\PurchaseOrderService;
use App\Services\PdfService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
    public function __construct(
        protected PurchaseOrderService $poService,
        protected PdfService $pdfService
    ) {
    }

    /**
     * Display PO list
     */
    public function index(Request $request)
    {
        $query = PurchaseOrder::with(['supplier', 'items'])
            ->when($request->search, function ($q) use ($request) {
                $q->where('po_number', 'like', "%{$request->search}%");
            })
            ->when($request->status, function ($q) use ($request) {
                $q->where('status', $request->status);
            })
            ->when($request->supplier_id, function ($q) use ($request) {
                $q->where('supplier_id', $request->supplier_id);
            });

        $pos = $query->latest()->paginate(20);

        return Inertia::render('PurchaseOrders/Index', [
            'purchaseOrders' => $pos,
            'suppliers' => Supplier::all(),
            'filters' => $request->only(['search', 'status', 'supplier_id']),
            'summary' => $this->poService->getPoSummary(),
        ]);
    }

    /**
     * Show create form
     */
    public function create()
    {
        return Inertia::render('PurchaseOrders/Create', [
            'suppliers' => Supplier::all(),
            'skus' => Sku::active()->with('category')->get(),
        ]);
    }

    /**
     * Store new PO
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'notes' => 'nullable|string',
            'status' => 'required|in:draft,pending',
            'items' => 'required|array|min:1',
            'items.*.sku_id' => 'required|exists:skus,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        $po = $this->poService->createPurchaseOrder($validated);

        return redirect()->route('purchase-orders.show', $po->id)
            ->with('success', 'Purchase Order created successfully');
    }

    /**
     * Show PO details
     */
    public function show(PurchaseOrder $purchaseOrder)
    {
        return Inertia::render('PurchaseOrders/Show', [
            'purchaseOrder' => $purchaseOrder->load(['supplier', 'items.sku', 'creator', 'approver']),
        ]);
    }

    /**
     * Show edit form
     */
    public function edit(PurchaseOrder $purchaseOrder)
    {
        if (!in_array($purchaseOrder->status, ['draft', 'pending'])) {
            return redirect()->route('purchase-orders.show', $purchaseOrder->id)
                ->withErrors(['error' => 'Cannot edit PO with status: ' . $purchaseOrder->status]);
        }

        return Inertia::render('PurchaseOrders/Edit', [
            'purchaseOrder' => $purchaseOrder->load(['supplier', 'items.sku']),
            'suppliers' => Supplier::all(),
            'skus' => Sku::active()->with('category')->get(),
        ]);
    }

    /**
     * Update PO
     */
    public function update(Request $request, PurchaseOrder $purchaseOrder)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.sku_id' => 'required|exists:skus,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        try {
            $this->poService->updatePurchaseOrder($purchaseOrder, $validated);

            return redirect()->route('purchase-orders.show', $purchaseOrder->id)
                ->with('success', 'Purchase Order updated successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Submit for approval
     */
    public function submitForApproval(PurchaseOrder $purchaseOrder)
    {
        try {
            $this->poService->submitForApproval($purchaseOrder);

            return back()->with('success', 'PO submitted for approval');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Approve PO
     */
    public function approve(PurchaseOrder $purchaseOrder)
    {
        try {
            $this->poService->approvePurchaseOrder($purchaseOrder);

            return back()->with('success', 'Purchase Order approved');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Cancel PO
     */
    public function cancel(PurchaseOrder $purchaseOrder)
    {
        try {
            $this->poService->cancelPurchaseOrder($purchaseOrder);

            return back()->with('success', 'Purchase Order cancelled');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Generate PDF
     */
    public function pdf(PurchaseOrder $purchaseOrder)
    {
        $pdf = $this->pdfService->generatePurchaseOrderPdf($purchaseOrder);
        return $this->pdfService->streamPdf($pdf, "PO-{$purchaseOrder->po_number}.pdf");
    }
}
