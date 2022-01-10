<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RlLeaderboardController extends Controller
{
    public function show()
    {
        $users = User::select('id', 'referred_by', 'username', 'points')
            ->where('admin', false)
            ->where('disqualified', false)
            /* ->orderBy('points', 'DESC') */
            /* ->orderBy('last_solved', 'ASC') */
            ->get()
            ->map(function ($user, $key) {
                return [
                    'rank' => $key + 1,
                    'id' => $user->id,
                    'institution' => $user->institution,
                    'username' => $user->username,
                    'points' => $user->points,
                    'referred_by' => $user->referred_by,
                ];
            });
        $dq = User::select('id', 'referred_by', 'username', 'points')
            ->where('admin', false)
            ->where('disqualified', true)
            ->get()
            ->map(function ($user) {
                return [
                    'rank' => 'DQ',
                    'id' => $user->id,
                    'institution' => $user->institution,
                    'username' => $user->username,
                    'points' => 'DQ',
                    'referred_by' => $user->referred_by,
                    'number_of_referrals' => 0,
                ];
            })->toArray();

        $users = $users
            ->map(function ($user) use ($users) {
                return [
                    'rank' => $user['rank'],
                    'username' => $user['username'],
                    'points' => $user['points'],
                    'number_of_referrals' => $users
                        ->filter(function ($u) use ($user) {
                            return $u['referred_by'] == $user['id'];
                        })
                        ->count()
                ];
            })->toArray();

        /* $dq = $dq */
        /*   ->map(function ($user) use ($dq) { */
        /*     return [ */
        /*       'rank' => $user['rank'], */
        /*       'username' => $user['username'], */
        /*       'points' => $user['points'], */
        /*       'number_of_referrals' => $users */
        /*         ->filter(function ($u) use ($user) { */
        /*           return $u['referred_by'] == $user['id']; */
        /*         }) */
        /*         ->count() */
        /*     ]; */
        /*   })->toArray(); */

        return Inertia::render('rlleaderboard', [
            'users' => array_merge($users, $dq),
        ]);
    }
}
