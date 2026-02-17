<?php

namespace App\Http\Controllers;

use App\Models\Sku;
use App\Models\Category;
use App\Services\InventoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkuController extends Controller
{
    public function __construct(
        protected InventoryService $inventoryService
    ) {
    }

    /**
     * Display SKU list
     */
    public function index(Request $request)
    {
        $query = Sku::with('category')
            ->when($request->search, function ($q) use ($request) {
                $q->where('sku_code', 'like', "%{$request->search}%")
                    ->orWhere('name', 'like', "%{$request->search}%");
            })
            ->when($request->category_id, function ($q) use ($request) {
                $q->where('category_id', $request->category_id);
            })
            ->when($request->status, function ($q) use ($request) {
                $q->where('status', $request->status);
            })
            ->when($request->stock_filter === 'low', function ($q) {
                $q->lowStock();
            })
            ->when($request->stock_filter === 'out', function ($q) {
                $q->outOfStock();
            });

        $skus = $query->latest()->paginate(20);

        return Inertia::render('Inventory/Index', [
            'skus' => $skus,
            'categories' => Category::all(),
            'filters' => $request->only(['search', 'category_id', 'status', 'stock_filter']),
            'summary' => $this->inventoryService->getInventorySummary(),
        ]);
    }

    /**
     * Show create form
     */
    public function create()
    {
        return Inertia::render('Inventory/Create', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store new SKU
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sku_code' => 'required|string|max:50|unique:skus',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
            'unit_price' => 'required|numeric|min:0',
            'cost_price' => 'required|numeric|min:0',
            'current_stock' => 'required|integer|min:0',
            'min_stock_level' => 'required|integer|min:0',
            'max_stock_level' => 'required|integer|min:0',
            'status' => 'required|in:active,inactive',
        ]);

        $sku = $this->inventoryService->createSku($validated);

        return redirect()->route('inventory.index')
            ->with('success', 'SKU created successfully');
    }

    /**
     * Show edit form
     */
    public function edit(Sku $sku)
    {
        return Inertia::render('Inventory/Edit', [
            'sku' => $sku->load('category'),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update SKU
     */
    public function update(Request $request, Sku $sku)
    {
        $validated = $request->validate([
            'sku_code' => 'required|string|max:50|unique:skus,sku_code,' . $sku->id,
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
            'unit_price' => 'required|numeric|min:0',
            'cost_price' => 'required|numeric|min:0',
            'min_stock_level' => 'required|integer|min:0',
            'max_stock_level' => 'required|integer|min:0',
            'status' => 'required|in:active,inactive',
        ]);

        $this->inventoryService->updateSku($sku, $validated);

        return redirect()->route('inventory.index')
            ->with('success', 'SKU updated successfully');
    }

    /**
     * Show SKU details
     */
    public function show(Sku $sku)
    {
        return Inertia::render('Inventory/Show', [
            'sku' => $sku->load('category'),
            'stockHistory' => $this->inventoryService->getStockHistory($sku, 30),
        ]);
    }

    /**
     * Adjust stock
     */
    public function adjustStock(Request $request, Sku $sku)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer',
            'notes' => 'nullable|string',
        ]);

        try {
            $this->inventoryService->adjustStock(
                sku: $sku,
                quantity: $validated['quantity'],
                notes: $validated['notes'] ?? null
            );

            return back()->with('success', 'Stock adjusted successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Get low stock alerts
     */
    public function lowStock()
    {
        return Inertia::render('Inventory/LowStock', [
            'skus' => $this->inventoryService->getLowStockSkus(),
        ]);
    }
}
