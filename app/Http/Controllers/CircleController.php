<?php

namespace App\Http\Controllers;

use App\Models\Circle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CircleController extends Controller
{
  public function show()
  {
    return Inertia::render('admin/circles', [
      'circles' => Circle::all(),
    ]);
  }
}
