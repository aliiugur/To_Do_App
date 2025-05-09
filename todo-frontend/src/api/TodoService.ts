import { TodoCreate, TodoUpdate, TodoFilters } from '../types/todo';
import { PaginatedResponse } from '../types/api';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const TodoService = {
  // Tüm todo'ları getir
  getAllTodos: async (params: TodoFilters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/todos`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Tek bir todo'yu getir
  getTodoById: async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/todos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Yeni todo oluştur
  createTodo: async (todoData: TodoCreate) => {
    try {
      const response = await axios.post(`${API_URL}/todos`, todoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Todo güncelle
  updateTodo: async (id: number, todoData: TodoUpdate) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, todoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Todo durumunu güncelle
  updateTodoStatus: async (id: number, status: string) => {
    try {
      const response = await axios.patch(`${API_URL}/todos/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Todo sil
  deleteTodo: async (id: number) => {
    try {
      const response = await axios.delete(`${API_URL}/todos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Todo ara
  searchTodos: async (searchTerm: string, params: TodoFilters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/todos/search`, {
        params: { q: searchTerm, ...params }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Kategori todo'larını getir
  getCategoryTodos: async (categoryId: number, params: TodoFilters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/categories/${categoryId}/todos`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default TodoService;