<?php

namespace Database\Seeders;

use Carbon\Carbon;
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
    $sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmfGiskAV-1ZmPTcgJPGgtlL-liYJwSgI9CRczJzrqR7w0AVE5_Ipe0aEsf5CTyCurLFs2Tvv7Xkxh/pub?gid=0&single=true&output=tsv";
    $sheetContent = explode("\r\n", file_get_contents($sheetURL));
    $lines = array_slice($sheetContent, 1);
    $rows = collect();
    $now = Carbon::now('Asia/Kolkata');
    foreach ($lines as $line) {
      $row = str_getcsv($line, "\t");
      $rows->push([
        'id' => $row[0],
        'name' => $row[1],
        'created_at' => $now,
        'updated_at' => $now,
      ]);
    }

    DB::table('circles')->upsert($rows->toArray(), ['id'], ['name']);
  }
}
