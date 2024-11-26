<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\SanctumController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\NotificationController;

Route::post('/notifications', [NotificationController::class, 'store']);
Route::post('/notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead']);
Route::get('/notifications', [NotificationController::class, 'index']);
Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);


Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum'); 

Route::post('/enroll', [StudentController::class, 'enroll']);

Route::get('/students', [StudentController::class, 'getAllStudents']);

Route::post('/students/{id}/decline-payment', [StudentController::class, 'declinePayment']);


Route::get('notifications', [StudentController::class, 'getAllNotifications']); 



Route::get('/curriculum', [CurriculumController::class, 'index']);

Route::post('/curriculum', [CurriculumController::class, 'store']);




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();

    
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
