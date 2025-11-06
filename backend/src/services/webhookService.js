/**
 * Servicio de Webhooks
 * Maneja la lógica de procesamiento de eventos de webhooks
 */

import * as stockService from './stockService.js';
import Product from '../models/Product.js';

/**
 * Procesa un evento de venta desde MercadoLibre
 * @param {Object} webhookData - Datos del webhook
 * @returns {Promise<Object>} Resultado del procesamiento
 */
export const processMercadoLibreSale = async (webhookData) => {
  try {
    const { resource, topic, application_id } = webhookData;

    // Verificar que sea un evento de orden
    if (topic !== 'orders_v2' && topic !== 'items') {
      return {
        success: false,
        message: `Tipo de evento no soportado: ${topic}`,
      };
    }

    // Obtener datos de la orden
    // En producción, aquí harías una llamada a la API de ML para obtener los detalles
    const orderItems = webhookData.data?.items || [];

    const resultados = [];
    const errores = [];

    // Procesar cada item de la orden
    for (const item of orderItems) {
      try {
        const sku = item.seller_sku || item.sku;
        const cantidad = item.quantity || 1;

        if (!sku) {
          errores.push({
            item: item.id,
            error: 'SKU no encontrado en el item',
          });
          continue;
        }

        // Disminuir stock
        const result = await stockService.decreaseStock(sku, cantidad);
        resultados.push({
          sku,
          cantidad,
          exito: true,
          stockRestante: result.stockRestante,
        });
      } catch (error) {
        errores.push({
          item: item.id,
          error: error.message,
        });
      }
    }

    return {
      success: errores.length === 0,
      message: `Procesados ${resultados.length} items, ${errores.length} errores`,
      resultados,
      errores,
    };
  } catch (error) {
    throw new Error(`Error al procesar venta de MercadoLibre: ${error.message}`);
  }
};

/**
 * Procesa un evento de venta desde TiendaNube
 * @param {Object} webhookData - Datos del webhook
 * @returns {Promise<Object>} Resultado del procesamiento
 */
export const processTiendaNubeSale = async (webhookData) => {
  try {
    const { event, store_id, id } = webhookData;

    // Verificar que sea un evento de orden creada
    if (event !== 'order/created' && event !== 'order/paid') {
      return {
        success: false,
        message: `Tipo de evento no soportado: ${event}`,
      };
    }

    // Obtener productos de la orden
    // En producción, aquí harías una llamada a la API de TiendaNube
    const orderProducts = webhookData.data?.products || [];

    const resultados = [];
    const errores = [];

    for (const product of orderProducts) {
      try {
        const sku = product.sku;
        const cantidad = product.quantity || 1;

        if (!sku) {
          errores.push({
            product: product.id,
            error: 'SKU no encontrado en el producto',
          });
          continue;
        }

        const result = await stockService.decreaseStock(sku, cantidad);
        resultados.push({
          sku,
          cantidad,
          exito: true,
          stockRestante: result.stockRestante,
        });
      } catch (error) {
        errores.push({
          product: product.id,
          error: error.message,
        });
      }
    }

    return {
      success: errores.length === 0,
      message: `Procesados ${resultados.length} productos, ${errores.length} errores`,
      resultados,
      errores,
    };
  } catch (error) {
    throw new Error(`Error al procesar venta de TiendaNube: ${error.message}`);
  }
};

/**
 * Procesa un evento de venta desde Shopify
 * @param {Object} webhookData - Datos del webhook
 * @returns {Promise<Object>} Resultado del procesamiento
 */
export const processShopifySale = async (webhookData) => {
  try {
    const { topic, shop_domain } = webhookData;

    // Verificar que sea un evento de orden creada
    if (topic !== 'orders/create' && topic !== 'orders/paid') {
      return {
        success: false,
        message: `Tipo de evento no soportado: ${topic}`,
      };
    }

    // Obtener line items de la orden
    const lineItems = webhookData.line_items || [];

    const resultados = [];
    const errores = [];

    for (const item of lineItems) {
      try {
        const sku = item.sku;
        const cantidad = item.quantity || 1;

        if (!sku) {
          errores.push({
            variant: item.variant_id,
            error: 'SKU no encontrado en el variant',
          });
          continue;
        }

        const result = await stockService.decreaseStock(sku, cantidad);
        resultados.push({
          sku,
          cantidad,
          exito: true,
          stockRestante: result.stockRestante,
        });
      } catch (error) {
        errores.push({
          variant: item.variant_id,
          error: error.message,
        });
      }
    }

    return {
      success: errores.length === 0,
      message: `Procesados ${resultados.length} items, ${errores.length} errores`,
      resultados,
      errores,
    };
  } catch (error) {
    throw new Error(`Error al procesar venta de Shopify: ${error.message}`);
  }
};

/**
 * Procesa actualización de stock desde un canal externo
 * @param {string} canal - Nombre del canal
 * @param {string} sku - SKU del producto
 * @param {number} nuevoStock - Nuevo stock desde el canal
 * @returns {Promise<Object>} Resultado de la actualización
 */
export const processStockUpdate = async (canal, sku, nuevoStock) => {
  try {
    const product = await Product.findBySku(sku);

    if (!product) {
      throw new Error(`Producto con SKU ${sku} no encontrado`);
    }

    // Actualizar stock local con el stock remoto
    const result = await stockService.updateProductStock(sku, nuevoStock);

    return {
      success: true,
      message: `Stock actualizado desde ${canal}`,
      data: result,
    };
  } catch (error) {
    throw new Error(`Error al procesar actualización de stock: ${error.message}`);
  }
};

