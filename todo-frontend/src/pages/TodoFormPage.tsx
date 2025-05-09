import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTodoById, createTodo, updateTodo } from '../api/todoApi';
import { useCategory } from '../context/CategoryContext';
import TodoForm from '../components/todo/TodoForm';
import Button from '../components/ui/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Todo, TodoCreate, TodoUpdate } from '../types/todo';

const TodoFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { categories, loading: categoriesLoading } = useCategory();

  useEffect(() => {
    const fetchTodo = async () => {
      if (!isEditing) return;
      
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
  }, [id, isEditing, navigate]);

  const handleSubmit = async (data: TodoCreate | TodoUpdate) => {
    setIsSubmitting(true);
    
    try {
      if (isEditing && todo) {
        const response = await updateTodo(todo.id, data);
        if (response.success) {
          toast.success('Todo başarıyla güncellendi');
          navigate(`/todos/${todo.id}`);
        }
      } else {
        const response = await createTodo(data as TodoCreate);
        if (response.success) {
          toast.success('Todo başarıyla oluşturuldu');
          navigate(`/todos/${response.data.id}`);
        }
      }
    } catch (error) {
      toast.error(isEditing ? 'Todo güncellenirken bir hata oluştu' : 'Todo oluşturulurken bir hata oluştu');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button
          variant="secondary"
          onClick={() => navigate(isEditing ? `/todos/${id}` : '/todos')}
          className="mr-3"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEditing ? 'Todo Düzenle' : 'Yeni Todo Oluştur'}
        </h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden p-6">
        <TodoForm
          todo={todo || undefined}
          categories={categories}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => navigate(isEditing ? `/todos/${id}` : '/todos')}
        />
      </div>
    </div>
  );
};

export default TodoFormPage;