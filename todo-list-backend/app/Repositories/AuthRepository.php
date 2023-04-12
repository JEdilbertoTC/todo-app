<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthRepository implements AuthRepositoryInterface
{

    public function register($data): JsonResponse
    {
        $validator = Validator::make($data, [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors(), 'status' => 422]);
        }

        if (User::where('email', $data['email'])->first()) {
            return response()->json([
                'message' => 'This email is taken',
            ], 422);
        }

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);
        $token = $user->createToken('todo')->accessToken;

        return response()->json(['token' => $token]);
    }

    public function login($data): JsonResponse
    {
        $validator = Validator::make($data, [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }

        $user = User::where('email', $data['email'])->first();

        if (Hash::check($data['password'], @$user['password'])) {
            $token = $user->createToken('todo')->accessToken;
            return response()->json(['token' => $token]);
        }

        return response()->json(["message" => 'Email or Password wrong'], 422);
    }

    public function logout(): JsonResponse
    {
        $token = Auth::user()->token();
        $token->revoke();
        return response()->json(['message' => 'You have been successfully logged out!']);
    }

    public function user(): ?Authenticatable
    {
        return Auth::user();
    }
}
