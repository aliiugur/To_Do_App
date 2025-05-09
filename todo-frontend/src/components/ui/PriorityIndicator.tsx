import React from 'react';
import { cn } from '../../utils/cn';

interface PriorityIndicatorProps {
  priority: 'low' | 'medium' | 'high';
  className?: string;
  showLabel?: boolean;
}

const priorityConfig = {
  low: {
    label: 'Düşük',
    className: 'bg-green-500',
    icon: 'h-2 w-2 rounded-full',
  },
  medium: {
    label: 'Orta',
    className: 'bg-yellow-500',
    icon: 'h-2 w-2 rounded-full',
  },
  high: {
    label: 'Yüksek',
    className: 'bg-red-500',
    icon: 'h-2 w-2 rounded-full',
  },
};

const PriorityIndicator: React.FC<PriorityIndicatorProps> = ({ priority, className, showLabel = true }) => {
  const { label, className: priorityClassName, icon } = priorityConfig[priority];

  return (
    <div className={cn("flex items-center",className)} >
      <span className={cn(icon, priorityClassName, 'mr-1.5')} />
      {showLabel && <span className="text-sm">{label}</span>}
    </div>
  );
};

export default PriorityIndicator;