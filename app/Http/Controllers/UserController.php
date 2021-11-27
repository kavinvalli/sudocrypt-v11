<?php

namespace App\Http\Controllers;

use App\Models\Circle;
use App\Models\Level;
use App\Models\User;
use App\Models\UserAttempt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
  public function index()
  {
    return Inertia::render('admin/users', [
      'users' => User::with(['level', 'circle'])->get()
    ]);
  }

  public function show()
  {
    $user = User::find(auth()->id());
    return Inertia::render('user', [
      'user_profile' => $user,
      'user_attempts' => UserAttempt::select('level_id', 'attempt', 'circle_id')->where('user_id', $user->id)->get()
        ->map(function ($usera, $key) {
          return [
            'level' => $usera->level_id - 1,
            'attempt' => $usera->attempt,
            'circle' => Circle::find($usera->circle_id),
            'correct_answer' => Level::find($usera->level_id)->answer,
          ];
        }),
    ]);
  }

  public function showAdmin(User $user)
  {
    return Inertia::render('user', [
      'user_profile' => $user,
      'user_attempts' => UserAttempt::select('level_id', 'attempt', 'circle_id')->where('user_id', $user->id)->get()
        ->map(function ($usera, $key) {
          return [
            'level' => $usera->level_id - 1,
            'attempt' => $usera->attempt,
            'circle' => Circle::find($usera->circle_id),
            'correct_answer' => Level::find($usera->level_id)->answer,
          ];
        }),
    ]);
  }

  public function disqualify(User $user)
  {
    $user->disqualified = !$user->disqualified;
    $user->save();

    return Redirect::route('users.show', $user);
  }
}
