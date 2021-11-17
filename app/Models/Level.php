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
}
