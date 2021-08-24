<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserSocial extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('users', function (Blueprint $table) {
      $table->string('provider')->default('local');
      $table->string('social_id')->nullable();
      $table->string('social_username')->nullable();
      $table->string('social_avatar')->nullable();
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
      $table->dropColumn('provider');
      $table->dropColumn('social_id');
      $table->dropColumn('social_username');
      $table->dropColumn('social_avatar');
    });
  }
}
