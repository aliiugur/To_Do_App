import axiosInstance from './axios';
import { Todo, TodoCreate, TodoUpdate, TodoFilters } from '../types/todo';

// Tüm todoları getir
export const getTodos = async (filters: TodoFilters = {}) => {
  const response = await axiosInstance.get('/todos', { params: filters });
  return response.data;
};

// ID'ye göre todo getir
export const getTodoById = async (id: number) => {
  const response = await axiosInstance.get(`/todos/${id}`);
  return response.data;
};

// Yeni todo oluştur
export const createTodo = async (todo: TodoCreate) => {
  const response = await axiosInstance.post('/todos', todo);
  return response.data;
};

// Todo güncelle
export const updateTodo = async (id: number, todo: TodoUpdate) => {
  const response = await axiosInstance.put(`/todos/${id}`, todo);
  return response.data;
};

// Todo durumunu güncelle
export const updateTodoStatus = async (id: number, status: string) => {
  const response = await axiosInstance.patch(`/todos/${id}/status`, { status });
  return response.data;
};

// Todo sil
export const deleteTodo = async (id: number) => {
  const response = await axiosInstance.delete(`/todos/${id}`);
  return response.data;
};

// Todo ara
export const searchTodos = async (term: string, filters: TodoFilters = {}) => {
  const response = await axiosInstance.get('/todos/search', { 
    params: { q: term, ...filters } 
  });
  return response.data;
};