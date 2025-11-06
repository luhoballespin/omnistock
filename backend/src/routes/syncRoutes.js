/**
 * Rutas de Sincronización
 * Define los endpoints para sincronizar stock entre canales
 */

import express from 'express';
import {
  syncProduct,
  syncAll,
  compareStock,
} from '../controllers/syncController.js';

const router = express.Router();

/**
 * @route   POST /api/sync/product/:sku
 * @desc    Sincronizar stock de un producto específico
 * @access  Public
 */
router.post('/product/:sku', syncProduct);

/**
 * @route   POST /api/sync/all
 * @desc    Sincronizar stock de todos los productos
 * @access  Public
 * @query   canal (opcional)
 */
router.post('/all', syncAll);

/**
 * @route   GET /api/sync/compare/:sku/:canal
 * @desc    Comparar stock local con remoto
 * @access  Public
 */
router.get('/compare/:sku/:canal', compareStock);

export default router;

