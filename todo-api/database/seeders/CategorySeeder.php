<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'İş',
                'color' => '#FF5733'
            ],
            [
                'name' => 'Kişisel',
                'color' => '#33FF57'
            ],
            [
                'name' => 'Alışveriş',
                'color' => '#3357FF'
            ],
            [
                'name' => 'Sağlık',
                'color' => '#F033FF'
            ],
            [
                'name' => 'Eğitim',
                'color' => '#FF9933'
            ]
        ];
        
        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}