import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import Logo from '../components/common/Logo';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#15559A] border border-blue-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
        <AlertCircle className="w-8 h-8" />
      </div>

      <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">404</h1>
      <h2 className="text-lg font-bold text-slate-700 mt-1">Page Not Found</h2>
      <p className="text-xs text-slate-500 max-w-sm mt-2 leading-relaxed">
        The page you are looking for does not exist on CampusFix or has been moved to another location.
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#3155E7] hover:bg-[#15559A] text-white text-xs font-bold rounded-xl shadow-sm uppercase tracking-wider transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Home Page</span>
        </Link>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
