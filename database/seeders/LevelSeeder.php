<?php

namespace Database\Seeders;

use App\Models\Circle;
use App\Models\Level;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LevelSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmfGiskAV-1ZmPTcgJPGgtlL-liYJwSgI9CRczJzrqR7w0AVE5_Ipe0aEsf5CTyCurLFs2Tvv7Xkxh/pub?gid=1778063979&single=true&output=tsv";
    $sheetContent = explode("\r\n", file_get_contents($sheetURL));
    $lines = array_slice($sheetContent, 1);
    $rows = collect();
    $now = Carbon::now('Asia/Kolkata');
    foreach ($lines as $line) {
      $row = str_getcsv($line, "\t");
      $rows->push([
        'id' => $row[0],
        'circle_id' => $row[1],
        'points' => $row[2],
        'question' => $row[3],
        'source_hint' => $row[4],
        'answer' => $row[5],
        'created_at' => $now,
        'updated_at' => $now,
      ]);
    }

    DB::table('levels')->upsert(
      $rows->toArray(),
      ['id'],
      ['circle_id', 'points', 'question', 'source_hint', 'answer']
    );
  }
}
