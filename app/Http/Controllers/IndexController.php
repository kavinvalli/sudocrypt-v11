<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Request;

class IndexController extends Controller
{
  public function show(Request $request)
  {
    $referred_by = null;
    if (auth()->user()->referred_by) {
      $referred_by = User::where('id', auth()->user()->referred_by)->first()->username;
    }

    if (auth()->check()) {
      return Inertia::render('indexAuthenticated', [
        'referred_by' => $referred_by,
        'referral_number' => User::where('referred_by', auth()->user()->id)->count(),
        'notifications' => Notification::orderBy('created_at', 'DESC')->get()
      ]);
    } else {
      return Inertia::render('index');
    }
  }

  public function about()
  {
    return Inertia::render('about');
  }

  public function dq()
  {
    if (auth()->check() && !auth()->user()->disqualified) {
      return Redirect::route('index');
    }
    return view('disqualified');
  }

  public function notifications()
  {
    return Inertia::render('notifications', [
      'notifications' => Notification::get()->map(function ($item) {
        return [
          'content' => $item->content,
          'created_at' => $item->created_at->diffForHumans()
        ];
      })->toArray()
    ]);
  }
}
