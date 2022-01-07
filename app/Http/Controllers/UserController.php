<?php

namespace App\Http\Controllers;

use App\Models\Circle;
use App\Models\Level;
use App\Models\User;
use App\Models\UserAttempt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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

  public function show(User $user)
  {
    $user->circle;
    $user->level;

    $referred_by = null;
    if ($user->referred_by) {
      $referred_by = User::where('id', $user->referred_by)->first()->username;
    }
    return Inertia::render('admin/user', [
      'user' => $user,
      'referral_number' => User::where('referred_by', $user->id)->count(),
      'referred_by' => $referred_by,
      'circles' => Circle::with('levels')
        ->get()
        ->map(fn ($circle) => [
          'id' => $circle->id,
          'name' => $circle->name,
          'levels' => $circle->levels->map(fn ($lvl) => $lvl->id)
        ]),
      'completed_levels' => UserAttempt::select('level_id as id')
        ->where('correct', true)
        ->where('user_id', $user->id)
        ->get()
        ->map(fn ($lvl) => $lvl->id),
      'attempts' => UserAttempt::where('user_id', $user->id)->get(),
      'error' => null,
    ]);
  }

  public function disqualify(User $user)
  {
    $user->disqualified = !$user->disqualified;
    $user->save();

    return redirect()->back();
  }

  public function admin(User $user)
  {
    $user->admin = !$user->admin;
    $user->save();

    return redirect()->back();
  }

  public function changePassword(User $user)
  {
    $r = request()->validate([
      'password' => 'required|min:8',
    ]);

    $user->password = Hash::make($r['password']);
    $user->save();

    return redirect()->back()->with('message', "Password reset successfully");
  }

  public function level(User $user, Level $level)
  {
    $user->circle;
    return Inertia::render('admin/user_attempts', [
      'user_attempts' => UserAttempt::where('user_id', $user->id)
        ->where('level_id', $level->id)
        ->get(),
      'user' => $user,
      'level' => $level,
      'error' => null,
    ]);
  }
}
