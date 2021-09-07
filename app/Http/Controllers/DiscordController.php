<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\URL;

class DiscordController extends Controller
{
 /**
     * Redirect user to Discord's OAuth consent page
     */
    public function redirect()
    {
        if (auth()->user()->discord_id) {
            return redirect(route('index'));
        }

        $discord_url = "https://discord.com/api/oauth2/authorize?response_type=code" .
            "&client_id=" . urlencode(Config::get('auth.discord_oauth_client_id')) .
            "&scope=" . urlencode("email identify") .
            "&state=" . Hash::make(Auth::user()->email) .
            "&redirect_uri=" . urlencode(URL::to('/connectdiscord/callback')) .
            "&prompt=consent";

        return redirect($discord_url);
    }

    /**
     * Handle Discord OAuth callback
     */
    public function callback(Request $request)
    {
        $code = $request->query('code');
        $state = $request->query('state');

        if ($request->query('error')) {
            return redirect('/');
        }

        /* if (!Hash::check(Auth::user()->email, $state)) { */
        /*     return redirect('/'); */
        /* } */

        $token = $this->code_exchange($code);
        $user_data = $this->user_data($token);

        User::where('id', Auth::id())
            ->update([
                'discord_id' => $user_data['id'],
                'discord_username' => $user_data['username'],
                'discord_discriminator' => $user_data['discriminator'],
                'discord_email' => $user_data['email'],
            ]);

        return redirect('/');
    }

    /**
     * Exchange OAuth code for access token
     *
     * @returns String
     */
    private function code_exchange(String $code)
    {
        $response = Http::asForm()->post(
            "https://discord.com/api/oauth2/token",
            [
                'client_id' => urlencode(Config::get('auth.discord_oauth_client_id')),
                'client_secret' => urlencode(Config::get('auth.discord_oauth_client_secret')),
                'grant_type' => 'authorization_code',
                'code' => urlencode($code),
                'redirect_uri' => URL::to('/connectdiscord/callback'),
            ]
        );

        if (!$response->ok()) {
            abort(500);
        }

        return $response->json()['access_token'];
    }

    /**
     * Get user data using access token
     */
    private function user_data(String $access_token)
    {
        $response = Http::withHeaders([
            'Authorization' => "Bearer " . $access_token
        ])->get("https://discord.com/api/users/@me");

        if (!$response->ok()) {
            abort(500);
        }

        return $response->json();
    }   //
}
