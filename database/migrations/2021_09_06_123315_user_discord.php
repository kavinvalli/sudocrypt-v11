<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserDiscord extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('users', function (Blueprint $table) {
      $table->string('discord_id')->nullable()->unique();
      $table->string('discord_username')->nullable()->unique();
      $table->string('discord_discriminator')->nullable()->unique();
      $table->string('discord_email')->nullable()->unique();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('users', function (Blueprint $table) {
      $table->dropColumn('discord_id');
      $table->dropColumn('discord_username');
      $table->dropColumn('discord_discriminator');
      $table->dropColumn('discord_email');
    });
  }
}
