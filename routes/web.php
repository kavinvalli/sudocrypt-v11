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
use App\Http\Controllers\ReferralController;
use App\Http\Controllers\RlLeaderboardController;
use App\Http\Controllers\ShortlinkController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Request;

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

Route::get('/404', function (Request $request) {
  return Inertia::render('404')->toResponse($request)->setStatusCode(404);
});

Route::get('/dq', [IndexController::class, 'dq'])->name('dq');
Route::get('/leaderboard', [LeaderboardController::class, 'show'])->name('leaderboard');
/* Route::get('/rlleaderboard', [RlLeaderboardController::class, 'show'])->name('rlleaderboard'); */

Route::get('/', [IndexController::class, 'show'])->middleware(['dq'])->name('index');
Route::get('/about', [IndexController::class, 'about'])->middleware(['dq'])->name('about');

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

    Route::prefix('/users')
      ->name('users.')
      ->group(function () {
        Route::get('/', [UserController::class, 'index'])
          ->name('index');
        Route::get('/{user}', [UserController::class, 'show'])
          ->name('show');
        Route::get('/{user}/lvl/{level}', [UserController::class, 'level'])
          ->name('level');
        Route::post('/{user}/dq', [UserController::class, 'disqualify'])
          ->name('disqualify');
        Route::post('/{user}/admin', [UserController::class, 'admin'])
          ->name('admin');
        Route::post('/{user}/changepwd', [UserController::class, 'changePassword'])
          ->name('changePassword');
      });

    Route::resource('/shortlinks', ShortlinkController::class)
      ->only(['index', 'store', 'destroy']);

    Route::resource('/notifications', NotificationController::class)
      ->only(['index', 'store', 'show', 'destroy', 'edit', 'update']);

    Route::prefix('/levels')
      ->name('levels.')
      ->group(function () {
        Route::get('/', [LevelController::class, 'index'])->name('index');
        Route::get('/{level}', [LevelController::class, 'show'])->name('show');
        Route::put('/{level}', [LevelController::class, 'update'])->name('update');
      });

    Route::prefix('/circles')
      ->name('circles.')
      ->group(function () {
        Route::put('/{circle}', [CircleController::class, 'update'])->name('update');
      });
  });

Route::get('/{shortlink:shortlink}', [ShortlinkController::class, 'redirect'])
  ->where('shortlink', '.*')
  ->missing(function (Request $request) {
    return Redirect::to('/404');
  });

if (App::environment('local')) {
  Route::get('/authn', function () {
    return dd(Auth::user());
  })->middleware(['auth']);
}
