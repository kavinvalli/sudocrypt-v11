<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CircleController;
use App\Http\Controllers\DiscordController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\PlayController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\MeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ShortlinkController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/dq', [IndexController::class, 'dq'])->name('dq');
Route::get('/leaderboard', [LeaderboardController::class, 'show'])->name('leaderboard');

Route::get('/', [IndexController::class, 'show'])->middleware(['dq'])->name('index');

Route::prefix('/me')
  ->middleware(['auth'])
  ->name('me.')
  ->group(function () {
    Route::post('/edit', [MeController::class, 'edit'])->name('edit');
  });

Route::prefix('/play')
  ->middleware(['in-progress', 'auth', 'dq'])
  ->name('play.')
  ->group(function () {
    Route::get('/', [PlayController::class, 'show'])->name('show');
    Route::post('/', [PlayController::class, 'attempt'])->name('attempt');
    Route::post('/choose-level', [PlayController::class, 'chooseLevel'])->name('chooseLevel');
  });

// ----- Authentication -----
Route::prefix('/auth')
  ->middleware(['guest'])
  ->name('auth.')
  ->group(function () {
    Route::get('/register', [AuthController::class, 'registerShow'])
      ->name('register');
    Route::get('/login', [AuthController::class, 'loginShow'])
      ->name('login');
    Route::post('/register', [AuthController::class, 'register'])
      ->name('handleRegister');
    Route::post('/login', [AuthController::class, 'login'])
      ->name('handleLogin');
  });

Route::get('/auth/logout', [AuthController::class, 'destroy'])
  ->middleware(['auth'])
  ->name('auth.logout');

Route::prefix('/discord')
  ->middleware(['auth'])
  ->name('discord.')
  ->group(function () {
    Route::get('/', [DiscordController::class, 'redirect'])->name('connect');
    Route::get('/callback', [DiscordController::class, 'callback'])->name('callback');
    Route::get('/disconnect', [DiscordController::class, 'disconnect'])->name('connect');
  });

Route::prefix('/discord/login')
  ->name('discord.login')
  ->group(function () {
    Route::get('/', [DiscordController::class, 'loginRedirect'])->name('redirect');
    Route::get('/callback', [DiscordController::class, 'loginCallback'])->name('callback');
  });

Route::prefix('/admin')
  ->middleware(['auth', 'admin'])
  ->name('admin.')
  ->group(function () {
    Route::get('/', [AdminController::class, 'show'])->name('index');

    Route::resource('/shortlinks', ShortlinkController::class)
      ->only(['index', 'store', 'destroy']);

    Route::get('/users', [UserController::class, 'index'])
      ->name('users.index');

    Route::get('/users/{user}', [UserController::class, 'showAdmin'])
      ->name('users.show');

    Route::post('/users/{user}/dq', [UserController::class, 'disqualify'])
      ->name('users.disqualify');

    Route::get('/circles', [CircleController::class, 'show'])
      ->name('circles.index');

    Route::resource('/levels', LevelController::class)
      ->only(['index', 'store', 'destroy', 'edit', 'update']);

    Route::resource('/notifications', NotificationController::class)
      ->only(['index', 'store', 'show', 'destroy', 'edit', 'update']);
  });

Route::get('/{shortlink:shortlink}', [ShortlinkController::class, 'redirect'])
  ->where('shortlink', '.*');

if (App::environment('local')) {
  Route::get('/authn', function () {
    return dd(Auth::user());
  })->middleware(['auth']);
}
