<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Circle;
use App\Models\Level;
use App\Models\UserAttempt;
use App\Rules\LevelCheck;
use Inertia\Inertia;

class PlayController extends Controller
{
  public function show()
  {
    $user = User::find(auth()->id());
    return Inertia::render('play', [
      'discord_authenticated' => $user->discord_id ? true : false,
      'circles' => Circle::all(),
      'available_levels' => Level::select('id')->where('circle_id', $user->circle)->get(),
      'done_levels' => UserAttempt::select('level_id as id')->where('circle_id', $user->circle)->where('user_id', $user->id)->get()->modelKeys(),
      'currentLevel' => Level::select('id', 'question', 'source_hint')->where('id', $user->level)->limit(1)->get(),
      // TODO: refactor to a service or model
      'notifications' => NotificationController::format_notifications(),
      'error' => null,
    ]);
  }

  public function attempt(Request $request)
  {
    $request->validate([
      'attempt' => [
        'required',
        'regex:/^[a-z0-9-_{}]+$/',
        new LevelCheck
      ]
    ]);

    $user = User::find(auth()->id());

    // TODO: move to LevelCheck
    $u = new UserAttempt;
    $u->attempt = $request->attempt;
    $u->user_id = $request->user_id;
    $u->level_id = $user->level;
    $u->circle_id = $user->circle;
    $u->save();

    // TODO: reduce calls to Level::find
    if ($request->attempt === Level::find($user->level)->answer) {
      $user->points = $user->points + Level::find($user->level)->points;
      $user->last_solved = now();
      $allLevelsInCircle = Level::select('id')->where('circle_id', $user->circle)->get()->modelKeys();
      $_allAttemptedLevelsInCircle = UserAttempt::select('level_id as id')->where('user_id', $user->id)->where('circle_id', $user->circle)->get()->modelKeys();
      $allAttemptedLevelsInCircle = array_unique($_allAttemptedLevelsInCircle);
      sort($allAttemptedLevelsInCircle);
      /* return array_diff($allAttemptedLevelsInCircle, $allLevelsInCircle); */
      if ($allLevelsInCircle === $allAttemptedLevelsInCircle) {
        # IF ALL QUESTIONS OF CIRCLE COMPLETE - MOVE TO NEXT CIRCLE
        $newCircleId = $user->circle + 1;
        if ($newCircleId === 13) {
          $user->circle = 42;
          $user->level = null;
        } else {
          $user->circle = $newCircleId;
          /* $nextCircle = Circle::find($newCircleId); */
          /* if ($nextCircle->onlyOneLevel) { */
          /*   $level = Level::firstWhere('circle_id', $newCircleId); */
          /*   $user->level = $level->id; */
          /* } else { */
          /*   $user->level = null; */
          /* } */
          $user->level = null;
        }
      } else {
        $user->level = null;
      }
      $user->save();
      return redirect()->to('/');
    } else {
      return redirect()->to('/')->with('error', 'Wrong Answer');
    }
  }

  public function chooseLevel(Request $request)
  {
    $user = User::find(auth()->id());
    if (!$user->level_id) {
      $user->level_id = $request->level_id;
      $user->save();
    }

    return redirect()->to('/play');
  }
}
