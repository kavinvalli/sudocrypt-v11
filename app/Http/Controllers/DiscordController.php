<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

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

    /* ddd(urlencode(URL::to('/discord/callback'))); */

    $discord_url = "https://discord.com/api/oauth2/authorize?response_type=code" .
      "&client_id=" . urlencode(Config::get('auth.discord_oauth_client_id')) .
      "&scope=" . urlencode("email identify") .
      "&state=" . Hash::make(Auth::user()->email) .
      "&redirect_uri=" . urlencode(URL::to('/discord/callback')) .
      "&prompt=consent";

    return Inertia::location($discord_url);
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

    if (!Hash::check(Auth::user()->email, $state)) {
      return redirect('/');
    }

    $token = $this->code_exchange($code, '/discord/callback');
    $user_data = $this->user_data($token);

    $connected = User::where('discord_id', $user_data['id'])->count() > 0;

    if ($connected) {
      return redirect('/')->with('error', 'Discord account is already connected to another account');
    }

    User::where('id', Auth::id())
      ->update([
        'discord_id' => $user_data['id'],
        'discord_username' => $user_data['username'],
        'discord_discriminator' => $user_data['discriminator'],
        'discord_email' => $user_data['email'],
        'discord_image' => "https://cdn.discordapp.com/avatars/" . $user_data['id'] . "/" . $user_data['avatar'] . ".png",
      ]);

    return redirect('/');
  }

  /**
   * Login with discord (redirect)
   */
  public function loginRedirect()
  {
    if (auth()->check()) {
      return redirect(route('index'));
    }

    $discord_url = "https://discord.com/api/oauth2/authorize?response_type=code" .
      "&client_id=" . urlencode(Config::get('auth.discord_oauth_client_id')) .
      "&scope=" . urlencode("email identify") .
      "&state=" . "dsjaldkjsalkdjaklsd" .
      "&redirect_uri=" . urlencode(URL::to('/discord/login/callback')) .
      "&prompt=consent";

    return Inertia::location($discord_url);
  }

  /**
   * Login with discord (callback)
   */
  public function loginCallback(Request $request)
  {
    $code = $request->query('code');

    if ($request->query('error')) {
      return redirect('/auth/login');
    }

    $token = $this->code_exchange($code, '/discord/login/callback');
    $user_data = $this->user_data($token);

    $user = User::where('discord_id', $user_data['id'])->first();

    if ($user) {
      Auth::login($user, true);
      $request->session()->regenerate();
      return Redirect::to('/');
    }

    return redirect('/auth/login')->with('error', 'No account is connect to that Discord account');
  }

  /**
   * Disconnect
   */
  public function disconnect(Request $request)
  {
    User::where('id', auth()->id())->update(
      [
        'discord_id' => null,
        'discord_username' => null,
        'discord_discriminator' => null,
        'discord_email' => null,
        'discord_image' => null,
      ]
    );

    return redirect('/');
  }

  /**
   * Exchange OAuth code for access token
   *
   * @returns String
   */
  private function code_exchange(String $code, String $redirect_uri = '/discord/callback')
  {
    $response = Http::asForm()->post(
      "https://discord.com/api/oauth2/token",
      [
        'client_id' => urlencode(Config::get('auth.discord_oauth_client_id')),
        'client_secret' => urlencode(Config::get('auth.discord_oauth_client_secret')),
        'grant_type' => 'authorization_code',
        'code' => urlencode($code),
        'redirect_uri' => URL::to($redirect_uri),
      ]
    );

    if (!$response->ok()) {
      ddd($response->json());
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
  }
}
