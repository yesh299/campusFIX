import React from 'react';
import { Inbox, PlusCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'There are no items matching your criteria at this moment.',
  actionText,
  actionLink,
  onActionClick,
  variant = 'default',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center bg-white rounded-xl border border-slate-200 shadow-sm my-4">
      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-4 shadow-inner">
        <Icon className="w-8 h-8 text-[#15559A]/60" />
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs md:text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      {actionText && (
        actionLink ? (
          <Link
            to={actionLink}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#3155E7] hover:bg-[#15559A] rounded-lg shadow-sm transition-all uppercase tracking-wider"
          >
            <PlusCircle className="w-4 h-4" />
            {actionText}
          </Link>
        ) : (
          <button
            onClick={onActionClick}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#3155E7] hover:bg-[#15559A] rounded-lg shadow-sm transition-all uppercase tracking-wider"
          >
            {actionText}
          </button>
        )
      )}
    </div>
  );
};

export default EmptyState;
