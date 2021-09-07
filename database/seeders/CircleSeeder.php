<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CircleSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('circles')->insert([
      'name' => 'Earth',
      'onlyOneLevel' => true
    ]);
    DB::table('circles')->insert([
      'name' => 'Limbo',
    ]);
    DB::table('circles')->insert([
      'name' => 'Desire',
    ]);
    DB::table('circles')->insert([
      'name' => 'Gluttony',
    ]);
    DB::table('circles')->insert([
      'name' => 'Greed',
    ]);
    DB::table('circles')->insert([
      'name' => 'Anger',
    ]);
    DB::table('circles')->insert([
      'name' => 'Heresy',
    ]);
    DB::table('circles')->insert([
      'name' => 'Violence',
    ]);
    DB::table('circles')->insert([
      'name' => 'Fraud',
    ]);
    DB::table('circles')->insert([
      'name' => 'Treachery',
    ]);
    DB::table('circles')->insert([
      'name' => 'Purgatory',
      'onlyOneLevel' => true
    ]);
    DB::table('circles')->insert([
      'name' => 'Paradise',
      'onlyOneLevel' => true
    ]);
  }
}
