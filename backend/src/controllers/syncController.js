/**
 * Controlador de Sincronización
 * Maneja la lógica de sincronización de stock entre canales
 */

import * as syncService from '../services/syncService.js';

/**
 * Sincronizar stock de un producto específico
 * POST /api/sync/product/:sku
 */
export const syncProduct = async (req, res, next) => {
  try {
    const { sku } = req.params;

    const result = await syncService.syncProductStock(sku);

    res.status(200).json({
      success: result.success,
      message: result.success
        ? 'Producto sincronizado exitosamente'
        : 'Producto sincronizado con algunos errores',
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Sincronizar stock de todos los productos
 * POST /api/sync/all
 */
export const syncAll = async (req, res, next) => {
  try {
    const { canal } = req.query;

    const result = await syncService.syncAllProducts(canal);

    res.status(200).json({
      success: result.success,
      message: `Sincronización completada: ${result.data.exitosos} exitosos, ${result.data.fallidos} fallidos`,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Comparar stock local con remoto
 * GET /api/sync/compare/:sku/:canal
 */
export const compareStock = async (req, res, next) => {
  try {
    const { sku, canal } = req.params;

    const result = await syncService.compareStock(sku, canal);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

