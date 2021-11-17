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
        'notifications' => Notification::take(2)->get()->map(function ($item) {
          return [
            'content' => $item->content,
            'created_at' => $item->created_at->diffForHumans()
          ];
        })->toArray()
      ]);
    } else {
      return Inertia::render('index');
    }
  }

  public function dq()
  {
    if (auth()->check() && !auth()->user()->disqualified) {
      return Redirect::route('index');
    }
    return view('disqualified');
  }
}
