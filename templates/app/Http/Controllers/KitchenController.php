<?php

namespace App\Http\Controllers;

use App\Models\Order;

class KitchenController extends Controller
{
    public function index()
    {
        $orders = Order::with(['table', 'items'])
            ->orderByDesc('id')
            ->get();
        return view('kitchen', compact('orders'));
    }
}

