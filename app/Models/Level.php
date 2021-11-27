<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
  use HasFactory;

  protected $fillable = [
    'question',
    'answer',
    'points',
    'source_hint',
    'circle_id',
  ];

  public function circle()
  {
    return $this->hasOne(Circle::class);
  }

  public function users()
  {
    return $this->hasMany(User::class);
  }

  public function attempts()
  {
    return $this->hasMany(UserAttempt::class);
  }

  public function solves()
  {
    return $this->hasMany(UserAttempt::class)->where('correct', true);
  }
}
