import React from 'react';

const LoadingSpinner = ({ text = 'Loading...', size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 gap-3 ${className}`}>
      <div
        className={`${sizeClasses[size]} border-slate-200 border-t-[#3155E7] rounded-full animate-spin`}
        role="status"
        aria-label="loading"
      />
      {text && <p className="text-xs font-medium text-slate-500 tracking-wide">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
