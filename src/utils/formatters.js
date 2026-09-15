export const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'Submitted':
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        text: 'Submitted',
      };
    case 'In Progress':
      return {
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-[#3155E7]',
        text: 'In Progress',
      };
    case 'Resolved':
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-[#4CAF50]',
        text: 'Resolved',
      };
    case 'Rejected':
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500',
        text: 'Rejected',
      };
    case 'Cancelled':
      return {
        bg: 'bg-slate-100 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
        text: 'Cancelled',
      };
    default:
      return {
        bg: 'bg-gray-100 text-gray-700 border-gray-200',
        dot: 'bg-gray-400',
        text: status,
      };
  }
};

export const getPriorityBadgeStyle = (priority) => {
  switch (priority) {
    case 'Low':
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        iconColor: 'text-emerald-500',
      };
    case 'Medium':
      return {
        bg: 'bg-sky-50 text-sky-700 border-sky-200',
        iconColor: 'text-sky-500',
      };
    case 'High':
      return {
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        iconColor: 'text-amber-500',
      };
    case 'Critical':
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200 font-semibold animate-pulse',
        iconColor: 'text-rose-500',
      };
    default:
      return {
        bg: 'bg-gray-50 text-gray-700 border-gray-200',
        iconColor: 'text-gray-400',
      };
  }
};
