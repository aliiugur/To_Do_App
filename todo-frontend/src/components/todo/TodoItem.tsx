import React from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import StatusBadge from '../ui/StatusBadge';
import PriorityIndicator from '../ui/PriorityIndicator';
import Button from '../ui/Button';
import { Todo } from '../../types/todo';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

interface TodoItemProps {
  todo: Todo;
  onView: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onStatusChange: (todo: Todo, status: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'dd MMM yyyy HH:mm', { locale: tr });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4 transition hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {todo.title}
        </h3>
        <div className="flex space-x-2">
          <StatusBadge status={todo.status} />
          <PriorityIndicator priority={todo.priority} />
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
        {todo.description || 'Açıklama yok.'}
      </p>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {todo.categories.map((category) => (
          <span
            key={category.id}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: category.color + '40', color: category.color }}
          >
            {category.name}
          </span>
        ))}
        {todo.categories.length === 0 && (
          <span className="text-gray-500 dark:text-gray-400 text-sm">Kategori yok</span>
        )}
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <div>
          <span className="block">
            Oluşturulma: {formatDate(todo.created_at)}
          </span>
          {todo.due_date && (
            <span className="block">
              Bitiş Tarihi: {formatDate(todo.due_date)}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {todo.status !== 'completed' && todo.status !== 'cancelled' && (
            <div className="relative">
              <select
                value={todo.status}
                onChange={(e) => onStatusChange(todo, e.target.value)}
                className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-1 pl-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Bekliyor</option>
                <option value="in_progress">Devam Ediyor</option>
                <option value="completed">Tamamlandı</option>
                <option value="cancelled">İptal</option>
              </select>
            </div>
          )}
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onView(todo)}
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(todo)}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(todo)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;