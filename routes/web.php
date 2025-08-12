<?php

// use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('reactionTime', function () {
//         return Inertia::render('ReactionTime');
//     })->name('reactionTime');
// });



// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';


use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ScoreController;
// use App\Http\Middleware\VerifyCsrfToken;
use vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
    Route::get('reactionTime', fn () => Inertia::render('ReactionTime'))->name('reactionTime');
});

Route::get('/flappyBird', fn () => Inertia::render('FlappyBird'));

// Optional non-API routes
Route::prefix('api')->group(function () {
    Route::get('/leaderboard/{game}', [ScoreController::class, 'leaderboard']);
    Route::post('/scores', [ScoreController::class, 'store'])->withoutMiddleware([VerifyCsrfToken::class]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

