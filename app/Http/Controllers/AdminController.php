<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Shortlink;
use App\Models\User;
use App\Models\UserAttempt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
  public function show()
  {
    return Inertia::render('admin/index', [
      'users' => User::where('admin', false)->count(),
      'discord_accounts' => User::whereNotNull('discord_id')->count(),
      'attempts' => UserAttempt::count(),
      'levels_solved' => UserAttempt::where('correct', true)->count(),
      'notifications' => Notification::count(),
      'shortlinks' => Shortlink::count(),
      'referrals' => User::whereNotNull('referred_by')->count(),
    ]);
  }
}
