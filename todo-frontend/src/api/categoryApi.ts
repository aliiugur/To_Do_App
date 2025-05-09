import axiosInstance from './axios';
import { Category, CategoryCreate, CategoryUpdate } from '../types/category';

// Tüm kategorileri getir
export const getCategories = async () => {
  const response = await axiosInstance.get('/categories');
  return response.data;
};

// ID'ye göre kategori getir
export const getCategoryById = async (id: number) => {
  const response = await axiosInstance.get(`/categories/${id}`);
  return response.data;
};

// Yeni kategori oluştur
export const createCategory = async (category: CategoryCreate) => {
  const response = await axiosInstance.post('/categories', category);
  return response.data;
};

// Kategori güncelle
export const updateCategory = async (id: number, category: CategoryUpdate) => {
  const response = await axiosInstance.put(`/categories/${id}`, category);
  return response.data;
};

// Kategori sil
export const deleteCategory = async (id: number) => {
  const response = await axiosInstance.delete(`/categories/${id}`);
  return response.data;
};

// Kategori todo'larını getir
export const getCategoryTodos = async (id: number, filters = {}) => {
  const response = await axiosInstance.get(`/categories/${id}/todos`, { params: filters });
  return response.data;
};