<?php

namespace App\Console\Commands;

use App\Events\NotificationCreated;
use App\Models\Notification;
use App\Models\User;
use Discord\Discord;
use Discord\Parts\Embed\Embed;
use Illuminate\Console\Command;

class DiscordBot extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'discord:run';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Run Discord Bot Code';

  /**
   * Create a new command instance.
   *
   * @return void
   */
  public function __construct()
  {
    parent::__construct();
  }

  private function decodeUsername($content)
  {
    $splitUp = explode(" ", $content);
    array_shift($splitUp);
    $a = explode("#", $splitUp[count($splitUp) - 1]);
    $discriminator = array_pop($a);
    $username = $a[0];
    echo var_dump([$username, $discriminator]);
    return [$username, $discriminator];
  }

  private function createNotification($content, $image)
  {
    $notif = new Notification();
    $notif->content = $content . $image ? " <img class=\"w-80\" src=\"{$image}\"></img>" : "";
    $notif->save();

    broadcast(new NotificationCreated());
  }

  private function sendUserEmbed($message, $user, $discord)
  {
    $embed = new Embed($discord);
    $embed->setTitle($user->username);
    $embed->addFieldValues('Name', $user->name, false);
    $embed->addFieldValues('Email', $user->email, false);
    $embed->addFieldValues('Discord', $user->discord_id . $user->discord_discriminator, false);
    $embed->addFieldValues('Institution', $user->institution, false);
    $embed->addFieldValues('Circle', $user->circle, false);
    $embed->addFieldValues('Level', $user->level, false);
    $embed->addFieldValues('Points', $user->points, false);

    $message->channel->sendEmbed($embed);
  }

  private function discordLookup($message, $discord)
  {
    $data = $this->decodeUsername($message->content);
    $username = $data[0];
    $discriminator = $data[1];

    echo $username . " " . $discriminator;

    $user = User::select('name', 'username', 'email', 'institution', 'circle', 'level', 'points', 'discord_id', 'discord_discriminator')
      ->where('discord_username', $username)
      ->where('discord_discriminator', $discriminator)
      ->get()[0];

    if (!$user) {
      $message->channel->sendMessage("User with username " . $username . "and discriminator " . $discriminator . " not found");
      return;
    }

    $this->sendUserEmbed($message, $user, $discord);
  }

  private function userLookup($message, $discord)
  {
    /* $data = $this->decodeUsername($message->content); */
    /* $username = $data[0]; */
    /* $discriminator = $data[1]; */
    $splitUp = explode(" ", $message->content);
    array_shift($splitUp);
    $username = $splitUp[0];

    $user = User::select('name', 'username', 'email', 'institution', 'circle', 'level', 'points', 'discord_username', 'discord_discriminator')
      ->where('username', $username)
      ->get()[0];

    if (!$user) {
      $message->channel->sendMessage("User with username " . $username . " not found");
      return;
    }

    $this->sendUserEmbed($message, $user, $discord);
  }

  /**
   * Execute the console command.
   *
   * @return int
   */
  public function handle()
  {
    $discord = new Discord([
      'token' => env('DISCORD_BOT_TOKEN'),
    ]);

    $discord->on('ready', function ($discord) {
      echo "Bot is ready!", PHP_EOL;

      // Listen for messages.
      $discord->on('message', function ($message, $discord) {
        /* echo "{$message->author->username}: {$message->content}: {$message->channel_id}", PHP_EOL; */
        /* echo var_dump($message->attachments); */

        if ($message->channel_id === env("DISCORD_HINTS_CHANNEL_ID")) {
          $this->createNotification($message->content, count($message->attachments) > 0 ? $message->attachments[0]->url : "");
        }

        if (str_starts_with($message->content, "!dlookup")) {
          $this->discordLookup($message, $discord);
        }

        if (str_starts_with($message->content, "!ulookup")) {
          $this->userLookup($message, $discord);
        }
      });
    });

    $discord->run();

    /* return 0; */
  }
}
