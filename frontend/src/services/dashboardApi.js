import axiosInstance from './axiosInstance.js';

export const dashboardApi = {
  getSummary: () => axiosInstance.get('/dashboard/summary').then((r) => r.data.data),
};

export default dashboardApi;
