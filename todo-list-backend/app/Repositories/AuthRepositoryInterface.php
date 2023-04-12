<?php

namespace App\Repositories;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\JsonResponse;

interface AuthRepositoryInterface
{
    public function register($data): JsonResponse;

    public function login($data): JsonResponse;

    public function logout(): JsonResponse;

    public function user(): ?Authenticatable;
}
