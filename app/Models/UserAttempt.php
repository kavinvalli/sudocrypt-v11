<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAttempt extends Model
{
  use HasFactory;

  protected $fillable = [
    'attempt',
    'ip',
    'correct'
  ];

  public function circle()
  {
    return $this->hasOne(Circle::class);
  }

  public function level()
  {
    return $this->hasOne(Level::class);
  }

  public function user()
  {
    return $this->hasOne(User::class);
  }
}
