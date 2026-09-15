import api from './api';

export const adminService = {
  getAdminDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  getAllComplaints: async (params = {}) => {
    const response = await api.get('/admin/complaints', { params });
    return response.data;
  },

  updateStatus: async (id, data) => {
    const response = await api.put(`/admin/complaints/${id}/status`, data);
    return response.data;
  },

  assignComplaint: async (id, data) => {
    const response = await api.put(`/admin/complaints/${id}/assign`, data);
    return response.data;
  },

  updatePriority: async (id, priority) => {
    const response = await api.put(`/admin/complaints/${id}/priority`, { priority });
    return response.data;
  },

  deleteComplaint: async (id) => {
    const response = await api.delete(`/admin/complaints/${id}`);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
};
