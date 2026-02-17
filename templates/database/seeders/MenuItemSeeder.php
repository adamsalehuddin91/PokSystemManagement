<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['name' => 'Nasi Lemak', 'price_cents' => 800, 'category' => 'Food'],
            ['name' => 'Mee Goreng', 'price_cents' => 750, 'category' => 'Food'],
            ['name' => 'Teh Tarik', 'price_cents' => 300, 'category' => 'Drink'],
            ['name' => 'Cendol', 'price_cents' => 500, 'category' => 'Dessert'],
        ];

        foreach ($items as $i) {
            MenuItem::updateOrCreate(
                ['name' => $i['name']],
                $i + ['active' => true]
            );
        }
    }
}

