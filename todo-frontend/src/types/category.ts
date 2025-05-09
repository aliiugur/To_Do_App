export interface Category {
  id: number;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryCreate {
  name: string;
  color?: string;
}

export interface CategoryUpdate extends Partial<CategoryCreate> {}