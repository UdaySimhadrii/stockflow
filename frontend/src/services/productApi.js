import axiosInstance from './axiosInstance.js';

export const productApi = {
  list: (params) => axiosInstance.get('/products', { params }).then((r) => r.data.data),
  get: (id) => axiosInstance.get(`/products/${id}`).then((r) => r.data.data.product),
  create: (payload) => axiosInstance.post('/products', payload).then((r) => r.data.data.product),
  update: (id, payload) =>
    axiosInstance.put(`/products/${id}`, payload).then((r) => r.data.data.product),
  remove: (id) => axiosInstance.delete(`/products/${id}`).then((r) => r.data.data),
};

export default productApi;
