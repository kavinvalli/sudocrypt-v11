<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DiscordNotUnique extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['discord_username']);
            $table->dropUnique(['discord_discriminator']);
            $table->dropUnique(['discord_email']);
            $table->dropUnique(['discord_image']);
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
            $table->unique('discord_username');
            $table->unique('discord_discriminator');
            $table->unique('discord_email');
            $table->unique('discord_image');
        });
    }
}
