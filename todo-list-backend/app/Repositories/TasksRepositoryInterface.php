<?php

namespace App\Repositories;

use Illuminate\Http\JsonResponse;

interface TasksRepositoryInterface
{
    public function getById($id): JsonResponse;

    public function getTasks($filters): JsonResponse;

    public function save($data): JsonResponse;

    public function delete($id): JsonResponse;

    public function update($data, $id): JsonResponse;

    public function markCompleted($id): JsonResponse;
}
