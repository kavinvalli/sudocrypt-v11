<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
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

Route::get('/', function () {
  return Inertia::render('index');
})->name('home');

// ----- Authentication ----- 
Route::get('/auth/register', [AuthController::class, 'registerShow'])
  ->middleware(['guest'])
  ->name('register');
Route::get('/auth/login', [AuthController::class, 'loginShow'])
  ->middleware(['guest'])
  ->name('login');
Route::post('/auth/register', [AuthController::class, 'register'])
  ->middleware(['guest']);
Route::post('/auth/login', [AuthController::class, 'login'])
  ->middleware(['guest']);
Route::get('/auth/logout', [AuthController::class, 'destroy'])
  ->middleware(['auth'])
  ->name('logout');

// ----- Social Authentication -----
Route::get('/auth/social/github', [SocialAuthController::class, 'githubRedirect'])
  ->middleware(['guest']);
Route::get('/auth/social/github/callback', [SocialAuthController::class, 'githubCallback'])
  ->middleware(['guest']);
Route::get('/auth/social/google', [SocialAuthController::class, 'googleRedirect'])
  ->middleware(['guest']);
Route::get('/auth/social/google/callback', [SocialAuthController::class, 'googleCallback'])
  ->middleware(['guest']);

if (App::environment('local')) {
  Route::get('/authn', function () {
    return dd(Auth::user());
  })->middleware(['auth']);
}
