<?php

namespace App\Http\Controllers;

use App\Repositories\AuthRepository;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    private AuthRepository $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function register(Request $request): JsonResponse
    {
        return $this->authRepository->register($request->all());
    }

    public function login(Request $request): JsonResponse
    {
        return $this->authRepository->login($request->all());
    }

    public function logout(): JsonResponse
    {
        return $this->authRepository->logout();
    }

    public function user(): ?Authenticatable
    {
        return $this->authRepository->user();
    }
}
