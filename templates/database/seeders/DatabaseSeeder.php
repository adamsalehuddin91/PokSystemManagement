<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ===== SWIFTPOS_SEEDERS_START =====
        $this->call([
            MenuItemSeeder::class,
            DiningTableSeeder::class,
        ]);
        // ===== SWIFTPOS_SEEDERS_END =====
    }
}

