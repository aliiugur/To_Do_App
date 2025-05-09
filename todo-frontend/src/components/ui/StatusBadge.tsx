import React from 'react';
import { cn } from '../../utils/cn';

interface StatusBadgeProps {
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Bekliyor',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  },
  in_progress: {
    label: 'Devam Ediyor',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  },
  completed: {
    label: 'Tamamlandı',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  },
  cancelled: {
    label: 'İptal Edildi',
    className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const { label, className: statusClassName } = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        statusClassName,
        className
      )}
    >
      {label}
    </span>
  );
};

export default StatusBadge;