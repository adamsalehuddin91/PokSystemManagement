<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;

class CustomerController extends Controller
{
    public function index()
    {
        $items = MenuItem::where('active', true)
            ->orderBy('category')
            ->orderBy('name')
            ->get();

        return view('customer', compact('items'));
    }
}
