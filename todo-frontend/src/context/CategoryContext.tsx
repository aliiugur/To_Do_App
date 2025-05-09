import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCategories } from '../api/categoryApi';
import { Category } from '../types/category';
import { toast } from 'react-toastify';

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getCategories();
      
      if (response.success) {
        setCategories(response.data);
      } else {
        setError('API yanıtında bir hata oluştu');
        toast.error('Kategoriler yüklenirken bir hata oluştu');
      }
    } catch (err) {
      setError('Kategoriler yüklenirken bir hata oluştu');
      toast.error('Kategoriler yüklenirken bir hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{
      categories,
      loading,
      error,
      fetchCategories
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};