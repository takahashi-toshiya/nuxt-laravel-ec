<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\SignInController;
use App\Http\Controllers\Auth\SignUpController;
use App\Http\Controllers\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
Route::get('/login', function () {
    return "Login Route is Working!";
})->name("login");
*/
Route::post('/signup', [SignUpController::class, 'handle']);
Route::post('/login', [SignInController::class, 'handle']);

Route::get('/user', [UserController::class, 'read'])->middleware('auth:sanctum');
