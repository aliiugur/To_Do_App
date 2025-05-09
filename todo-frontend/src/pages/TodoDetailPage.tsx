import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { getTodoById } from '../api/todoApi';
import { Todo } from '../types/todo';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import PriorityIndicator from '../components/ui/PriorityIndicator';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';

const TodoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const response = await getTodoById(parseInt(id));
        if (response.success) {
          setTodo(response.data);
        } else {
          toast.error('Todo yüklenemedi');
          navigate('/todos');
        }
      } catch (error) {
        toast.error('Todo yüklenemedi');
        navigate('/todos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTodo();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!todo) {
    return null;
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'dd MMMM yyyy HH:mm', { locale: tr });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button
            variant="secondary"
            onClick={() => navigate('/todos')}
            className="mr-3"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Todo Detayı</h1>
        </div>
        
        <Button
          onClick={() => navigate(`/todos/${todo.id}/edit`)}
          className="flex items-center"
        >
          <PencilIcon className="h-5 w-5 mr-1" />
          <span>Düzenle</span>
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{todo.title}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <StatusBadge status={todo.status} />
            <PriorityIndicator priority={todo.priority} />
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Açıklama</h4>
            <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
              {todo.description || 'Açıklama bulunmuyor.'}
            </p>
          </div>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Kategoriler</h4>
            <div className="flex flex-wrap gap-2">
              {todo.categories.length > 0 ? (
                todo.categories.map((category) => (
                  <span
                    key={category.id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: category.color + '30', color: category.color }}
                  >
                    {category.name}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 dark:text-gray-400">Herhangi bir kategori atanmamış</span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Oluşturulma Tarihi</h4>
              <p className="text-gray-900 dark:text-white">{formatDate(todo.created_at)}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Son Güncelleme</h4>
              <p className="text-gray-900 dark:text-white">{formatDate(todo.updated_at)}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Bitiş Tarihi</h4>
              <p className="text-gray-900 dark:text-white">{formatDate(todo.due_date)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailPage;