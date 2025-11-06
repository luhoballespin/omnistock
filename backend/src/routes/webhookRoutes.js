/**
 * Rutas de Webhooks
 * Define los endpoints para recibir notificaciones de canales externos
 */

import express from 'express';
import {
  handleMercadoLibreWebhook,
  handleTiendaNubeWebhook,
  handleShopifyWebhook,
} from '../controllers/webhookController.js';
import {
  verifyMercadoLibreWebhook,
  verifyTiendaNubeWebhook,
  verifyShopifyWebhook,
} from '../middlewares/webhookVerification.js';

const router = express.Router();

/**
 * @route   POST /api/webhooks/mercadolibre
 * @desc    Recibir webhook de MercadoLibre
 * @access  Public (verificado por middleware)
 */
router.post('/mercadolibre', verifyMercadoLibreWebhook, handleMercadoLibreWebhook);

/**
 * @route   POST /api/webhooks/tiendanube
 * @desc    Recibir webhook de TiendaNube
 * @access  Public (verificado por middleware)
 */
router.post('/tiendanube', verifyTiendaNubeWebhook, handleTiendaNubeWebhook);

/**
 * @route   POST /api/webhooks/shopify
 * @desc    Recibir webhook de Shopify
 * @access  Public (verificado por middleware)
 */
router.post('/shopify', verifyShopifyWebhook, handleShopifyWebhook);

export default router;

