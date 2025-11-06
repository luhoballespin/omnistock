/**
 * Servicio de sincronización de stock
 * Gestiona la lógica de sincronización entre diferentes canales
 */

import Product from '../models/Product.js';
import * as mercadolibreIntegration from '../integrations/mercadolibreIntegration.js';
import * as tiendanubeIntegration from '../integrations/tiendanubeIntegration.js';
import * as shopifyIntegration from '../integrations/shopifyIntegration.js';

/**
 * Mapeo de integraciones por canal
 */
const integrations = {
  MercadoLibre: mercadolibreIntegration,
  TiendaNube: tiendanubeIntegration,
  Shopify: shopifyIntegration,
};

/**
 * Sincroniza el stock de un producto específico con todos sus canales
 * @param {string} sku - SKU del producto a sincronizar
 * @returns {Promise<Object>} Resultado de la sincronización
 */
export const syncProductStock = async (sku) => {
  try {
    // Buscar el producto en la base de datos local
    const product = await Product.findBySku(sku);

    if (!product) {
      throw new Error(`Producto con SKU ${sku} no encontrado`);
    }

    const results = {
      sku: product.sku,
      nombre: product.nombre,
      stockLocal: product.stock,
      canales: [],
      errores: [],
    };

    // Sincronizar con cada canal configurado
    for (const canal of product.canal) {
      try {
        const integration = integrations[canal];

        if (!integration) {
          results.errores.push({
            canal,
            error: `Integración no disponible para ${canal}`,
          });
          continue;
        }

        // Actualizar stock en el canal externo
        const updateResult = await integration.updateStock(canal, sku, product.stock);

        results.canales.push({
          canal,
          stockActualizado: product.stock,
          exito: true,
          mensaje: updateResult.message || 'Stock actualizado correctamente',
        });
      } catch (error) {
        results.errores.push({
          canal,
          error: error.message || 'Error desconocido al sincronizar',
        });
      }
    }

    // Actualizar fecha de última actualización
    product.actualizadoEn = new Date();
    await product.save();

    return {
      success: results.errores.length === 0,
      data: results,
    };
  } catch (error) {
    throw new Error(`Error al sincronizar producto: ${error.message}`);
  }
};

/**
 * Sincroniza el stock de todos los productos con sus canales
 * @param {string} canal - Opcional: sincronizar solo un canal específico
 * @returns {Promise<Object>} Resultado de la sincronización masiva
 */
export const syncAllProducts = async (canal = null) => {
  try {
    // Construir query de búsqueda
    const query = canal ? { canal: { $in: [canal] } } : {};

    // Obtener todos los productos
    const products = await Product.find(query);

    if (products.length === 0) {
      return {
        success: true,
        message: 'No hay productos para sincronizar',
        data: {
          total: 0,
          exitosos: 0,
          fallidos: 0,
          resultados: [],
        },
      };
    }

    const resultados = [];
    let exitosos = 0;
    let fallidos = 0;

    // Sincronizar cada producto
    for (const product of products) {
      try {
        const result = await syncProductStock(product.sku);
        resultados.push(result.data);
        if (result.success) {
          exitosos++;
        } else {
          fallidos++;
        }
      } catch (error) {
        fallidos++;
        resultados.push({
          sku: product.sku,
          error: error.message,
        });
      }
    }

    return {
      success: fallidos === 0,
      data: {
        total: products.length,
        exitosos,
        fallidos,
        resultados,
      },
    };
  } catch (error) {
    throw new Error(`Error al sincronizar todos los productos: ${error.message}`);
  }
};

/**
 * Compara el stock local con el stock remoto de un canal
 * @param {string} sku - SKU del producto
 * @param {string} canal - Nombre del canal
 * @returns {Promise<Object>} Comparación de stocks
 */
export const compareStock = async (sku, canal) => {
  try {
    // Obtener stock local
    const product = await Product.findBySku(sku);
    if (!product) {
      throw new Error(`Producto con SKU ${sku} no encontrado`);
    }

    const stockLocal = product.stock;

    // Obtener integración del canal
    const integration = integrations[canal];
    if (!integration) {
      throw new Error(`Integración no disponible para ${canal}`);
    }

    // Obtener stock remoto (mock por ahora)
    const stockRemoto = await integration.getStock(canal, sku);

    const diferencia = stockLocal - stockRemoto;
    const necesitaSincronizacion = Math.abs(diferencia) > 0;

    return {
      success: true,
      data: {
        sku,
        canal,
        stockLocal,
        stockRemoto,
        diferencia,
        necesitaSincronizacion,
        accion: diferencia > 0 ? 'Actualizar remoto' : diferencia < 0 ? 'Actualizar local' : 'Sincronizado',
      },
    };
  } catch (error) {
    throw new Error(`Error al comparar stock: ${error.message}`);
  }
};

