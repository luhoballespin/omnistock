/**
 * Rutas de Stock
 * Define los endpoints para la gestión de stock
 */

import express from 'express';
import {
  updateStock,
  getStock,
  getAllStocks,
} from '../controllers/stockController.js';
import { validateStockUpdate } from '../middlewares/validateProduct.js';

const router = express.Router();

/**
 * @route   GET /api/stock
 * @desc    Obtener stock de todos los productos
 * @access  Public
 * @query   canal, lowStock
 */
router.get('/', getAllStocks);

/**
 * @route   GET /api/stock/:sku
 * @desc    Obtener stock de un producto específico
 * @access  Public
 */
router.get('/:sku', getStock);

/**
 * @route   PUT /api/stock/:sku
 * @desc    Actualizar stock de un producto
 * @access  Public
 */
router.put('/:sku', validateStockUpdate, updateStock);

export default router;

