import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategoryById, createCategory, updateCategory } from '../api/categoryApi';
import CategoryForm from '../components/category/CategoryForm';
import Button from '../components/ui/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Category, CategoryCreate, CategoryUpdate } from '../types/category';

const CategoryFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!isEditing) return;
      
      setLoading(true);
      try {
        const response = await getCategoryById(parseInt(id));
        if (response.success) {
          setCategory(response.data);
        } else {
          toast.error('Kategori yüklenemedi');
          navigate('/categories');
        }
      } catch (error) {
        toast.error('Kategori yüklenemedi');
        navigate('/categories');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategory();
  }, [id, isEditing, navigate]);

  const handleSubmit = async (data: CategoryCreate | CategoryUpdate) => {
    setIsSubmitting(true);
    
    try {
      if (isEditing && category) {
        const response = await updateCategory(category.id, data);
        if (response.success) {
          toast.success('Kategori başarıyla güncellendi');
          navigate('/categories');
        }
      } else {
        const response = await createCategory(data as CategoryCreate);
        if (response.success) {
          toast.success('Kategori başarıyla oluşturuldu');
          navigate('/categories');
        }
      }
    } catch (error) {
      toast.error(isEditing ? 'Kategori güncellenirken bir hata oluştu' : 'Kategori oluşturulurken bir hata oluştu');
      console.error(error);
    } finally {
      setIsSubmitting(false);
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
      <div className="flex items-center mb-6">
        <Button
          variant="secondary"
          onClick={() => navigate('/categories')}
          className="mr-3"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEditing ? 'Kategori Düzenle' : 'Yeni Kategori Oluştur'}
        </h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden p-6">
        <CategoryForm
          category={category || undefined}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/categories')}
        />
      </div>
    </div>
  );
};

export default CategoryFormPage;