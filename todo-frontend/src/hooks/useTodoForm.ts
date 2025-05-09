import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Todo, TodoCreate, TodoUpdate } from '../types/todo';
import { format } from 'date-fns';

// Zod şeması
const todoSchema = z.object({
  title: z.string().min(3, 'Başlık en az 3 karakter olmalıdır').max(100, 'Başlık en fazla 100 karakter olabilir'),
  description: z.string().max(500, 'Açıklama en fazla 500 karakter olabilir').nullable().optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
  priority: z.enum(['low', 'medium', 'high']),
  due_date: z.string().nullable().optional(),
  categories: z.array(z.number()).optional()
});

export type TodoFormValues = z.infer<typeof todoSchema>;

interface UseTodoFormProps {
  todo?: Todo;
  onSubmit: (data: TodoCreate | TodoUpdate) => void;
}

const useTodoForm = ({ todo, onSubmit }: UseTodoFormProps) => {
  const defaultValues: TodoFormValues = {
    title: todo?.title || '',
    description: todo?.description || '',
    status: todo?.status || 'pending',
    priority: todo?.priority || 'medium',
    due_date: todo?.due_date ? format(new Date(todo.due_date), 'yyyy-MM-dd\'T\'HH:mm') : null,
    categories: todo?.categories?.map(cat => cat.id) || []
  };

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues
  });

  const handleSubmit = (data: TodoFormValues) => {
    // Burada gerekirse data'yı TodoCreate veya TodoUpdate'e dönüştürün
    const submittedData: TodoCreate | TodoUpdate = {
      ...data,
      description: data.description || undefined // null yerine undefined
    };
    onSubmit(submittedData);
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit)
  };
};

export default useTodoForm;