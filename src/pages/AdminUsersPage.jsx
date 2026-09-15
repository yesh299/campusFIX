import React, { useState, useEffect } from 'react';
import { Users, Search, Shield, User, Mail, Building, FileText, Calendar } from 'lucide-react';
import { adminService } from '../services/adminService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { formatDate } from '../utils/formatters';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await adminService.getAllUsers();
        if (res.success) {
          setUsers(res.users || []);
        }
      } catch (err) {
        console.error('Failed to fetch users', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const query = search.toLowerCase();
    const matchesSearch =
      u.name?.toLowerCase().includes(query) ||
      u.email?.toLowerCase().includes(query) ||
      u.studentId?.toLowerCase().includes(query) ||
      u.department?.toLowerCase().includes(query);
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
          User Directory
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          View registered students, administrators, and their grievance statistics
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, email or department..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#15559A]"
          />
        </div>

        <div className="w-full sm:w-auto flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#15559A]"
          >
            <option value="All">All Roles ({users.length})</option>
            <option value="student">Students ({users.filter((u) => u.role === 'student').length})</option>
            <option value="admin">Administrators ({users.filter((u) => u.role === 'admin').length})</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="py-16 flex justify-center">
          <LoadingSpinner text="Loading user directory..." size="medium" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <EmptyState
          title="No users found"
          description="No student or staff records matched your query."
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Student ID</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Complaints Logged</th>
                  <th className="py-3.5 px-4">Registered Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredUsers.map((u) => {
                  const isAdmin = u.role === 'admin';
                  return (
                    <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm text-white shrink-0 ${
                              isAdmin ? 'bg-[#15559A]' : 'bg-[#3155E7]'
                            }`}
                          >
                            {u.name?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 block">{u.name}</span>
                            <span className="text-[11px] text-slate-400 block font-mono">{u.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                            isAdmin
                              ? 'bg-blue-50 text-[#15559A] border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                        {u.studentId || '—'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {u.department || 'General'}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#3155E7]">
                        {u.complaintsCount || 0}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {formatDate(u.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
