/**
 * Controlador de Webhooks
 * Maneja las solicitudes de webhooks de canales externos
 */

import * as webhookService from '../services/webhookService.js';

/**
 * Maneja webhook de MercadoLibre
 * POST /api/webhooks/mercadolibre
 */
export const handleMercadoLibreWebhook = async (req, res, next) => {
  try {
    console.log('📥 [MercadoLibre] Webhook recibido:', req.body);

    const result = await webhookService.processMercadoLibreSale(req.body);

    res.status(200).json({
      success: result.success,
      message: result.message,
      data: result,
    });
  } catch (error) {
    console.error('❌ Error al procesar webhook de MercadoLibre:', error);
    next(error);
  }
};

/**
 * Maneja webhook de TiendaNube
 * POST /api/webhooks/tiendanube
 */
export const handleTiendaNubeWebhook = async (req, res, next) => {
  try {
    console.log('📥 [TiendaNube] Webhook recibido:', req.body);

    const result = await webhookService.processTiendaNubeSale(req.body);

    res.status(200).json({
      success: result.success,
      message: result.message,
      data: result,
    });
  } catch (error) {
    console.error('❌ Error al procesar webhook de TiendaNube:', error);
    next(error);
  }
};

/**
 * Maneja webhook de Shopify
 * POST /api/webhooks/shopify
 */
export const handleShopifyWebhook = async (req, res, next) => {
  try {
    console.log('📥 [Shopify] Webhook recibido:', req.body);

    const result = await webhookService.processShopifySale(req.body);

    res.status(200).json({
      success: result.success,
      message: result.message,
      data: result,
    });
  } catch (error) {
    console.error('❌ Error al procesar webhook de Shopify:', error);
    next(error);
  }
};

