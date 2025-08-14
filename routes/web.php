<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ScoreController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
    Route::get('reactionTime', fn () => Inertia::render('ReactionTime'))->name('reactionTime');
    Route::get('flappyBird', fn () => Inertia::render('FlappyBird'))->name('flappyBird');
});

Route::get('/ping', function () {
    return response()->json(['status' => 'ok']);
});

Route::prefix('api')->group(function () {
    Route::get('/leaderboard/{game}', [ScoreController::class, 'leaderboard']);
    Route::post('/scores', [ScoreController::class, 'store']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

