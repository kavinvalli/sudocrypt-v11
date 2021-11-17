<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('username');
      $table->string('email')->unique();
      $table->timestamp('email_verified_at')->nullable();
      $table->string('password');
      $table->string('institution');
      $table->boolean('admin')->default(false);
      $table->boolean('disqualified')->default(false);
      $table->integer('points')->default(0);
      $table->timestamp('last_solved')->useCurrent();

      // Discord
      $table->string('discord_id')->nullable()->unique();
      $table->string('discord_username')->nullable()->unique();
      $table->string('discord_discriminator')->nullable()->unique();
      $table->string('discord_email')->nullable()->unique();

      $table->rememberToken();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('users');
  }
}
