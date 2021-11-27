<?php

namespace App\Http\Controllers;

use App\Events\NotificationCreated;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class NotificationController extends Controller
{

  /**
   * Get all notifications
   */
  public static function format_notifications()
  {
    return Notification::orderBy('created_at', 'DESC')
      ->get(['id', 'content', 'created_at'])
      ->map(function ($notif) {
        return [
          'id' => $notif->id,
          'content' => $notif->content,
          'created_at' => $notif->created_at->diffForHumans(),
        ];
      });
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return Inertia::render('admin/notifications', [
      'notifications' => $this->format_notifications(),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $r = request()->validate([
      'content' => 'required'
    ]);

    $notif = new Notification();
    $notif->content = $r['content'];
    $notif->save();

    broadcast(new NotificationCreated());
    return Redirect::route('admin.notifications.index');
  }

  /**
   * Display the specified resource.
   *
   * @param  Notification  $notification
   * @return \Illuminate\Http\Response
   */
  public function show(Notification $notification)
  {
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  Notification  $notification
   * @return \Illuminate\Http\Response
   */
  public function edit(Notification $notification)
  {
    return Inertia::render('admin/notification', [
      'notification' => $notification,
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  Notification  $notification
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Notification $notification)
  {
    $request->validate([
      'content' => 'required',
    ]);
    $notification->content = $request->content;
    $notification->save();

    broadcast(new NotificationCreated());
    return Redirect::route('admin.notifications.edit', ['notification' => $notification]);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  Notification  $notification
   * @return \Illuminate\Http\Response
   */
  public function destroy(Notification $notification)
  {
    $notification->delete();
    broadcast(new NotificationCreated());
    return Redirect::route('admin.notifications.index');
  }
}
