<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = [
        'name', 'price_cents', 'category', 'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];
}

