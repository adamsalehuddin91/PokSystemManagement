<?php

namespace App\Http\Controllers;

use App\Models\SupplierInvoice;
use App\Models\Supplier;
use App\Models\Sku;
use App\Models\PurchaseOrder;
use App\Services\SupplierInvoiceService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierInvoiceController extends Controller
{
    public function __construct(
        protected SupplierInvoiceService $supplierInvoiceService
    ) {
    }

    public function index(Request $request)
    {
        $query = SupplierInvoice::with(['supplier', 'purchaseOrder', 'items'])
            ->when($request->search, function ($q) use ($request) {
                $q->where(function ($sub) use ($request) {
                    $sub->where('supplier_invoice_number', 'ilike', "%{$request->search}%")
                        ->orWhere('supplier_ref_number', 'ilike', "%{$request->search}%")
                        ->orWhereHas('supplier', function ($s) use ($request) {
                            $s->where('name', 'ilike', "%{$request->search}%")
                              ->orWhere('company_name', 'ilike', "%{$request->search}%");
                        });
                });
            })
            ->when($request->status, function ($q) use ($request) {
                $q->where('status', $request->status);
            });

        $invoices = $query->latest()->paginate(20);

        return Inertia::render('SupplierInvoices/Index', [
            'supplierInvoices' => $invoices,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(Request $request)
    {
        $purchaseOrder = null;
        if ($request->po_id) {
            $purchaseOrder = PurchaseOrder::with(['items.sku', 'supplier'])
                ->findOrFail($request->po_id);
        }

        return Inertia::render('SupplierInvoices/Create', [
            'suppliers' => Supplier::all(),
            'skus' => Sku::active()->with('category')->get(),
            'purchaseOrder' => $purchaseOrder,
            'purchaseOrders' => PurchaseOrder::whereIn('status', ['approved', 'received'])
                ->with('supplier')
                ->latest()
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'purchase_order_id' => 'nullable|exists:purchase_orders,id',
            'supplier_ref_number' => 'nullable|string|max:100',
            'invoice_date' => 'required|date',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.sku_id' => 'required|exists:skus,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_cost' => 'required|numeric|min:0',
        ]);

        $invoice = $this->supplierInvoiceService->createSupplierInvoice($validated);

        return redirect()->route('supplier-invoices.show', $invoice->id)
            ->with('success', 'Supplier Invoice created successfully');
    }

    public function show(SupplierInvoice $supplierInvoice)
    {
        return Inertia::render('SupplierInvoices/Show', [
            'supplierInvoice' => $supplierInvoice->load(['supplier', 'purchaseOrder', 'items.sku', 'creator']),
        ]);
    }

    public function confirm(SupplierInvoice $supplierInvoice)
    {
        try {
            $this->supplierInvoiceService->confirmInvoice($supplierInvoice);

            return back()->with('success', 'Supplier Invoice confirmed. Stock has been added to inventory.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy(SupplierInvoice $supplierInvoice)
    {
        if ($supplierInvoice->status !== 'draft') {
            return back()->with('error', 'Only draft supplier invoices can be deleted');
        }

        $supplierInvoice->delete();

        return redirect()->route('supplier-invoices.index')
            ->with('success', 'Supplier Invoice deleted');
    }
}
