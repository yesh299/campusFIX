import React from 'react';

const Logo = ({ size = 'md', variant = 'light', showTagline = false, className = '' }) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', badge: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', badge: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', badge: 'text-xs' },
  };

  const isDarkText = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon Badge */}
      <div
        className={`${sizeMap[size].icon} bg-gradient-to-br from-[#15559A] to-[#3155E7] rounded-xl flex items-center justify-center shadow-md shrink-0 p-1.5 border border-white/20`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-white"
        >
          {/* Modern Building + Check Fix */}
          <path d="M3 21h18" stroke="#35D0B5" />
          <path d="M4 21V9l8-6 8 6v12" stroke="#FFFFFF" />
          <path d="M9 21v-6a3 3 0 0 1 6 0v6" stroke="#FFBD58" />
          <path d="M9 10h.01M15 10h.01" stroke="#35D0B5" strokeWidth="3" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-extrabold tracking-tight ${sizeMap[size].text} ${
              isDarkText ? 'text-slate-800' : 'text-white'
            }`}
          >
            CAMPUS<span className="text-[#35D0B5]">FIX</span>
          </span>
          <span className="bg-[#35D0B5]/20 text-[#35D0B5] font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wider uppercase border border-[#35D0B5]/30">
            PORTAL
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[10px] font-medium tracking-wide uppercase ${
              isDarkText ? 'text-slate-500' : 'text-slate-300'
            }`}
          >
            Issue & Grievance System
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
