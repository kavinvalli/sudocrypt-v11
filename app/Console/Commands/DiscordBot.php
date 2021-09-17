<?php

namespace App\Console\Commands;

use App\Events\NotificationCreated;
use App\Models\Notification;
use Discord\Discord;
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
        echo "{$message->author->username}: {$message->content}: {$message->channel_id}", PHP_EOL;
        echo var_dump($message->attachments);

        if ($message->channel_id === env("DISCORD_HINTS_CHANNEL_ID")) {
          $notif = new Notification();
          if (count($message->attachments) > 0) {
            $notif->content = $message->content . " <img class=\"w-80\" src=\"{$message->attachments[0]->url}\"></img>";
          } else {
            $notif->content = $message->content;
          }
          $notif->save();

          broadcast(new NotificationCreated());
        }
      });
    });

    $discord->run();

    /* return 0; */
  }
}
