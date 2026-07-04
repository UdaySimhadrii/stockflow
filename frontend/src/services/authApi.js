import axiosInstance from './axiosInstance.js';

export const authApi = {
  signup: (payload) => axiosInstance.post('/auth/signup', payload).then((r) => r.data.data),
  login: (payload) => axiosInstance.post('/auth/login', payload).then((r) => r.data.data),
  getMe: () => axiosInstance.get('/auth/me').then((r) => r.data.data.user),
};

export default authApi;
