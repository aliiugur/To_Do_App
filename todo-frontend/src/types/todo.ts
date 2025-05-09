import { Category } from './category';

export interface Todo {
    id: number;
    title: string;
    description: string | null;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high';
    due_date: string | null;
    created_at: string;
    updated_at: string;
    categories: Category[];
  }
  
  export interface TodoCreate {
    title: string;
    description?: string;
    status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    priority?: 'low' | 'medium' | 'high';
    due_date?: string | null;
    categories?: number[];
  }
  
  export interface TodoUpdate extends Partial<TodoCreate> {}
  
  export interface TodoFilters {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    priority?: 'low' | 'medium' | 'high';
  }
  
  export interface TodoStats {
    status: string;
    count: number;
  }
  
  export interface PriorityStats {
    priority: string;
    count: number;
  }