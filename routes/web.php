<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CircleController;
use App\Http\Controllers\DiscordController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\LevelController;
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

// TODO: Route grouping

// dq without auth?
Route::get('/', [IndexController::class, 'show'])->middleware(['dq'])->name('index');
Route::get('/me', [UserController::class, 'show'])->middleware(['auth', 'dq']);
Route::get('/leaderboard', [LeaderboardController::class, 'show'])->middleware(['auth', 'dq']);

Route::get('/dq', [IndexController::class, 'dq'])->name('dq');

Route::get('/play', [IndexController::class, 'showPlay'])->middleware(['auth', 'dq']);
Route::post('/play', [IndexController::class, 'play'])->middleware(['auth', 'dq']);
Route::post('/choose-level', [IndexController::class, 'chooseLevel'])->middleware(['auth', 'dq']);

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

Route::get('/connectdiscord', [DiscordController::class, 'redirect'])
  ->middleware(['auth']);
Route::get('/connectdiscord/callback', [DiscordController::class, 'callback'])
  ->middleware(['auth']);

Route::get('/admin', [AdminController::class, 'show'])->middleware(['auth', 'admin']);

Route::resource('/admin/shortlinks', ShortlinkController::class)
  ->only(['index', 'store', 'destroy'])
  ->middleware(['web', 'auth', 'admin']);

Route::get('/admin/users', [UserController::class, 'index'])
  ->middleware(['auth', 'admin'])
  ->name('users.index');

Route::get('/admin/users/{user}', [UserController::class, 'showAdmin'])
  ->middleware(['auth', 'admin'])
  ->name('users.show');

Route::post('/admin/users/{user}/dq', [UserController::class, 'disqualify'])
  ->middleware(['auth', 'admin'])
  ->name('users.disqualify');

Route::get('/admin/circles', [CircleController::class, 'show'])
  ->middleware(['auth', 'admin']);

Route::resource('/admin/levels', LevelController::class)
  ->only(['index', 'store', 'destroy', 'edit', 'update'])
  ->middleware(['web', 'auth', 'admin']);

Route::resource('/admin/notifications', NotificationController::class)
  ->only(['index', 'store', 'show', 'destroy', 'edit', 'update'])
  ->middleware(['web', 'auth', 'admin']);

Route::get('/{shortlink:shortlink}', [ShortlinkController::class, 'redirect'])
  ->where('shortlink', '.*');

if (App::environment('local')) {
  Route::get('/authn', function () {
    return dd(Auth::user());
  })->middleware(['auth']);
}
