<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ReferralController extends Controller
{
    public function set_referral_code(Request $request)
    {
        $body = $request->validate([
            'referral_code' => 'required|regex:/^[A-Z0-9]+$/|unique:users,referral_code',
        ]);

        User::where('id', auth()->id())
            ->update([
                'referral_code' => $body['referral_code']
            ]);

        return Redirect::route('index');
    }
}
