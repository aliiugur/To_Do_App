import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Todo } from '../../types/todo';
import { Category } from '../../types/category';

const todoSchema = z.object({
  title: z.string().min(3, 'Başlık en az 3 karakter olmalıdır').max(100, 'Başlık en fazla 100 karakter olabilir'),
  description: z.string().max(500, 'Açıklama en fazla 500 karakter olabilir').nullable().optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
  priority: z.enum(['low', 'medium', 'high']),
  due_date: z.string().nullable().optional(),
  categories: z.array(z.number()).optional()
});

type TodoFormData = z.infer<typeof todoSchema>;

interface TodoFormProps {
  todo?: Todo;
  categories: Category[];
  isSubmitting: boolean;
  onSubmit: (data: TodoFormData) => void;
  onCancel: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  todo,
  categories,
  isSubmitting,
  onSubmit,
  onCancel
}) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo?.title || '',
      description: todo?.description || '',
      status: todo?.status || 'pending',
      priority: todo?.priority || 'medium',
      due_date: todo?.due_date ? format(new Date(todo.due_date), 'yyyy-MM-dd\'T\'HH:mm') : '',
      categories: todo?.categories.map(cat => cat.id) || []
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Başlık *
        </label>
        <Input
          {...register('title')}
          placeholder="Todo başlığı"
          error={errors.title?.message}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Açıklama
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          placeholder="Todo açıklaması"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Durum
          </label>
          <Select
            {...register('status')}
            options={[
              { value: 'pending', label: 'Bekliyor' },
              { value: 'in_progress', label: 'Devam Ediyor' },
              { value: 'completed', label: 'Tamamlandı' },
              { value: 'cancelled', label: 'İptal Edildi' },
            ]}
            error={errors.status?.message}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Öncelik
          </label>
          <Select
            {...register('priority')}
            options={[
              { value: 'low', label: 'Düşük' },
              { value: 'medium', label: 'Orta' },
              { value: 'high', label: 'Yüksek' },
            ]}
            error={errors.priority?.message}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Bitiş Tarihi
        </label>
        <Input
          type="datetime-local"
          {...register('due_date')}
          error={errors.due_date?.message}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Kategoriler
        </label>
        <Controller
          control={control}
          name="categories"
          render={({ field }) => (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    value={category.id}
                    checked={field.value?.includes(category.id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const value = parseInt(e.target.value);
                      
                      if (checked) {
                        field.onChange([...(field.value || []), value]);
                      } else {
                        field.onChange(field.value?.filter(id => id !== value) || []);
                      }
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    style={{ color: category.color }}
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          İptal
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          {todo ? 'Güncelle' : 'Oluştur'}
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;