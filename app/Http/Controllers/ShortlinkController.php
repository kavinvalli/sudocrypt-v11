<?php

namespace App\Http\Controllers;

use App\Models\Shortlink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ShortlinkController extends Controller
{
  public function links()
  {
    $links = Shortlink::get();
    return $links;
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return Inertia::render('admin/links', ['links' => $this->links()]);
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
    $r = request()->validate([
      'shortlink' => 'required|regex:/^[a-z0-9]+$/|unique:shortlinks,shortlink',
      'url' => 'required|url'
    ]);

    $s = new Shortlink();
    $s->shortlink = $r['shortlink'];
    $s->url = $r['url'];
    $s->save();

    return Redirect::route('admin.shortlinks.index');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Shortlink  $shortlink
   * @return \Illuminate\Http\Response
   */
  public function show(Shortlink $shortlink)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Shortlink  $shortlink
   * @return \Illuminate\Http\Response
   */
  public function edit(Shortlink $shortlink)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Shortlink  $shortlink
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Shortlink $shortlink)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Shortlink  $shortlink
   * @return \Illuminate\Http\Response
   */
  public function destroy(Shortlink $shortlink)
  {
    $shortlink->delete();
    return Redirect::route('admin.shortlinks.index');
  }

  /**
   * Redirect to specificed $shortlink
   *
   * @param  \App\Models\Shortlink  $shortlink
   * @return \Illuminate\Http\Response
   */
  public function redirect(Shortlink $shortlink)
  {
    return Redirect::to($shortlink->url);
  }
}
