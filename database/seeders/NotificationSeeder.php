<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NotificationSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $rows = collect();
    for ($i = 0; $i < 40; $i++) {
      $rows->push([
        'content' => 'In publishing and graphic design, Lorem ipsum is a <strong>placeholder</strong> text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
        'created_at' => Carbon::now('Asia/Kolkata'),
        'updated_at' => Carbon::now('Asia/Kolkata'),
      ]);
    }
    DB::table('notifications')->insert($rows->toArray());
  }
}
