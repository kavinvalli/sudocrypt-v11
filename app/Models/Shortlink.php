<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shortlink extends Model
{
  use HasFactory;

  protected $fillable = ['shortlink', 'url'];
}
