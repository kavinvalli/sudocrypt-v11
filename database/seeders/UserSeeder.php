<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $admin = User::factory()->admin()->make();
    $admin->name = "Sudocrypt Admin";
    $admin->email = "sudocrypt@exun.co";
    $admin->username = "admin";
    $admin->institution = "Exun Clan";
    $admin->password = Hash::make('sud0crypt@dm1np@ssw0rd');
    $admin->save();

    User::factory(1999)->create();
  }
}
