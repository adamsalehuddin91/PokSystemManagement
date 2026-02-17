<?php

namespace App\Http\Controllers;

use App\Models\DiningTable;

class TablesController extends Controller
{
    public function index()
    {
        $tables = DiningTable::orderBy('code')->get();
        return view('tables', compact('tables'));
    }
}

