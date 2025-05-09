<?php

namespace App\Repositories\Interfaces;

interface TodoRepositoryInterface
{
    public function getAll(array $params);
    public function findById(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function updateStatus(int $id, string $status);
    public function delete(int $id);
    public function search(string $term, array $params);
}