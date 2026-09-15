import React from 'react';
import { getPriorityBadgeStyle } from '../../utils/formatters';
import { AlertCircle, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';

const PriorityBadge = ({ priority = 'Medium', size = 'md', className = '' }) => {
  const style = getPriorityBadgeStyle(priority);

  const getIcon = () => {
    switch (priority) {
      case 'Critical':
        return <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />;
      case 'High':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
      case 'Medium':
        return <ArrowUp className="w-3.5 h-3.5 text-sky-600 shrink-0" />;
      case 'Low':
        return <ArrowDown className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      default:
        return null;
    }
  };

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-0.5 gap-1.5',
    lg: 'text-sm px-3 py-1 gap-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded border ${
        style.bg
      } ${sizeClasses[size]} ${className}`}
    >
      {getIcon()}
      <span>{priority}</span>
    </span>
  );
};

export default PriorityBadge;
