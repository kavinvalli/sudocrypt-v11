<?php

namespace Database\Seeders;

use App\Models\Circle;
use App\Models\Level;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $circle1 = Circle::find(1);
    $circle1->levels()->saveMany([
      new Level([
        'question' => 'Level question should be longer than this',
        'answer' => 'verylonganswer',
        'source_hint' => 'SOURCE HINT ON THE SOURCE',
      ]),
    ]);
    $circle2 = Circle::find(2);
    $circle2->levels()->saveMany([
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
    ]);
    $circle3 = Circle::find(3);
    $circle3->levels()->saveMany([
      new Level([
        'question' => 'Level question should be longer than this 3',
        'answer' => 'verylonganswer3',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 3',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 3',
        'answer' => 'verylonganswer3',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 3',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 3',
        'answer' => 'verylonganswer3',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 3',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 3',
        'answer' => 'verylonganswer3',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 3',
      ]),
    ]);
    $circle4 = Circle::find(4);
    $circle4->levels()->saveMany([
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
    ]);
    $circle5 = Circle::find(5);
    $circle5->levels()->saveMany([
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
    ]);
    $circle6 = Circle::find(6);
    $circle6->levels()->saveMany([
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
    ]);
    $circle7 = Circle::find(7);
    $circle7->levels()->saveMany([
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
    ]);
    $circle8 = Circle::find(8);
    $circle8->levels()->saveMany([
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
    ]);
    $circle9 = Circle::find(9);
    $circle9->levels()->saveMany([
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
    ]);
    $circle10 = Circle::find(10);
    $circle10->levels()->saveMany([
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
      new Level([
        'question' => 'Level question should be longer than this 2',
        'answer' => 'verylonganswer2',
        'source_hint' => 'SOURCE HINT ON THE SOURCE 2',
      ]),
    ]);
    $circle11 = Circle::find(11);
    $circle11->levels()->saveMany([
      new Level([
        'question' => 'Level question should be longer than this',
        'answer' => 'verylonganswer',
        'source_hint' => 'SOURCE HINT ON THE SOURCE',
      ]),
    ]);
    $circle12 = Circle::find(12);
    $circle12->levels()->saveMany([
      new Level([
        'question' => 'Level question should be longer than this',
        'answer' => 'verylonganswer',
        'source_hint' => 'SOURCE HINT ON THE SOURCE',
      ]),
    ]);
  }
}
