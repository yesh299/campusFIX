import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'blue',
  trend,
  onClick,
}) => {
  const variantStyles = {
    blue: {
      border: 'border-l-4 border-l-[#3155E7]',
      iconBg: 'bg-blue-50 text-[#3155E7]',
      accentBg: 'bg-gradient-to-r from-blue-50/60 to-white',
      badge: 'bg-blue-100 text-[#15559A]',
    },
    yellow: {
      border: 'border-l-4 border-l-[#FFBD58]',
      iconBg: 'bg-amber-50 text-amber-600',
      accentBg: 'bg-gradient-to-r from-amber-50/60 to-white',
      badge: 'bg-amber-100 text-amber-800',
    },
    teal: {
      border: 'border-l-4 border-l-[#35D0B5]',
      iconBg: 'bg-emerald-50 text-[#35D0B5]',
      accentBg: 'bg-gradient-to-r from-teal-50/60 to-white',
      badge: 'bg-teal-100 text-teal-800',
    },
    green: {
      border: 'border-l-4 border-l-[#4CAF50]',
      iconBg: 'bg-emerald-50 text-[#4CAF50]',
      accentBg: 'bg-gradient-to-r from-emerald-50/60 to-white',
      badge: 'bg-emerald-100 text-emerald-800',
    },
    coral: {
      border: 'border-l-4 border-l-[#FF6680]',
      iconBg: 'bg-rose-50 text-[#FF6680]',
      accentBg: 'bg-gradient-to-r from-rose-50/60 to-white',
      badge: 'bg-rose-100 text-rose-800',
    },
  };

  const style = variantStyles[variant] || variantStyles.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all ${
        style.border
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {value}
            </h3>
            {subtitle && (
              <span className="text-xs text-slate-400 font-medium">{subtitle}</span>
            )}
          </div>
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl ${style.iconBg} shadow-sm shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-500">{trend.label}</span>
          <span className={`font-semibold px-2 py-0.5 rounded-full ${style.badge}`}>
            {trend.value}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
