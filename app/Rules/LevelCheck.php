<?php

namespace App\Rules;

use App\Models\Level;
use Illuminate\Contracts\Validation\Rule;

class LevelCheck implements Rule
{
  /**
   * Create a new rule instance.
   *
   * @return void
   */
  public function __construct()
  {
    //
  }

  /**
   * Determine if the validation rule passes.
   *
   * @param  string  $attribute
   * @param  mixed  $value
   * @return bool
   */
  public function passes($attribute, $value)
  {
    $answer = Level::find(request()->user()->level)->answer;
    return $answer === $value;
  }

  /**
   * Get the validation error message.
   *
   * @return string
   */
  public function message()
  {
    return 'Not it';
  }
}
