<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use App\Models\Customer;
use App\Models\Sku;
use App\Services\QuotationService;
use App\Services\PdfService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuotationController extends Controller
{
    public function __construct(
        protected QuotationService $quotationService,
        protected PdfService $pdfService
    ) {
    }

    public function index(Request $request)
    {
        $query = Quotation::with(['customer', 'items'])
            ->when($request->search, function ($q) use ($request) {
                $q->where(function ($sub) use ($request) {
                    $sub->where('quotation_number', 'ilike', "%{$request->search}%")
                        ->orWhereHas('customer', function ($c) use ($request) {
                            $c->where('name', 'ilike', "%{$request->search}%")
                              ->orWhere('company_name', 'ilike', "%{$request->search}%");
                        });
                });
            })
            ->when($request->status, function ($q) use ($request) {
                $q->where('status', $request->status);
            });

        $quotations = $query->latest()->paginate(20);

        return Inertia::render('Quotations/Index', [
            'quotations' => $quotations,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Quotations/Create', [
            'customers' => Customer::all(),
            'skus' => Sku::active()->with('category')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'valid_until' => 'nullable|date',
            'show_date_on_pdf' => 'boolean',
            'tax_rate' => 'nullable|numeric|min:0|max:100',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.sku_id' => 'required|exists:skus,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.description' => 'nullable|string',
        ]);

        $quotation = $this->quotationService->createQuotation($validated);

        return redirect()->route('quotations.show', $quotation->id)
            ->with('success', 'Quotation created successfully');
    }

    public function show(Quotation $quotation)
    {
        return Inertia::render('Quotations/Show', [
            'quotation' => $quotation->load(['customer', 'items.sku', 'creator', 'convertedInvoice']),
        ]);
    }

    public function edit(Quotation $quotation)
    {
        if (!in_array($quotation->status, ['draft', 'sent'])) {
            return redirect()->route('quotations.show', $quotation->id)
                ->with('error', 'Only draft or sent quotations can be edited');
        }

        return Inertia::render('Quotations/Edit', [
            'quotation' => $quotation->load(['customer', 'items.sku']),
            'customers' => Customer::all(),
            'skus' => Sku::active()->with('category')->get(),
        ]);
    }

    public function update(Request $request, Quotation $quotation)
    {
        if (!in_array($quotation->status, ['draft', 'sent'])) {
            return redirect()->route('quotations.show', $quotation->id)
                ->with('error', 'Only draft or sent quotations can be edited');
        }

        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'valid_until' => 'nullable|date',
            'show_date_on_pdf' => 'boolean',
            'tax_rate' => 'nullable|numeric|min:0|max:100',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.sku_id' => 'required|exists:skus,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.description' => 'nullable|string',
        ]);

        $quotation = $this->quotationService->updateQuotation($quotation, $validated);

        return redirect()->route('quotations.show', $quotation->id)
            ->with('success', 'Quotation updated successfully');
    }

    public function updateStatus(Request $request, Quotation $quotation)
    {
        $validated = $request->validate([
            'status' => 'required|in:draft,sent,accepted,rejected',
        ]);

        $this->quotationService->updateStatus($quotation, $validated['status']);

        return back()->with('success', 'Status updated to ' . ucfirst($validated['status']));
    }

    public function convert(Quotation $quotation)
    {
        if ($quotation->status !== 'accepted') {
            return back()->with('error', 'Only accepted quotations can be converted to invoice');
        }

        try {
            $invoice = $this->quotationService->convertToInvoice($quotation);

            return redirect()->route('invoices.show', $invoice->id)
                ->with('success', "Invoice {$invoice->invoice_number} created from {$quotation->quotation_number}");
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function pdf(Quotation $quotation)
    {
        $pdf = $this->pdfService->generateQuotationPdf($quotation);
        return $this->pdfService->streamPdf($pdf, "Quotation-{$quotation->quotation_number}.pdf");
    }

    public function destroy(Quotation $quotation)
    {
        if ($quotation->status !== 'draft') {
            return back()->with('error', 'Only draft quotations can be deleted');
        }

        $quotation->delete();

        return redirect()->route('quotations.index')
            ->with('success', 'Quotation deleted');
    }
}
