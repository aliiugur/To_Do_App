<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Todo;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class TodoSeeder extends Seeder
{
    public function run(): void
    {
        $todos = [
            [
                'title' => 'Proje toplantısına katıl',
                'description' => 'Sprint planlama toplantısı için hazırlık yap',
                'status' => 'pending',
                'priority' => 'high',
                'due_date' => Carbon::now()->addDays(2),
                'categories' => [1], // İş kategorisi
            ],
            [
                'title' => 'Alışveriş listesini hazırla',
                'description' => 'Haftalık alışveriş listesini hazırla',
                'status' => 'pending',
                'priority' => 'medium',
                'due_date' => Carbon::now()->addDay(),
                'categories' => [3], // Alışveriş kategorisi
            ],
            [
                'title' => 'Doktor randevusu al',
                'description' => 'Yıllık sağlık kontrolü için doktor randevusu al',
                'status' => 'in_progress',
                'priority' => 'medium',
                'due_date' => Carbon::now()->addDays(5),
                'categories' => [4], // Sağlık kategorisi
            ],
            [
                'title' => 'Sınav için çalış',
                'description' => 'Gelecek hafta yapılacak sınav için çalış',
                'status' => 'in_progress',
                'priority' => 'high',
                'due_date' => Carbon::now()->addDays(7),
                'categories' => [5], // Eğitim kategorisi
            ],
            [
                'title' => 'Kitap oku',
                'description' => '30 dakika kitap oku',
                'status' => 'completed',
                'priority' => 'low',
                'due_date' => Carbon::now()->subDay(),
                'categories' => [2, 5], // Kişisel ve Eğitim kategorileri
            ]
        ];
        
        foreach ($todos as $todoData) {
            $categoryIds = $todoData['categories'];
            unset($todoData['categories']);
            
            $todo = Todo::create($todoData);
            $todo->categories()->attach($categoryIds);
        }
    }
}