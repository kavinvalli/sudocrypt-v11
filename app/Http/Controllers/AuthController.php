<?php

namespace App\Http\Controllers;

use App\Models\Level;
use App\Models\User;
use App\Rules\Recaptcha;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AuthController extends Controller
{
  public function loginShow()
  {
    return Inertia::render('auth/login');
  }

  public function registerShow()
  {
    return Inertia::render('auth/register');
  }

  public function login(Request $request)
  {
    $r = $request->validate([
      'email' => 'required|email',
      'password' => 'required|min:8'
    ]);

    $u = User::where('email', $r['email'])->first();

    if (!$u) return Inertia::render(
      'auth/login',
      ['error' => 'An account with this email does not exist']
    );

    if (!Hash::check($r['password'], $u->password)) {
      return Inertia::render('auth/login', ['error' => 'Incorrect password']);
    }

    $attempt = Auth::attempt($r, true);

    if ($attempt) {
      $request->session()->regenerate();
      return Redirect::to('/');
    }

    return Inertia::render('auth/login', ['error' => 'Could not login, an error occurred']);
  }

  public function register(Request $request)
  {
    $r = $request->validate([
      'email' => 'required|email|unique:users,email',
      'name' => 'required',
      'username' => 'required|unique:users,username',
      'password' => 'required|min:8',
      'institution' => 'required',
      'recaptcha' => ['required', new Recaptcha($request->ip())]
    ]);

    $u = new User($r);
    $u->hashPassword();

    $u->level_id = 1;
    $u->circle_id = 1;
    $u->save();

    Auth::login($u, true);

    return Redirect::to('/');
  }

  public function destroy(Request $request)
  {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
  }
}
