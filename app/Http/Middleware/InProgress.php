<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class InProgress
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle(Request $request, Closure $next)
  {
    $started = \Carbon\Carbon::parse(env('START_TIME'))
      ->lt(\Carbon\Carbon::now('Asia/Kolkata')) &&
      \Carbon\Carbon::now('Asia/Kolkata')
      ->lt(\Carbon\Carbon::parse(env('END_TIME')));
    $ended = \Carbon\Carbon::parse(env('END_TIME'))
      ->lt(\Carbon\Carbon::now('Asia/Kolkata'));

    if ($started && !$ended) {
      return $next($request);
    }

    return Redirect::to('/');
  }
}
