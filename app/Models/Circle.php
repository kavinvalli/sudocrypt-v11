<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Circle extends Model
{
  use HasFactory;

  public function levels()
  {
    return $this->hasMany(Level::class);
  }
}
