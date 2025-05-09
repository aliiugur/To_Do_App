import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Sayfa numaralarını sınırla, çok fazlaysa sadece etrafındakileri göster
  const visiblePages = (): number[] => {
    if (totalPages <= 7) return pages;
    
    if (currentPage <= 3) return [...pages.slice(0, 5), -1, totalPages];
    
    if (currentPage >= totalPages - 2) {
      return [1, -1, ...pages.slice(totalPages - 5)];
    }
    
    return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages];
  };

  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md text-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed dark:text-gray-400 dark:disabled:text-gray-600"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      
      {visiblePages().map((page, index) => (
        page === -1 ? (
          <span key={`ellipsis-${index}`} className="px-3 py-2">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'px-3 py-1 rounded-md',
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
            )}
          >
            {page}
          </button>
        )
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md text-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed dark:text-gray-400 dark:disabled:text-gray-600"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;