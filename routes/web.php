<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  
  return view('welcome');
});

Auth::routes();

Route::get('/thermo', 'HomeController@thermo')->name('thermo');
Route::get('/music', 'HomeController@music')->name('music');

Route::get('/admin', 'AdminController@index');
Route::get('/admin/confirm/{id}', 'AdminController@confirmUser');



Route::resource('constants','ConstantsController');


