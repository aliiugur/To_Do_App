<?php

namespace App\Services;

use App\Repositories\Interfaces\CategoryRepositoryInterface;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CategoryService
{
    protected $categoryRepository;
    
    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }
    
    public function getAllCategories()
    {
        return $this->categoryRepository->getAll();
    }
    
    public function getCategoryById(int $id)
    {
        return $this->categoryRepository->findById($id);
    }
    
    public function createCategory(array $data)
    {
        $validator = $this->validateCategory($data);
        
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        
        return $this->categoryRepository->create($data);
    }
    
    public function updateCategory(int $id, array $data)
    {
        $validator = $this->validateCategory($data, false);
        
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        
        return $this->categoryRepository->update($id, $data);
    }
    
    public function deleteCategory(int $id)
    {
        return $this->categoryRepository->delete($id);
    }
    
    public function getCategoryTodos(int $id, array $params)
    {
        return $this->categoryRepository->getTodos($id, $params);
    }
    
    private function validateCategory(array $data, bool $isCreating = true)
    {
        $rules = [
            'name' => $isCreating ? 'required|string|max:100' : 'sometimes|string|max:100',
            'color' => 'sometimes|string|size:7|regex:/^#[0-9A-F]{6}$/i',
        ];
        
        return Validator::make($data, $rules);
    }
}