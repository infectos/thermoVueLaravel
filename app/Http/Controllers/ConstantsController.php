<?php

namespace App\Http\Controllers;

use App\Constant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ConstantsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Constant::all();
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
        $request->validate(['constantBody'=>'required']);

        $constant = new Constant(['body' => $request->get('constantBody')]);
        if (Gate::allows('create-constant')) {
            $constant->save();
        } else {
            return response('Access denided', 403)->header('Content-Type', 'text/plain');
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $constant = Constant::find($id);
        if (Gate::allows('delete-constant')) {
            $constant->delete();
        } else {
            return response('Access denided', 403)->header('Content-Type', 'text/plain');
        }
        
    }
}
