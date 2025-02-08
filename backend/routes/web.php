<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


Route::get('/test-login', function () {
    $user = User::first();

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    Auth::login($user); // 手動でログイン

    return response()->json([
        'auth_user' => Auth::user(),
        'session_id' => session()->getId(),
    ]);
});