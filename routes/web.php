<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiscordController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\SocialAuthController;
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

/* Route::get('/', function () { */
/*   return Inertia::render('index'); */
/* })->name('home'); */

Route::get('/', [IndexController::class, 'show']);

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

    // ----- Social Authentication -----
    Route::prefix('/social')
      ->name('social.')
      ->group(function () {
        Route::prefix('/github')
          ->name('github.')
          ->group(function () {
            Route::get('/', [SocialAuthController::class, 'githubRedirect'])
              ->name('redirect');
            Route::get('/callback', [SocialAuthController::class, 'githubCallback'])
              ->name('callback');
          });
        Route::prefix('/google')
          ->name('google.')
          ->group(function () {
            Route::get('/', [SocialAuthController::class, 'googleRedirect'])
              ->name('redirect');
            Route::get('/callback', [SocialAuthController::class, 'googleCallback'])
              ->name('callback');
          });
        Route::prefix('/discord')
          ->name('discord.')
          ->group(function () {
            Route::get('/', [SocialAuthController::class, 'discordRedirect'])
              ->name('redirect');
            Route::get('/callback', [SocialAuthController::class, 'discordCallback'])
              ->name('callback');
          });
      });
  });

Route::get('/auth/logout', [AuthController::class, 'destroy'])
  ->middleware(['auth'])
  ->name('auth.logout');

Route::get('/connectdiscord', [DiscordController::class, 'redirect'])
  ->middleware(['auth']);
Route::get('/connectdiscord/callback', [DiscordController::class, 'callback'])
  ->middleware(['auth']);

if (App::environment('local')) {
  Route::get('/authn', function () {
    return dd(Auth::user());
  })->middleware(['auth']);
}
