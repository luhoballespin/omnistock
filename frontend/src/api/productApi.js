/**
 * API Client para productos
 * Funciones para interactuar con el backend
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Obtener todos los productos
 * @param {Object} params - Parámetros de búsqueda (canal, search, limit, page)
 * @returns {Promise} Respuesta de la API
 */
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Obtener un producto por SKU
 * @param {string} sku - SKU del producto
 * @returns {Promise} Respuesta de la API
 */
export const getProductBySku = async (sku) => {
  try {
    const response = await api.get(`/products/${sku}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Crear un nuevo producto
 * @param {Object} data - Datos del producto
 * @returns {Promise} Respuesta de la API
 */
export const createProduct = async (data) => {
  try {
    const response = await api.post('/products', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Actualizar un producto
 * @param {string} sku - SKU del producto
 * @param {Object} data - Datos a actualizar
 * @returns {Promise} Respuesta de la API
 */
export const updateProduct = async (sku, data) => {
  try {
    const response = await api.put(`/products/${sku}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Eliminar un producto
 * @param {string} sku - SKU del producto
 * @returns {Promise} Respuesta de la API
 */
export const deleteProduct = async (sku) => {
  try {
    const response = await api.delete(`/products/${sku}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Actualizar stock de un producto
 * @param {string} sku - SKU del producto
 * @param {number} stock - Nuevo stock
 * @returns {Promise} Respuesta de la API
 */
export const updateStock = async (sku, stock) => {
  try {
    const response = await api.put(`/stock/${sku}`, { stock });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Obtener stock de todos los productos
 * @param {Object} params - Parámetros de búsqueda
 * @returns {Promise} Respuesta de la API
 */
export const getAllStocks = async (params = {}) => {
  try {
    const response = await api.get('/stock', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Sincronizar todos los productos
 * @param {string} canal - Canal opcional para sincronizar
 * @returns {Promise} Respuesta de la API
 */
export const syncAll = async (canal = null) => {
  try {
    const params = canal ? { canal } : {};
    const response = await api.post('/sync/all', null, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Sincronizar un producto específico
 * @param {string} sku - SKU del producto
 * @returns {Promise} Respuesta de la API
 */
export const syncProduct = async (sku) => {
  try {
    const response = await api.post(`/sync/product/${sku}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Generar productos de prueba
 * @param {number} count - Cantidad de productos a generar
 * @returns {Promise} Respuesta de la API
 */
export const seedProducts = async (count = 10) => {
  try {
    const response = await api.post(`/seed?count=${count}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;

