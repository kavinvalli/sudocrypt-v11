<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class MeController extends Controller
{
  public function edit(Request $request)
  {
    $r = $request->validate([
      'name' => 'required',
      'institution' => 'required',
    ]);

    User::where('id', auth()->id())->update($r);

    return redirect()->to('/');
  }
}
