<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class Recaptcha implements Rule
{
  public $ip = '';
  public $secret = '';

  /**
   * Create a new rule instance.
   *
   * @param  string  $ip The user's ip address
   * @param  string  $secret RECAPTCHA secret, if not passed taken from .env
   * @return void
   */
  public function __construct($ip, $secret = null)
  {
    $this->ip = $ip;
    if ($secret) {
      $this->secret = $secret;
    } else {
      $this->secret = env('CAPTCHA_SECRET', '');
    }
  }

  /**
   * Determine if the validation rule passes.
   *
   * @param  string  $attribute
   * @param  mixed  $value
   * @return bool
   */
  public function passes($attribute, $token)
  {
    $r = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
      'secret' => $this->secret,
      'remoteip' => $this->ip,
      'response' => $token
    ]);

    Log::info($r->json());

    return $r->json()['success'];
  }

  /**
   * Get the validation error message.
   *
   * @return string
   */
  public function message()
  {
    return 'Bot bad';
  }
}
