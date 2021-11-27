<?php

namespace Database\Seeders;

use App\Models\Shortlink;
use Illuminate\Database\Seeder;

class ShortlinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        (new Shortlink(['shortlink' => 'website', 'url' => 'https://exunclan.com/']))->save();
        (new Shortlink(['shortlink' => 'facebook', 'url' => 'https://www.facebook.com/sudocrypt/']))->save();
        (new Shortlink(['shortlink' => 'discord', 'url' => 'https://www.discord.com/']))->save();
    }
}
