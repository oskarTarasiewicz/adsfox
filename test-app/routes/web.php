<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChannelController;

Route::post('/save-channels', [ChannelController::class, 'store']);
Route::get('/channels', [ChannelController::class, 'index']);
Route::get('/{any}', function() { return view('app'); }) -> where('any', '.*');
