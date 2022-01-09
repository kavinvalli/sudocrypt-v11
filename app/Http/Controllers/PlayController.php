<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Circle;
use App\Models\Level;
use App\Models\Notification;
use App\Models\UserAttempt;
use App\Rules\LevelCheck;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PlayController extends Controller
{
  public function show()
  {
    $hint = null;
    if (auth()->user()->level && auth()->user()->level->hint) {
      $hint = auth()->user()->level->hint;
    }
    return Inertia::render('play', [
      'hint' => $hint,
      'circles' => Circle::with('levels')
        ->get()
        ->map(fn ($circle) => [
          'id' => $circle->id,
          'name' => $circle->name,
          'levels' => $circle->levels->map(fn ($lvl) => $lvl->id)
        ]),
      'completed_levels' => UserAttempt::select('level_id as id')
        ->where('correct', true)
        ->where('user_id', auth()->id())
        ->get()
        ->map(fn ($lvl) => $lvl->id),
      'notifications' => Notification::orderBy('created_at', 'DESC')->get(),
      'error' => null,
    ]);
  }

  public function attempt(Request $request)
  {
    $request->validate([
      'attempt' => [
        'required',
        'regex:/^[a-z0-9-_{}:()|&;@#]+$/',
        new LevelCheck
      ]
    ]);

    $user = User::find(auth()->id());
    $level = $user->level;
    $completedLevels = collect($user->attempts()
      ->where('correct', true)
      ->select('level_id as id')
      ->get()
      ->map(fn ($l) => $l->id));
    $allLevelsSolved = $user->circle->levels->every(fn ($lvl) => $completedLevels->contains($lvl->id));

    // Answer is correct
    // Update points
    // Update last solved
    // Set level_id = null
    // Check if all levels in circle are solved
    //   If yes, move to next circle

    if ($user->circle_id === 3 || $user->circle_id === 8) { // Circle is Desire and Violence, therefore dynamic pointing
      $numberOfUsersDoneWithLevel = UserAttempt::where('level_id', $user->level_id)->where('correct', true)->count();
      if ($numberOfUsersDoneWithLevel >= 6) { // 6 because we've already created a UserAttempt for this guy
        $user->points = $user->points + ((5 / 6) * $level->points * M_E ** (-0.008 * ($numberOfUsersDoneWithLevel - 5)) + ($level->points / 6));
      } else {
        $user->points = $user->points + $level->points;
      }
    } else {
      $user->points = $user->points + $level->points;
    }
    $user->last_solved = now();
    $user->level_id = null;
    if ($allLevelsSolved) {
      $nextCircle = Circle::find($user->circle_id + 1);
      if ($nextCircle) {
        $user->circle_id = $nextCircle->id;
      } else {
        $user->circle_id = null;
      }
    }
    $user->save();

    return redirect()->route('play.show');
  }

  public function chooseLevel(Request $request)
  {
    if (!auth()->user()->level_id) {
      $request->validate([
        'level_id' => ['required', 'regex:/\d{1}/']
      ]);

      $user = User::find(auth()->id());

      $levels = collect(
        Level::where('circle_id', $user->circle_id)
          ->select('id')
          ->get()
          ->map(fn ($l) => $l->id)
      );
      if ($levels->contains($request->level_id)) {
        $user->level_id = $request->level_id;
        $user->save();
      }
    }

    return redirect()->to('/play');
  }
}
