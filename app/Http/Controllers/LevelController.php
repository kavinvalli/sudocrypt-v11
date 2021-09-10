<?php

namespace App\Http\Controllers;

use App\Models\Circle;
use App\Models\Level;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class LevelController extends Controller
{
  public function levels()
  {
    $levels = Level::select('id', 'circle_id', 'question', 'answer', 'points', 'source_hint')
      ->get()
      ->map(function ($level, $key) {
        return [
          'id' => $level->id,
          'circle' => Circle::find($level->circle_id),
          'question' => $level->question,
          'answer' => $level->answer,
          'points' => $level->points,
          'source_hint' => $level->source_hint,
          'people_number' => User::where('level', $level->id)->count(),
        ];
      });
    return $levels;
  }

  public function circles()
  {
    $circles = Circle::all();
    return $circles;
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return Inertia::render('admin/levels', ['levels' => $this->levels(), 'circles' => $this->circles()]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    Level::create(
      request()->validate([
        'question' => 'required',
        'answer' => 'required',
        'points' => 'required',
        'source_hint' => 'nullable',
        'circle_id' => 'required'
      ])
    );

    return Redirect::route('levels.index');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Level  $level
   * @return \Illuminate\Http\Response
   */
  public function show(Level $level)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Level  $level
   * @return \Illuminate\Http\Response
   */
  public function edit(Level $level)
  {
    return Inertia::render('admin/level', ['level' => $level, 'circles' => Circle::all()]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Level  $level
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Level $level)
  {
    $request->validate([
      'question' => 'required',
      'answer' => 'required',
      'points' => 'required',
      'source_hint' => 'nullable',
      'circle_id' => 'required',
    ]);
    $level->question = $request->question;
    $level->answer = $request->answer;
    $level->circle_id = $request->circle_id;
    $level->points = $request->points;
    $level->source_hint = $request->source_hint;
    $level->save();

    return Redirect::route('levels.index');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Level  $level
   * @return \Illuminate\Http\Response
   */
  public function destroy(Level $level)
  {
    $level->delete();
    return Redirect::route('levels.index');
  }
}
