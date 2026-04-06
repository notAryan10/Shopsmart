import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const getCreators = () => api.get('/users?role=CREATOR');
export const getCreatorProducts = (id) => api.get(`/creators/${id}/products`);

export default api;
