import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) => api.post('/products', productData);
export const getCreators = () => api.get('/users?role=CREATOR');
export const getCreatorProducts = (id) => api.get(`/creators/${id}/products`);

export default api;
