<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserAttempt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
  public function show()
  {
    return Inertia::render('admin/index', [
      'users' => User::count(),
      'discord_accounts' => User::whereNotNull('discord_id')->count(),
      'attempts' => UserAttempt::count(),
    ]);
  }
}
