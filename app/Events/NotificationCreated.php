<?php

namespace App\Events;

use App\Http\Controllers\NotificationController;
use App\Models\Notification;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NotificationCreated implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $notifications;

  /**
   * Create a new event instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->notifications = NotificationController::format_notifications();
  }

  public function broadcastWith()
  {
    return ['notifications' => $this->notifications];
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return \Illuminate\Broadcasting\Channel|array
   */
  public function broadcastOn()
  {
    return new Channel('notifications');
  }
}
