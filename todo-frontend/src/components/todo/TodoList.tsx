import React from 'react';
import TodoItem from './TodoItem';
import Pagination from '../ui/Pagination';
import { Todo } from '../../types/todo';
import { PaginatedResponse } from '../../types/api';

interface TodoListProps {
  todos: Todo[];
  pagination: Omit<PaginatedResponse<Todo>, 'data'> | null;
  loading: boolean;
  onPageChange: (page: number) => void;
  onView: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onStatusChange: (todo: Todo, status: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  pagination,
  loading,
  onPageChange,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="spinner animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-10 text-center">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Görüntülenecek todo bulunamadı</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Yeni bir todo ekleyin veya filtreleri değiştirin.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
      
      {pagination && pagination.last_page > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default TodoList;