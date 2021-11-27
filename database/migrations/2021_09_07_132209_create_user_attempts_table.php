<?php

use App\Models\Circle;
use App\Models\Level;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserAttemptsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('user_attempts', function (Blueprint $table) {
      $table->id();
      $table->timestamps();
      $table->foreignIdFor(Level::class);
      $table->foreignIdFor(Circle::class);
      $table->foreignIdFor(User::class);
      $table->string('attempt');
      $table->string('ip');
      $table->boolean('correct')->default(false);
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('user_attempts');
  }
}
