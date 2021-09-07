<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IndexController extends Controller
{
  public function show()
  {
    if (Auth::check()) {
      $user = User::find(auth()->id());
      return Inertia::render('indexAuthenticated', [
        'discord_authenticated' => $user->discord_id ? true : false,
      ]);
    }

    return Inertia::render('index');
  }
}
