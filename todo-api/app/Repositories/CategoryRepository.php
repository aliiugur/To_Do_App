<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\Interfaces\CategoryRepositoryInterface;

class CategoryRepository implements CategoryRepositoryInterface
{
    protected $model;
    
    public function __construct(Category $model)
    {
        $this->model = $model;
    }
    
    public function getAll()
    {
        return $this->model->all();
    }
    
    public function findById(int $id)
    {
        return $this->model->findOrFail($id);
    }
    
    public function create(array $data)
    {
        return $this->model->create($data);
    }
    
    public function update(int $id, array $data)
    {
        $category = $this->model->findOrFail($id);
        $category->update($data);
        
        return $category;
    }
    
    public function delete(int $id)
    {
        $category = $this->model->findOrFail($id);
        $category->delete();
        
        return true;
    }
    
    public function getTodos(int $id, array $params)
    {
        $category = $this->model->findOrFail($id);
        
        $query = $category->todos();
        
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