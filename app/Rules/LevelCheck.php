<?php

namespace App\Rules;

use App\Models\Level;
use App\Models\UserAttempt;
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
    $answer = request()->user()->level->answer;

    (new UserAttempt([
      'attempt' => $value,
      'user_id' => auth()->id(),
      'level_id' => auth()->user()->level->id,
      'circle_id' => auth()->user()->circle->id,
      'correct' => $answer === $value,
      'ip' => request()->ip()
    ]))->save();

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
