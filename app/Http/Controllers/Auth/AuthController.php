<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\SignUpRequest;
use App\Models\User;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request): Application|Response|ResponseFactory
    {

        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){
            return response(['message' => 'Invalid credentials, please provide a valid email and password'], 422);
        }

        $user = Auth::user();
        $token = null;
        if($user){
            $token = $user->createToken('auth_token')->plainTextToken;
        }else{
            return response(['message' => 'Invalid credentials, please provide a valid email and password'], 422);
        }

        return response(compact('user', 'token'));
    }

    public function signup(SignUpRequest $request){
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request $request){
        $user = $request->user();
        $user?->currentAccessToken()->delete();
        return response('Logged out', 204);
    }
}
