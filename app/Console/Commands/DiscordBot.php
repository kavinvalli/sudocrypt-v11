<?php

namespace App\Console\Commands;

use App\Events\NotificationCreated;
use App\Models\Circle;
use App\Models\Notification;
use App\Models\User;
use Discord\Discord;
use Discord\Parts\Channel\Message;
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
    return [$username, $discriminator];
  }

  private function createNotification($content, $image)
  {
    $notif = new Notification();
    $notif->content = $content . ($image ? " <img class=\"w-80\" src=\"{$image}\"></img>" : "");
    $notif->save();

    broadcast(new NotificationCreated());
  }

  private function sendUserEmbed($message, $user, $discord)
  {
    $embed = new Embed($discord);
    $embed->setTitle($user->username);
    $embed->addFieldValues('Name', $user->name, false);
    $embed->addFieldValues('Email', $user->email, false);
    $embed->addFieldValues('Discord', $user->discord_username . "#" . $user->discord_discriminator, false);
    $embed->addFieldValues('Institution', $user->institution, false);
    $embed->addFieldValues('Circle', Circle::find($user->circle_id)->name, false);
    $level = $user->level_id ? $user->level_id : "-";
    $embed->addFieldValues('Level', $level, false);
    $embed->addFieldValues('Points', $user->points, false);
    $embed->addFieldValues('Disqualified', $user->disqualified ? "Yes" : "No", false);

    $message->channel->sendEmbed($embed);
  }

  private function discordLookup($message, $discord)
  {
    $data = $this->decodeUsername($message->content);
    $username = $data[0];
    $discriminator = $data[1];

    echo $username . " " . $discriminator;

    $user = User::select('name', 'username', 'email', 'institution', 'circle_id', 'level_id', 'points', 'discord_username', 'discord_discriminator')
      ->where('discord_username', $username)
      ->where('discord_discriminator', $discriminator)
      ->first();

    echo var_dump($user);

    if (!$user) {
      $message->channel->sendMessage("User with username " . $username . "and discriminator " . $discriminator . " not found");
      return;
    }

    $this->sendUserEmbed($message, $user, $discord);
  }

  private function userLookup($message, $discord)
  {
    $splitUp = explode(" ", $message->content);
    array_shift($splitUp);
    $username = $splitUp[0];

    $user = User::select('name', 'username', 'email', 'institution', 'circle_id', 'level_id', 'points', 'discord_username', 'discord_discriminator')
      ->where('username', $username)
      ->first();

    if (!$user) {
      $message->channel->sendMessage("User with username " . $username . " not found");
      return;
    }

    $this->sendUserEmbed($message, $user, $discord);
  }

  private function dq($message)
  {
    $roles = $message->author->roles->filter(function ($role) {
      return $role->name === "admin";
    });
    if (count($roles) > 0) {
      $splitUp = explode(" ", $message->content);
      array_shift($splitUp);
      $username = $splitUp[0];

      $user = User::where('username', $username)
        ->first();

      if (!$user) {
        $message->channel->sendMessage("User with username `" . $username . "` not found");
        return;
      }

      $user->disqualified = true;
      $user->save();

      $message->channel->sendMessage("User with username `" . $username . "` has been disqualified");
    } else {
      $message->channel->sendMessage("You do not have the \"admin\" role");
    }
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

      $discord->on('message', function ($message, $discord) {

        if ($message->channel_id === env("DISCORD_HINTS_CHANNEL_ID")) {
          $this->createNotification($message->content, count($message->attachments) > 0 ? $message->attachments[0]->url : "");
        }

        if (str_starts_with($message->content, "!dlookup")) {
          $this->discordLookup($message, $discord);
        }

        if (str_starts_with($message->content, "!ulookup")) {
          $this->userLookup($message, $discord);
        }

        if (str_starts_with($message->content, "!dq")) {
          $this->dq($message);
        }
      });
    });

    $discord->run();
  }
}
