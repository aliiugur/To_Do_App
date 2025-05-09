import React from 'react';
import { Category } from '../../types/category';
import { XCircleIcon } from '@heroicons/react/24/solid';

interface CategorySelectorProps {
  categories: Category[];
  selectedIds: number[];
  onChange: (selectedIds: number[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedIds,
  onChange,
}) => {
  const handleToggleCategory = (categoryId: number) => {
    if (selectedIds.includes(categoryId)) {
      onChange(selectedIds.filter(id => id !== categoryId));
    } else {
      onChange([...selectedIds, categoryId]);
    }
  };

  const handleRemoveCategory = (categoryId: number) => {
    onChange(selectedIds.filter(id => id !== categoryId));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {selectedIds.length > 0 ? (
          categories
            .filter(category => selectedIds.includes(category.id))
            .map(category => (
              <div
                key={category.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: category.color + '30', color: category.color }}
              >
                {category.name}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category.id)}
                  className="ml-1 focus:outline-none"
                >
                  <XCircleIcon className="h-4 w-4" />
                </button>
              </div>
            ))
        ) : (
          <span className="text-gray-500 dark:text-gray-400">Henüz kategori seçilmedi</span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
        {categories.map(category => (
          <div
            key={category.id}
            onClick={() => handleToggleCategory(category.id)}
            className={`
              px-3 py-2 rounded-md text-sm cursor-pointer transition-colors
              ${selectedIds.includes(category.id)
                ? 'bg-opacity-30'
                : 'bg-opacity-10 hover:bg-opacity-20'
              }
            `}
            style={{ 
              backgroundColor: category.color + (selectedIds.includes(category.id) ? '30' : '10'),
              color: category.color
            }}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;