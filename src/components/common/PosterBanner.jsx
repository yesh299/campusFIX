import React from 'react';
import { ShieldCheck, Wrench, CheckCircle2 } from 'lucide-react';

const PosterBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#091738] via-[#0b1f4d] to-[#0d2761] p-4 sm:p-5 text-white shadow-xl flex flex-col justify-between h-full border border-blue-900/40">
      {/* Background Subtle Light Glow */}
      <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-blue-500/15 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-[#e8a614]/15 blur-2xl pointer-events-none" />

      {/* Top Header: Shield Badge */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#ffd23f] to-[#e8a614] flex items-center justify-center text-[#091738] font-bold shadow-md">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-right">
            <span className="text-[10px] font-extrabold tracking-wider text-white uppercase block leading-tight">
              CAMPUS FIX
            </span>
            <span className="text-[7px] font-semibold text-blue-200 uppercase tracking-widest block">
              OFFICIAL PORTAL
            </span>
          </div>
        </div>
      </div>

      {/* Main Center Headline: CAMPUS FIX */}
      <div className="my-auto py-3 space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
          <Wrench className="w-3 h-3 text-[#ffd23f]" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-blue-100">
            Grievance Portal
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#FFD23F] leading-tight drop-shadow-md">
          CAMPUS FIX
        </h2>

        <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider leading-snug">
          STUDENT GRIEVANCE & ISSUE RESOLUTION PLATFORM
        </p>

        <p className="text-[10px] text-blue-200 font-medium leading-relaxed">
          Report issues, track maintenance updates, and ensure a better campus environment 24/7.
        </p>
      </div>

      {/* Bottom Sub-card: Campus Fix Verified Portal */}
      <div className="bg-white rounded-xl p-2.5 shadow-md border border-slate-200 flex items-center gap-2.5">
        {/* Navy & Gold Badge */}
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#091738] to-[#15559A] text-[#FFD23F] flex flex-col items-center justify-center font-black text-xs shrink-0 shadow-inner border border-blue-900">
          <span className="text-[10px] tracking-tight leading-none text-white">CF</span>
          <span className="text-[6px] font-bold mt-0.5 uppercase tracking-wider text-[#FFD23F]">PORTAL</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-black text-slate-900 leading-tight uppercase">
            CAMPUS FIX
          </p>
          <p className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider">
            Student & Faculty Resolution System
          </p>
        </div>
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
      </div>
    </div>
  );
};

export default PosterBanner;
