<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TasksRepository implements TasksRepositoryInterface
{

    public function getById($id): JsonResponse
    {
        $task = Task::where('id', $id)->where('owner_id', Auth::id())->first();

        if ($task == null) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        return response()->json(['task' => $task]);
    }

    public function getTasks($filters = null): JsonResponse
    {
        $tasks = Task::where('owner_id', Auth::id())
            ->where('is_completed', $filters['completed'])
            ->paginate(5);

        return response()->json($tasks);
    }

    public function save($data): JsonResponse
    {
        $validator = Validator::make($data, [
            'title' => 'required|max:255',
            'description' => 'required|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors(), 'status' => 400]);
        }

        Task::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'owner_id' => Auth::id(),
            'is_completed' => false,
        ]);


        return response()->json();
    }

    public function delete($id): JsonResponse
    {
        $task = Task::where('id', $id)->where('owner_id', Auth::id())->first();

        if ($task == null) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function update($data, $id): JsonResponse
    {
        $task = Task::where('id', $id)->where('owner_id', Auth::id())->first();

        if ($task == null) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $task->title = $data['title'];
        $task->description = $data['description'];
        $task->save();

        return response()->json(['message' => 'Updated']);
    }

    public function markCompleted($id): JsonResponse
    {
        $task = Task::where('id', $id)->where('owner_id', Auth::id())->first();

        if ($task == null) {
            return response()->json(['message' => 'Not Found'], 404);
        }
        $task['is_completed'] = true;
        $task->save();

        return response()->json(['message' => 'Updated']);
    }
}
