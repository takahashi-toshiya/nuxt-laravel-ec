<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function read(Request $request){        
        $user = $request->user();

        return response()->json($user);
    }
}