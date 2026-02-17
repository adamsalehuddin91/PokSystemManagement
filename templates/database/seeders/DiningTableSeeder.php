<?php

namespace Database\Seeders;

use App\Models\DiningTable;
use Illuminate\Database\Seeder;

class DiningTableSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 12; $i++) {
            $code = 'T' . $i;
            DiningTable::updateOrCreate(
                ['code' => $code],
                ['seats' => 4, 'status' => 'available']
            );
        }
    }
}

