<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class IndexController extends Controller
{
  public function show()
  {
    if (auth()->check()) {
      return Inertia::render('indexAuthenticated');
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
