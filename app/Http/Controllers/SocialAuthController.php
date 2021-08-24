<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
  public function githubRedirect()
  {
    return Socialite::driver('github')
      ->redirect();
  }

  public function githubCallback()
  {
    $socialiteUser = Socialite::driver('github')->user();

    try {
      $user = User::firstOrCreate([
        'provider' => 'github',
        'social_id' => $socialiteUser->id
      ], [
        'email' => $socialiteUser->email,
        'name' => $socialiteUser->name,
        'provider' => 'github',
        'social_id' => $socialiteUser->id,
        'social_username' => $socialiteUser->nickname,
        'social_avatar' => $socialiteUser->avatar
      ]);
    } catch (\Illuminate\Database\QueryException $e) {
      // Duplicate Entry
      if ($e->errorInfo[1] == 1062) {
        return Inertia::render('auth/login', [
          'error' => 'You already have an account with that email, please sign in with the appropriate provider'
        ]);
      }

      throw $e;
    }

    Auth::login($user, true);
    return Redirect::to('/');
  }

  public function googleRedirect()
  {
    return Socialite::driver('google')
      // ->with(['hd' => 'dpsrkp.net'])
      ->redirect();
  }

  public function googleCallback()
  {
    $socialiteUser = Socialite::driver('google')->user();

    try {
      $user = User::firstOrCreate([
        'provider' => 'google',
        'social_id' => $socialiteUser->id
      ], [
        'email' => $socialiteUser->email,
        'name' => $socialiteUser->name,
        'provider' => 'google',
        'social_id' => $socialiteUser->id,
        'social_username' => $socialiteUser->nickname,
        'social_avatar' => $socialiteUser->avatar
      ]);
    } catch (\Illuminate\Database\QueryException $e) {
      // Duplicate Entry
      if ($e->errorInfo[1] == 1062) {
        return Inertia::render('auth/login', [
          'error' => 'You already have an account with that email, please sign in with the appropriate provider'
        ]);
      }

      throw $e;
    }

    Auth::login($user, true);
    return Redirect::to('/');
  }
}
