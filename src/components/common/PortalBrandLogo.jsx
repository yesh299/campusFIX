import React from 'react';

const PortalBrandLogo = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-1 select-none ${className}`}>
      <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#174785] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] font-sans">
        CAMPUS
      </span>
      <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#3155E7] italic relative">
        FIX
        {/* Subtle under-glow accent */}
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#35D0B5] to-[#FFBD58] rounded-full" />
      </span>
    </div>
  );
};

export default PortalBrandLogo;
