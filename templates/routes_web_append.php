<?php
// ===== SWIFTPOS_ROUTES_START =====
use App\Http\Controllers\PosController;
use App\Http\Controllers\TablesController;
use App\Http\Controllers\KitchenController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

// Public customer ordering (no auth)
Route::get('/customer', [CustomerController::class, 'index'])->name('customer');

// SwiftPOS demo pages (Breeze auth required)
Route::middleware(['auth'])->group(function () {
    Route::view('/', 'dashboard')->middleware(['verified'])->name('dashboard');
    Route::get('/pos', [PosController::class, 'index'])->name('pos');
    Route::get('/tables', [TablesController::class, 'index'])->name('tables');
    Route::get('/kitchen', [KitchenController::class, 'index'])->name('kitchen');
});

// API routes
Route::prefix('api')->group(function () {
    // Order management
    Route::post('/orders', [OrderController::class, 'store']);
    Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus']);
    Route::get('/kitchen/orders', [OrderController::class, 'kitchenOrders']);
});
// ===== SWIFTPOS_ROUTES_END =====
