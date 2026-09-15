import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

const CloudflareCaptcha = ({ isVerified = true, onToggle }) => {
  const [verified, setVerified] = useState(isVerified);

  const handleClick = () => {
    const next = !verified;
    setVerified(next);
    if (onToggle) onToggle(next);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#222222] text-white rounded-md px-4 py-2.5 flex items-center justify-between shadow-sm cursor-pointer select-none border border-[#333333] hover:border-slate-600 transition-colors"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
        </div>
        <span className="text-xs font-semibold text-slate-100 tracking-wide">
          {verified ? 'Success!' : 'Verifying...'}
        </span>
      </div>

      <div className="flex items-center gap-2 text-right">
        <div className="flex flex-col items-end leading-none">
          <div className="flex items-center gap-1">
            {/* Orange Cloudflare Cloud Icon SVG */}
            <svg className="w-5 h-3 text-[#F6821F]" viewBox="0 0 48 32" fill="currentColor">
              <path d="M38.5 14C37.8 7.9 32.5 3.2 26 3.2c-5.2 0-9.7 3.1-11.7 7.6C13.6 10.3 12.8 10 12 10c-4.4 0-8 3.6-8 8 0 .4 0 .9.1 1.3C1.7 20.3 0 22.9 0 26c0 4.4 3.6 8 8 8h30c5.5 0 10-4.5 10-10 0-5.1-3.8-9.3-8.8-9.9-.2-.1-.4-.1-.7-.1z" />
            </svg>
            <span className="text-[10px] font-extrabold tracking-wider text-slate-200 uppercase">
              CLOUDFLARE
            </span>
          </div>
          <span className="text-[8px] text-slate-400 mt-0.5">
            Privacy • Help
          </span>
        </div>
      </div>
    </div>
  );
};

export default CloudflareCaptcha;
