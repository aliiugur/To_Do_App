import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTodos, searchTodos } from '../api/todoApi';
import { Todo, TodoFilters } from '../types/todo';
import { PaginatedResponse } from '../types/api';
import { toast } from 'react-toastify';

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  pagination: Omit<PaginatedResponse<Todo>, 'data'> | null;
  filters: TodoFilters;
  setFilters: React.Dispatch<React.SetStateAction<TodoFilters>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  fetchTodos: () => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Omit<PaginatedResponse<Todo>, 'data'> | null>(null);
  const [filters, setFilters] = useState<TodoFilters>({
    page: 1,
    limit: 10,
    sort: 'created_at',
    order: 'desc'
  });
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      if (searchTerm) {
        response = await searchTodos(searchTerm, filters);
      } else {
        response = await getTodos(filters);
      }
      
      if (response.success) {
        setTodos(response.data.data);
        
        const { data, ...paginationData } = response.data;
        setPagination(paginationData);
      } else {
        setError('API yanıtında bir hata oluştu');
        toast.error('Todo\'lar yüklenirken bir hata oluştu');
      }
    } catch (err) {
      setError('Todo\'lar yüklenirken bir hata oluştu');
      toast.error('Todo\'lar yüklenirken bir hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filters, searchTerm]);

  return (
    <TodoContext.Provider value={{
      todos,
      loading,
      error,
      pagination,
      filters,
      setFilters,
      searchTerm,
      setSearchTerm,
      fetchTodos
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};