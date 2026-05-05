<?php

use App\Http\Controllers\Api\v1\Admin\PermissionController;
use App\Http\Controllers\Api\v1\Admin\RoleController;
use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\ReportController;
use App\Http\Controllers\Api\v1\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Admin only
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class);
        
        // Roles CRUD
        Route::apiResource('roles', RoleController::class);
        
        // Permissions CRUD
        Route::apiResource('permissions', PermissionController::class);
    });

    // Admin + Manager
    Route::middleware('role:admin|manager')->group(function () {
        Route::get('/reports', [ReportController::class, 'index']);
    });
});
