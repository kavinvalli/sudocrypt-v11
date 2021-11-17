<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name',
    'email',
    'password',
    'institution',
    'username',
    'discord_id',
    'discord_email',
    'discord_username',
    'discord_discriminator',
    'admin',
    'disqualified'
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast to native types.
   *
   * @var array
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  public function hashPassword()
  {
    $this->password = Hash::make($this->password);
  }

  public function verifyPassword($password)
  {
    return Hash::check($password, $this->password);
  }

  public function circle()
  {
    return $this->hasOne(Circle::class);
  }

  public function level()
  {
    return $this->hasOne(Level::class);
  }

  public function attempts()
  {
    return $this->hasMany(UserAttempt::class);
  }
}
