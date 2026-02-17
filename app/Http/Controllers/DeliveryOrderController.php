<?php

namespace App\Http\Controllers;

use App\Models\DeliveryOrder;
use App\Models\PurchaseOrder;
use App\Models\Customer;
use App\Models\Sku;
use App\Services\DeliveryOrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeliveryOrderController extends Controller
{
    public function __construct(
        protected DeliveryOrderService $doService,
        protected \App\Services\PdfService $pdfService
    ) {
    }

    /**
     * Display DO list
     */
    public function index(Request $request)
    {
        $query = DeliveryOrder::with(['customer', 'purchaseOrder', 'items'])
            ->when($request->search, function ($q) use ($request) {
                $q->where('do_number', 'like', "%{$request->search}%");
            })
            ->when($request->status, function ($q) use ($request) {
                $q->where('status', $request->status);
            });

        $dos = $query->latest()->paginate(20);

        return Inertia::render('DeliveryOrders/Index', [
            'deliveryOrders' => $dos,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show create form
     */
    public function create(Request $request)
    {
        $purchaseOrder = null;
        if ($request->po_id) {
            $purchaseOrder = PurchaseOrder::with(['items.sku', 'supplier'])
                ->findOrFail($request->po_id);
        }

        return Inertia::render('DeliveryOrders/Create', [
            'purchaseOrder' => $purchaseOrder,
            'customers' => Customer::all(),
            'skus' => Sku::active()->with('category')->get(),
        ]);
    }

    /**
     * Store new DO
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'purchase_order_id' => 'nullable|exists:purchase_orders,id',
            'customer_id' => 'nullable|exists:customers,id',
            'delivery_date' => 'required|date',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.sku_id' => 'required|exists:skus,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        $do = $this->doService->createDeliveryOrder($validated);

        return redirect()->route('delivery-orders.show', $do->id)
            ->with('success', 'Delivery Order created successfully');
    }

    /**
     * Show DO details
     */
    public function show(DeliveryOrder $deliveryOrder)
    {
        return Inertia::render('DeliveryOrders/Show', [
            'deliveryOrder' => $deliveryOrder->load(['customer', 'purchaseOrder', 'items.sku']),
        ]);
    }

    /**
     * Complete delivery
     */
    public function complete(DeliveryOrder $deliveryOrder)
    {
        try {
            $this->doService->completeDelivery($deliveryOrder);

            return back()->with('success', 'Delivery completed and stock updated');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Cancel DO
     */
    public function cancel(DeliveryOrder $deliveryOrder)
    {
        try {
            $this->doService->cancelDeliveryOrder($deliveryOrder);

            return back()->with('success', 'Delivery Order cancelled');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Generate PDF
     */
    public function pdf(DeliveryOrder $deliveryOrder)
    {
        $pdf = $this->pdfService->generateDeliveryOrderPdf($deliveryOrder);
        return $this->pdfService->streamPdf($pdf, "DO-{$deliveryOrder->do_number}.pdf");
    }
}
