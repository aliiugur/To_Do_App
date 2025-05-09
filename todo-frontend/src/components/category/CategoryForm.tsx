import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Category } from '../../types/category';

const categorySchema = z.object({
  name: z.string().min(1, 'Kategori adı zorunludur').max(100, 'Kategori adı en fazla 100 karakter olabilir'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Geçerli bir HEX renk kodu giriniz (örn: #FF5733)')
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  category?: Category;
  isSubmitting: boolean;
  onSubmit: (data: CategoryFormData) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  isSubmitting,
  onSubmit,
  onCancel
}) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || '',
      color: category?.color || '#5bbdff'
    }
  });

  const currentColor = watch('color');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Kategori Adı *
        </label>
        <Input
          {...register('name')}
          placeholder="Kategori adı"
          error={errors.name?.message}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Renk *
        </label>
        <div className="flex space-x-3">
          <div
            className="h-10 w-10 rounded-md border border-gray-300 dark:border-gray-700"
            style={{ backgroundColor: currentColor }}
          ></div>
          <Input
            type="text"
            {...register('color')}
            placeholder="#FF5733"
            error={errors.color?.message}
          />
        </div>
      </div>
      
      <div className="pt-4 flex justify-end space-x-3">
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
          {category ? 'Güncelle' : 'Oluştur'}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;