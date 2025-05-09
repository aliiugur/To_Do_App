<?php

use App\Http\Controllers\Api\TodoController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\StatsController;
use Illuminate\Support\Facades\Route;

// Todo İşlemleri
Route::get('/todos', [TodoController::class, 'index']);
Route::get('/todos/search', [TodoController::class, 'search']);
Route::get('/todos/{id}', [TodoController::class, 'show']);
Route::post('/todos', [TodoController::class, 'store']);
Route::put('/todos/{id}', [TodoController::class, 'update']);
Route::patch('/todos/{id}/status', [TodoController::class, 'updateStatus']);
Route::delete('/todos/{id}', [TodoController::class, 'destroy']);

// Kategori İşlemleri
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
Route::get('/categories/{id}/todos', [CategoryController::class, 'todos']);

// İstatistik Uç Noktaları
Route::get('/stats/todos', [StatsController::class, 'todoStats']);
Route::get('/stats/priorities', [StatsController::class, 'priorityStats']);