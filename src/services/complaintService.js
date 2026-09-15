import api from './api';

export const complaintService = {
  createComplaint: async (formData) => {
    const response = await api.post('/complaints', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getMyComplaints: async (params = {}) => {
    const response = await api.get('/complaints/my', { params });
    return response.data;
  },

  getStudentDashboardStats: async () => {
    const response = await api.get('/complaints/dashboard-stats');
    return response.data;
  },

  getComplaintById: async (id) => {
    const response = await api.get(`/complaints/${id}`);
    return response.data;
  },

  updateComplaint: async (id, formData) => {
    const response = await api.put(`/complaints/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteComplaint: async (id) => {
    const response = await api.delete(`/complaints/${id}`);
    return response.data;
  },

  addComment: async (id, message) => {
    const response = await api.post(`/complaints/${id}/comments`, { message });
    return response.data;
  },

  getComments: async (id) => {
    const response = await api.get(`/complaints/${id}/comments`);
    return response.data;
  },
};
