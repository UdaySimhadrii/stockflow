import axiosInstance from './axiosInstance.js';

export const settingsApi = {
  get: () => axiosInstance.get('/settings').then((r) => r.data.data),
  update: (payload) => axiosInstance.put('/settings', payload).then((r) => r.data.data),
};

export default settingsApi;
