import React from 'react';
import { getStatusBadgeStyle } from '../../utils/formatters';

const StatusBadge = ({ status, size = 'md', className = '' }) => {
  const style = getStatusBadgeStyle(status);

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border shadow-sm transition-all ${
        style.bg
      } ${sizeClasses[size]} ${className}`}
    >
      <span className={`rounded-full ${style.dot} ${dotSizes[size]}`} />
      <span>{style.text}</span>
    </span>
  );
};

export default StatusBadge;
