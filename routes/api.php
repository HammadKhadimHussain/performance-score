<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\GoogleAPIController;
use App\Http\Controllers\API\PerformanceAPIController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::get('google-login',[GoogleAPIController::class,'googleLogin']);
Route::get('google/callback',[GoogleAPIController::class,'googleCallback']);


Route::post('performance-score',[PerformanceAPIController::class,'performanceScore']);


