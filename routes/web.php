<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\InfrastructureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SolutionController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/reports/{report}/importance', [ReportController::class, 'toggleImportance'])->name('reports.importance');
    Route::get('/solutions/history', [SolutionController::class, 'history'])->name('solutions.history');
    Route::resource('reports', ReportController::class);
    Route::resource('reports.comments', CommentController::class)->shallow()->only(['store', 'update', 'destroy']);
    Route::resource('solutions', SolutionController::class);
    Route::resource('infrastructures', InfrastructureController::class)->middleware('role:admin');
    Route::resource('users', UserController::class)->middleware('role:admin');
});

require __DIR__.'/auth.php';
