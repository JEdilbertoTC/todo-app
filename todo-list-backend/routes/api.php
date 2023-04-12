<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TasksController;
use Illuminate\Support\Facades\Route;

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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group(['prefix' => 'auth'], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::get('user', [AuthController::class, 'user'])->middleware('auth:api');
});

Route::group(['prefix' => 'tasks', 'middleware' => ['auth:api']], function () {
    Route::get('/', [TasksController::class, 'getTasks']);
    Route::get('/{id}', [TasksController::class, 'getById']);
    Route::post('/', [TasksController::class, 'save']);
    Route::put('/{id}', [TasksController::class, 'update']);
    Route::patch('/{id}', [TasksController::class, 'markCompleted']);
    Route::delete('/{id}', [TasksController::class, 'delete']);
});
