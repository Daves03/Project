<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        //dummy account
        if ($credentials['email'] === '123@gmail.com' && $credentials['password'] === '123') {
            return response()->json(['message' => 'Login successful!'], 200);
        }

        return response()->json(['message' => 'Invalid credentials!'], 401);
    }
}
