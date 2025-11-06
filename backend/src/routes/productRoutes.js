/**
 * Rutas de Productos
 * Define los endpoints para el CRUD de productos
 */

import express from 'express';
import {
  getAllProducts,
  getProductBySku,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { validateProduct } from '../middlewares/validateProduct.js';

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Obtener todos los productos
 * @access  Public
 * @query   canal, search, limit, page
 */
router.get('/', getAllProducts);

/**
 * @route   GET /api/products/:sku
 * @desc    Obtener un producto por SKU
 * @access  Public
 */
router.get('/:sku', getProductBySku);

/**
 * @route   POST /api/products
 * @desc    Crear un nuevo producto
 * @access  Public
 */
router.post('/', validateProduct, createProduct);

/**
 * @route   PUT /api/products/:sku
 * @desc    Actualizar un producto
 * @access  Public
 */
router.put('/:sku', validateProduct, updateProduct);

/**
 * @route   DELETE /api/products/:sku
 * @desc    Eliminar un producto
 * @access  Public
 */
router.delete('/:sku', deleteProduct);

export default router;

