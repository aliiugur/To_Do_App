import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTodo } from '../context/TodoContext';
import { updateTodoStatus, deleteTodo } from '../api/todoApi';
import TodoList from '../components/todo/TodoList';
import TodoFilter from '../components/todo/TodoFilter';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { Todo } from '../types/todo';
import Button from '../components/ui/Button';
import { PlusIcon } from '@heroicons/react/24/outline';

const TodoListPage: React.FC = () => {
  const { 
    todos, 
    loading, 
    pagination, 
    filters, 
    setFilters, 
    setSearchTerm,
    fetchTodos 
  } = useTodo();
  
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  // Todo görüntüleme
  const handleViewTodo = (todo: Todo) => {
    navigate(`/todos/${todo.id}`);
  };

  // Todo düzenleme
  const handleEditTodo = (todo: Todo) => {
    navigate(`/todos/${todo.id}/edit`);
  };

  // Todo durumu değiştirme
  const handleStatusChange = async (todo: Todo, status: string) => {
    try {
      await updateTodoStatus(todo.id, status);
      toast.success('Todo durumu güncellendi');
      fetchTodos();
    } catch (error) {
      toast.error('Todo durumu güncellenirken bir hata oluştu');
      console.error(error);
    }
  };

  // Todo silme modalını açma
  const handleDeleteClick = (todo: Todo) => {
    setTodoToDelete(todo);
  };

  // Todo silme işlemi
  const handleDeleteConfirm = async () => {
    if (!todoToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteTodo(todoToDelete.id);
      toast.success('Todo başarıyla silindi');
      setTodoToDelete(null);
      fetchTodos();
    } catch (error) {
      toast.error('Todo silinirken bir hata oluştu');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Modal kapatma
  const handleCloseModal = () => {
    setTodoToDelete(null);
  };

  // Sayfa değiştirme
  const handlePageChange = (page: number) => {
    setFilters({
      ...filters,
      page
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Todo Listesi</h1>
        
        <Button
          onClick={() => navigate('/todos/create')}
          className="flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          <span>Yeni Todo</span>
        </Button>
      </div>
      
      <TodoFilter
        filters={filters}
        onFilterChange={setFilters}
        onSearch={setSearchTerm}
      />
      
      <TodoList
        todos={todos}
        pagination={pagination}
        loading={loading}
        onPageChange={handlePageChange}
        onView={handleViewTodo}
        onEdit={handleEditTodo}
        onDelete={handleDeleteClick}
        onStatusChange={handleStatusChange}
      />
      
      {todoToDelete && (
        <ConfirmationModal
          isOpen={!!todoToDelete}
          onClose={handleCloseModal}
          onConfirm={handleDeleteConfirm}
          title="Todo'yu Sil"
          message={`"${todoToDelete.title}" başlıklı todo'yu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
          confirmText="Sil"
          cancelText="İptal"
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};

export default TodoListPage;