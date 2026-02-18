<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Inventory Management
    Route::prefix('inventory')->name('inventory.')->group(function () {
        Route::get('/', [App\Http\Controllers\SkuController::class, 'index'])->name('index');
        Route::get('/create', [App\Http\Controllers\SkuController::class, 'create'])->name('create');
        Route::get('/alerts/low-stock', [App\Http\Controllers\SkuController::class, 'lowStock'])->name('low-stock');
        Route::post('/', [App\Http\Controllers\SkuController::class, 'store'])->name('store');
        Route::get('/{sku}', [App\Http\Controllers\SkuController::class, 'show'])->name('show');
        Route::get('/{sku}/edit', [App\Http\Controllers\SkuController::class, 'edit'])->name('edit');
        Route::patch('/{sku}', [App\Http\Controllers\SkuController::class, 'update'])->name('update');
        Route::post('/{sku}/adjust-stock', [App\Http\Controllers\SkuController::class, 'adjustStock'])->name('adjust-stock');
    });

    // Categories
    Route::prefix('categories')->name('categories.')->group(function () {
        Route::get('/', [App\Http\Controllers\CategoryController::class, 'index'])->name('index');
        Route::post('/', [App\Http\Controllers\CategoryController::class, 'store'])->name('store');
        Route::patch('/{category}', [App\Http\Controllers\CategoryController::class, 'update'])->name('update');
        Route::delete('/{category}', [App\Http\Controllers\CategoryController::class, 'destroy'])->name('destroy');
    });

    // Supplier Invoices
    Route::prefix('supplier-invoices')->name('supplier-invoices.')->group(function () {
        Route::get('/', [App\Http\Controllers\SupplierInvoiceController::class, 'index'])->name('index');
        Route::get('/create', [App\Http\Controllers\SupplierInvoiceController::class, 'create'])->name('create');
        Route::post('/', [App\Http\Controllers\SupplierInvoiceController::class, 'store'])->name('store');
        Route::get('/{supplierInvoice}', [App\Http\Controllers\SupplierInvoiceController::class, 'show'])->name('show');
        Route::post('/{supplierInvoice}/confirm', [App\Http\Controllers\SupplierInvoiceController::class, 'confirm'])->name('confirm');
        Route::delete('/{supplierInvoice}', [App\Http\Controllers\SupplierInvoiceController::class, 'destroy'])->name('destroy');
    });

    // Purchase Orders
    Route::prefix('purchase-orders')->name('purchase-orders.')->group(function () {
        Route::get('/', [App\Http\Controllers\PurchaseOrderController::class, 'index'])->name('index');
        Route::get('/create', [App\Http\Controllers\PurchaseOrderController::class, 'create'])->name('create');
        Route::post('/', [App\Http\Controllers\PurchaseOrderController::class, 'store'])->name('store');
        Route::get('/{purchaseOrder}', [App\Http\Controllers\PurchaseOrderController::class, 'show'])->name('show');
        Route::get('/{purchaseOrder}/edit', [App\Http\Controllers\PurchaseOrderController::class, 'edit'])->name('edit');
        Route::patch('/{purchaseOrder}', [App\Http\Controllers\PurchaseOrderController::class, 'update'])->name('update');
        Route::post('/{purchaseOrder}/submit', [App\Http\Controllers\PurchaseOrderController::class, 'submitForApproval'])->name('submit');
        Route::post('/{purchaseOrder}/approve', [App\Http\Controllers\PurchaseOrderController::class, 'approve'])->name('approve');
        Route::post('/{purchaseOrder}/cancel', [App\Http\Controllers\PurchaseOrderController::class, 'cancel'])->name('cancel');
        Route::get('/{purchaseOrder}/pdf', [App\Http\Controllers\PurchaseOrderController::class, 'pdf'])->name('pdf');
    });

    // Finance
    Route::prefix('finance')->name('finance.')->group(function () {
        Route::get('/', [App\Http\Controllers\FinanceController::class, 'index'])->name('index');
        Route::get('/profit-loss', [App\Http\Controllers\FinanceController::class, 'profitLoss'])->name('profit-loss');
        Route::get('/profit-loss/pdf', [App\Http\Controllers\FinanceController::class, 'profitLossPdf'])->name('profit-loss.pdf');
        Route::get('/transactions', [App\Http\Controllers\FinanceController::class, 'transactions'])->name('transactions');
        Route::post('/expenses', [App\Http\Controllers\FinanceController::class, 'storeExpense'])->name('expenses.store');
    });

    // Suppliers
    Route::resource('suppliers', App\Http\Controllers\SupplierController::class)->except(['show']);

    // Customers
    Route::resource('customers', App\Http\Controllers\CustomerController::class)->except(['show']);


    // Quotations
    Route::prefix('quotations')->name('quotations.')->group(function () {
        Route::get('/', [App\Http\Controllers\QuotationController::class, 'index'])->name('index');
        Route::get('/create', [App\Http\Controllers\QuotationController::class, 'create'])->name('create');
        Route::post('/', [App\Http\Controllers\QuotationController::class, 'store'])->name('store');
        Route::get('/{quotation}', [App\Http\Controllers\QuotationController::class, 'show'])->name('show');
        Route::get('/{quotation}/edit', [App\Http\Controllers\QuotationController::class, 'edit'])->name('edit');
        Route::put('/{quotation}', [App\Http\Controllers\QuotationController::class, 'update'])->name('update');
        Route::post('/{quotation}/convert', [App\Http\Controllers\QuotationController::class, 'convert'])->name('convert');
        Route::patch('/{quotation}/status', [App\Http\Controllers\QuotationController::class, 'updateStatus'])->name('status');
        Route::get('/{quotation}/pdf', [App\Http\Controllers\QuotationController::class, 'pdf'])->name('pdf');
        Route::delete('/{quotation}', [App\Http\Controllers\QuotationController::class, 'destroy'])->name('destroy');
    });

    // Delivery Orders
    Route::prefix('delivery-orders')->name('delivery-orders.')->group(function () {
        Route::get('/', [App\Http\Controllers\DeliveryOrderController::class, 'index'])->name('index');
        Route::get('/create', [App\Http\Controllers\DeliveryOrderController::class, 'create'])->name('create');
        Route::post('/', [App\Http\Controllers\DeliveryOrderController::class, 'store'])->name('store');
        Route::get('/{deliveryOrder}', [App\Http\Controllers\DeliveryOrderController::class, 'show'])->name('show');
        Route::post('/{deliveryOrder}/complete', [App\Http\Controllers\DeliveryOrderController::class, 'complete'])->name('complete');
        Route::post('/{deliveryOrder}/cancel', [App\Http\Controllers\DeliveryOrderController::class, 'cancel'])->name('cancel');
        Route::get('/{deliveryOrder}/pdf', [App\Http\Controllers\DeliveryOrderController::class, 'pdf'])->name('pdf');
    });

    // Invoices
    Route::prefix('invoices')->name('invoices.')->group(function () {
        Route::get('/', [App\Http\Controllers\InvoiceController::class, 'index'])->name('index');
        Route::get('/create', [App\Http\Controllers\InvoiceController::class, 'create'])->name('create');
        Route::post('/', [App\Http\Controllers\InvoiceController::class, 'store'])->name('store');
        Route::get('/{invoice}', [App\Http\Controllers\InvoiceController::class, 'show'])->name('show');
        Route::post('/{invoice}/payment', [App\Http\Controllers\InvoiceController::class, 'recordPayment'])->name('payment');
        Route::get('/{invoice}/pdf', [App\Http\Controllers\InvoiceController::class, 'pdf'])->name('pdf');
    });
});

require __DIR__ . '/auth.php';
