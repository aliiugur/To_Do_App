import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategories, deleteCategory } from '../api/categoryApi';
import CategoryList from '../components/category/CategoryList';
import Button from '../components/ui/Button';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { Category } from '../types/category';
import { PlusIcon } from '@heroicons/react/24/outline';

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await getCategories();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error) {
        toast.error('Kategoriler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  const handleCreateCategory = () => {
    navigate('/categories/create');
  };

  const handleEditCategory = (category: Category) => {
    navigate(`/categories/${category.id}/edit`);
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteCategory(categoryToDelete.id);
      toast.success('Kategori başarıyla silindi');
      setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
      setCategoryToDelete(null);
    } catch (error) {
      toast.error('Kategori silinirken bir hata oluştu');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kategoriler</h1>
        
        <Button
          onClick={handleCreateCategory}
          className="flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          <span>Yeni Kategori</span>
        </Button>
      </div>
      
      <CategoryList
        categories={categories}
        onEdit={handleEditCategory}
        onDelete={handleDeleteClick}
      />
      
      {categoryToDelete && (
        <ConfirmationModal
          isOpen={!!categoryToDelete}
          onClose={() => setCategoryToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title="Kategoriyi Sil"
          message={`"${categoryToDelete.name}" kategorisini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve bu kategoriye ait todo'lar kategorisiz kalacaktır.`}
          confirmText="Sil"
          cancelText="İptal"
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};

export default CategoriesPage;