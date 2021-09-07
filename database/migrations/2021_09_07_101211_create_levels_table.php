<?php

use App\Models\Circle;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLevelsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('levels', function (Blueprint $table) {
      $table->id();
      $table->timestamps();
      $table->foreignIdFor(Circle::class);
      $table->string('question');
      $table->string('source_hint');
      $table->string('answer');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('levels');
  }
}
