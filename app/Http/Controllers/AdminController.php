<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Gate;

class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $users = \app\User::all();
        return view('admin')->with('users', $users);
    }

    public function confirmUser($id)
    {
        $user = \app\User::find($id);
        if (Gate::allows('confirm-users')) {
            $user->confirmed = 1;
            $user->save();
        }
        return redirect('admin');
    }
}
