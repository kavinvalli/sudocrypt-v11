<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class IndexController extends Controller
{
  public function show()
  {
    if (auth()->check()) {
      return Inertia::render('indexAuthenticated', [
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
