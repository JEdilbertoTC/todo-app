<?php

namespace App\Http\Controllers;

use App\Repositories\TasksRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TasksController extends Controller
{

    private TasksRepository $tasksRepository;

    public function __construct(TasksRepository $tasksRepository)
    {
        $this->tasksRepository = $tasksRepository;
    }

    public function getById($id): JsonResponse
    {
        return $this->tasksRepository->getById($id);
    }

    public function getTasks(Request $request): JsonResponse
    {
        return $this->tasksRepository->getTasks($request);
    }

    public function save(Request $request): JsonResponse
    {
        return $this->tasksRepository->save($request->all());
    }

    public function delete($id): JsonResponse
    {
        return $this->tasksRepository->delete($id);
    }

    public function update(Request $request, $id): JsonResponse
    {
        return $this->tasksRepository->update($request, $id);
    }

    public function markCompleted($id): JsonResponse
    {
        return $this->tasksRepository->markCompleted($id);
    }
}
