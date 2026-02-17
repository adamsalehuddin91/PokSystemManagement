<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MenuItem;

class PosController extends Controller
{
    public function index(Request $request)
    {
        $table = $request->query('table');
        $items = MenuItem::where('active', true)->orderBy('name')->get();
        return view('pos', ['table' => $table, 'items' => $items]);
    }
}
