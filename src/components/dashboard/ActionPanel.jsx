import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Sparkles, ArrowRight } from 'lucide-react';

const ActionPanels = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      {/* Panel 1: Report Campus Issues */}
      <div className="relative overflow-hidden rounded-xl p-5 bg-gradient-to-br from-[#15559A] to-[#3155E7] text-white shadow-md flex flex-col justify-between group">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2.5 py-1 rounded-full border border-white/30 backdrop-blur-sm">
              Quick Action
            </span>
            <PlusCircle className="w-5 h-5 text-[#35D0B5]" />
          </div>
          <h4 className="text-base font-extrabold mt-3 tracking-tight">REPORT CAMPUS ISSUES</h4>
          <p className="text-xs text-blue-100 mt-1 leading-relaxed">
            Found something broken or malfunctioning? Submit a grievance in under 60 seconds.
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-white/20 relative z-10">
          <Link
            to="/complaints/new"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-all"
          >
            <span>REPORT AN ISSUE</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Subtle Decorative Shape */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
      </div>

      {/* Panel 2: Track Complaints */}
      <div className="relative overflow-hidden rounded-xl p-5 bg-gradient-to-br from-[#0F766E] to-[#35D0B5] text-white shadow-md flex flex-col justify-between group">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2.5 py-1 rounded-full border border-white/30 backdrop-blur-sm">
              Grievance Status
            </span>
            <Search className="w-5 h-5 text-[#FFBD58]" />
          </div>
          <h4 className="text-base font-extrabold mt-3 tracking-tight">TRACK YOUR COMPLAINTS</h4>
          <p className="text-xs text-teal-100 mt-1 leading-relaxed">
            Follow live assignments, engineer logs, and administrative remarks step-by-step.
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-white/20 relative z-10">
          <Link
            to="/complaints"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-all"
          >
            <span>VIEW COMPLAINTS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
      </div>

      {/* Panel 3: Campus Improvement */}
      <div className="relative overflow-hidden rounded-xl p-5 bg-gradient-to-br from-[#D97706] to-[#FFBD58] text-white shadow-md flex flex-col justify-between group">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2.5 py-1 rounded-full border border-white/30 backdrop-blur-sm">
              Campus Support
            </span>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-base font-extrabold mt-3 tracking-tight">CAMPUS IMPROVEMENT</h4>
          <p className="text-xs text-amber-100 mt-1 leading-relaxed">
            Your reported issues directly help college management maintain high university standards.
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-white/20 relative z-10">
          <Link
            to="/help"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-all"
          >
            <span>LEARN GUIDELINES</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
      </div>
    </div>
  );
};

export default ActionPanels;
