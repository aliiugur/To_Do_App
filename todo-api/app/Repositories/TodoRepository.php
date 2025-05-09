<?php

namespace App\Repositories;

use App\Models\Todo;
use App\Repositories\Interfaces\TodoRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;

class TodoRepository implements TodoRepositoryInterface
{
    protected $model;
    
    public function __construct(Todo $model)
    {
        $this->model = $model;
    }
    
    public function getAll(array $params)
    {
        $query = $this->model->with('categories');
        
        if (isset($params['status'])) {
            $query->where('status', $params['status']);
        }
        
        if (isset($params['priority'])) {
            $query->where('priority', $params['priority']);
        }
        
        $sortField = $params['sort'] ?? 'created_at';
        $sortOrder = $params['order'] ?? 'desc';
        $limit = min((int)($params['limit'] ?? 10), 50);
        $page = (int)($params['page'] ?? 1);
        
        return $query->orderBy($sortField, $sortOrder)
                    ->paginate($limit, ['*'], 'page', $page);
    }
    
    public function findById(int $id)
    {
        return $this->model->with('categories')->findOrFail($id);
    }
    
    public function create(array $data)
    {
        $todo = $this->model->create($data);
        
        if (isset($data['categories'])) {
            $todo->categories()->sync($data['categories']);
        }
        
        return $todo->load('categories');
    }
    
    public function update(int $id, array $data)
    {
        $todo = $this->model->findOrFail($id);
        $todo->update($data);
        
        if (isset($data['categories'])) {
            $todo->categories()->sync($data['categories']);
        }
        
        return $todo->load('categories');
    }
    
    public function updateStatus(int $id, string $status)
    {
        $todo = $this->model->findOrFail($id);
        $todo->update(['status' => $status]);
        
        return $todo;
    }
    
    public function delete(int $id)
    {
        $todo = $this->model->findOrFail($id);
        $todo->delete();
        
        return true;
    }
    
    public function search(string $term, array $params)
    {
        $query = $this->model->with('categories')
            ->where(function (Builder $query) use ($term) {
                $query->where('title', 'LIKE', "%{$term}%")
                    ->orWhere('description', 'LIKE', "%{$term}%");
            });
            
        if (isset($params['status'])) {
            $query->where('status', $params['status']);
        }
        
        if (isset($params['priority'])) {
            $query->where('priority', $params['priority']);
        }
        
        $sortField = $params['sort'] ?? 'created_at';
        $sortOrder = $params['order'] ?? 'desc';
        $limit = min((int)($params['limit'] ?? 10), 50);
        $page = (int)($params['page'] ?? 1);
        
        return $query->orderBy($sortField, $sortOrder)
                    ->paginate($limit, ['*'], 'page', $page);
    }
}