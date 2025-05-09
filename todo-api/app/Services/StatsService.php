<?php

namespace App\Services;

use App\Models\Todo;
use Illuminate\Support\Facades\DB;

class StatsService
{
    public function getTodoStats()
    {
        return Todo::select('status', DB::raw('count(*) as count'))
                  ->whereNull('deleted_at')
                  ->groupBy('status')
                  ->get();
    }
    
    public function getPriorityStats()
    {
        return Todo::select('priority', DB::raw('count(*) as count'))
                  ->whereNull('deleted_at')
                  ->groupBy('priority')
                  ->get();
    }
}