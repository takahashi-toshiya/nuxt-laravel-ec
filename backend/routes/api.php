<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\SignInController;
use App\Http\Controllers\Auth\SignOutController;
use App\Http\Controllers\Auth\SignUpController;
use App\Http\Controllers\Cart\CartController;
use App\Http\Controllers\Product\ProductController; // Ensure this class exists in the specified namespace
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [SignInController::class, 'handle']);
Route::post('/signup', [SignUpController::class, 'handle']);

Route::get('/products', [ProductController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'read']);
    Route::get('/signout', [SignOutController::class, 'handle']);

    // カート関連
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{productId}', [CartController::class, 'update']);
    Route::delete('/cart/{productId}', [CartController::class, 'destroy']);
});
