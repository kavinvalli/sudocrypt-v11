<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
  public function show()
  {
    $users = User::select('username', 'points')
      ->where('admin', false)
      ->where('disqualified', false)
      ->orderBy('points', 'DESC')
      ->orderBy('last_solved', 'ASC')
      ->get()
      ->map(function ($user, $key) {
        return [
          'rank' => $key + 1,
          'institution' => $user->institution,
          'username' => $user->username,
          'points' => $user->points
        ];
      });

    return Inertia::render('leaderboard', [
      'users' => $users,
      'dq' => User::select('username', 'points')
        ->where('admin', false)
        ->where('disqualified', true)
        ->get()
    ]);
  }
}
