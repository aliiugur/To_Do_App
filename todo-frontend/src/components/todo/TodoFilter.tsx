import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { TodoFilters } from '../../types/todo';
import useDebounce from '../../hooks/useDebounce';

interface TodoFilterProps {
  filters: TodoFilters;
  onFilterChange: (filters: TodoFilters) => void;
  onSearch: (term: string) => void;
}

const statusOptions = [
  { value: '', label: 'Tüm Durumlar' },
  { value: 'pending', label: 'Bekliyor' },
  { value: 'in_progress', label: 'Devam Ediyor' },
  { value: 'completed', label: 'Tamamlandı' },
  { value: 'cancelled', label: 'İptal Edildi' },
];

const priorityOptions = [
  { value: '', label: 'Tüm Öncelikler' },
  { value: 'low', label: 'Düşük' },
  { value: 'medium', label: 'Orta' },
  { value: 'high', label: 'Yüksek' },
];

const sortOptions = [
  { value: 'created_at', label: 'Oluşturma Tarihi' },
  { value: 'due_date', label: 'Bitiş Tarihi' },
  { value: 'priority', label: 'Öncelik' },
];

const orderOptions = [
  { value: 'desc', label: 'Azalan' },
  { value: 'asc', label: 'Artan' },
];

const TodoFilter: React.FC<TodoFilterProps> = ({ filters, onFilterChange, onSearch }) => {
  const { register, watch, reset } = useForm<TodoFilters & { search: string }>({
    defaultValues: {
      ...filters,
      search: '',
    },
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // İzlenen değerlerdeki değişiklikleri filtre değişimlerine yansıt
  const status = watch('status');
  const priority = watch('priority');
  const sort = watch('sort');
  const order = watch('order');

  useEffect(() => {
    onFilterChange({
      ...filters,
      status: status as any,
      priority: priority as any,
      sort,
      order: order as any,
    });
  }, [status, priority, sort, order]);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    reset({
      status: undefined, 
      priority: undefined, 
      sort: 'created_at',
      order: 'desc',
      search: '',
    });
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Arama
          </label>
          <Input
            type="text"
            placeholder="Todo ara..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Durum
          </label>
          <Select 
            options={statusOptions}
            {...register('status')}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Öncelik
          </label>
          <Select 
            options={priorityOptions}
            {...register('priority')}
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sıralama
            </label>
            <Select 
              options={sortOptions}
              {...register('sort')}
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Yön
            </label>
            <Select 
              options={orderOptions}
              {...register('order')}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={handleReset}
        >
          Filtreleri Sıfırla
        </Button>
      </div>
    </div>
  );
};

export default TodoFilter;