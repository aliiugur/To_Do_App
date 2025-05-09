<?php

namespace App\Services;

use App\Repositories\Interfaces\TodoRepositoryInterface;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class TodoService
{
    protected $todoRepository;
    
    public function __construct(TodoRepositoryInterface $todoRepository)
    {
        $this->todoRepository = $todoRepository;
    }
    
    public function getAllTodos(array $params)
    {
        return $this->todoRepository->getAll($params);
    }
    
    public function getTodoById(int $id)
    {
        return $this->todoRepository->findById($id);
    }
    
    public function createTodo(array $data)
    {
        $validator = $this->validateTodo($data);
        
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        
        return $this->todoRepository->create($data);
    }
    
    public function updateTodo(int $id, array $data)
    {
        $validator = $this->validateTodo($data, false);
        
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        
        return $this->todoRepository->update($id, $data);
    }
    
    public function updateTodoStatus(int $id, array $data)
    {
        $validator = Validator::make($data, [
            'status' => 'required|in:pending,in_progress,completed,cancelled',
        ]);
        
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        
        return $this->todoRepository->updateStatus($id, $data['status']);
    }
    
    public function deleteTodo(int $id)
    {
        return $this->todoRepository->delete($id);
    }
    
    public function searchTodos(string $term, array $params)
    {
        return $this->todoRepository->search($term, $params);
    }
    
    private function validateTodo(array $data, bool $isCreating = true)
    {
        $rules = [
            'title' => $isCreating ? 'required|string|min:3|max:100' : 'sometimes|string|min:3|max:100',
            'description' => 'nullable|string|max:500',
            'status' => 'sometimes|in:pending,in_progress,completed,cancelled',
            'priority' => 'sometimes|in:low,medium,high',
            'due_date' => 'nullable|date|after:today',
            'categories' => 'sometimes|array',
            'categories.*' => 'exists:categories,id',
        ];
        
        return Validator::make($data, $rules);
    }
}