/**
 * Servicio de Gestión de Stock
 * Lógica de negocio para operaciones de stock
 */

import Product from '../models/Product.js';

/**
 * Actualiza el stock de un producto
 * @param {string} sku - SKU del producto
 * @param {number} newStock - Nuevo valor de stock
 * @returns {Promise<Object>} Producto actualizado
 */
export const updateProductStock = async (sku, newStock) => {
  try {
    const product = await Product.findBySku(sku);

    if (!product) {
      throw new Error(`Producto con SKU ${sku} no encontrado`);
    }

    const stockAnterior = product.stock;
    product.stock = newStock;
    product.actualizadoEn = new Date();
    await product.save();

    return {
      success: true,
      product,
      cambios: {
        stockAnterior,
        stockNuevo: newStock,
        diferencia: newStock - stockAnterior,
      },
    };
  } catch (error) {
    throw new Error(`Error al actualizar stock: ${error.message}`);
  }
};

/**
 * Disminuye el stock de un producto (usado en ventas)
 * @param {string} sku - SKU del producto
 * @param {number} cantidad - Cantidad a disminuir
 * @returns {Promise<Object>} Resultado de la operación
 */
export const decreaseStock = async (sku, cantidad) => {
  try {
    const product = await Product.findBySku(sku);

    if (!product) {
      throw new Error(`Producto con SKU ${sku} no encontrado`);
    }

    if (product.stock < cantidad) {
      throw new Error(`Stock insuficiente. Disponible: ${product.stock}, Solicitado: ${cantidad}`);
    }

    product.stock -= cantidad;
    product.actualizadoEn = new Date();
    await product.save();

    return {
      success: true,
      product,
      cantidadVendida: cantidad,
      stockRestante: product.stock,
    };
  } catch (error) {
    throw new Error(`Error al disminuir stock: ${error.message}`);
  }
};

/**
 * Aumenta el stock de un producto (usado en reposiciones)
 * @param {string} sku - SKU del producto
 * @param {number} cantidad - Cantidad a aumentar
 * @returns {Promise<Object>} Resultado de la operación
 */
export const increaseStock = async (sku, cantidad) => {
  try {
    const product = await Product.findBySku(sku);

    if (!product) {
      throw new Error(`Producto con SKU ${sku} no encontrado`);
    }

    product.stock += cantidad;
    product.actualizadoEn = new Date();
    await product.save();

    return {
      success: true,
      product,
      cantidadAgregada: cantidad,
      stockTotal: product.stock,
    };
  } catch (error) {
    throw new Error(`Error al aumentar stock: ${error.message}`);
  }
};

/**
 * Obtiene productos con stock bajo
 * @param {number} threshold - Umbral de stock bajo (default: 10)
 * @returns {Promise<Array>} Lista de productos con stock bajo
 */
export const getLowStockProducts = async (threshold = 10) => {
  try {
    const products = await Product.find({
      stock: { $lte: threshold },
    }).sort({ stock: 1 });

    return {
      success: true,
      threshold,
      total: products.length,
      products,
    };
  } catch (error) {
    throw new Error(`Error al obtener productos con stock bajo: ${error.message}`);
  }
};

/**
 * Obtiene estadísticas de stock
 * @returns {Promise<Object>} Estadísticas de stock
 */
export const getStockStatistics = async () => {
  try {
    const totalProducts = await Product.countDocuments();
    const productsWithStock = await Product.countDocuments({ stock: { $gt: 0 } });
    const productsOutOfStock = await Product.countDocuments({ stock: 0 });
    const lowStockProducts = await Product.countDocuments({ stock: { $lte: 10, $gt: 0 } });

    const aggregation = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: '$stock' },
          averageStock: { $avg: '$stock' },
          maxStock: { $max: '$stock' },
          minStock: { $min: '$stock' },
        },
      },
    ]);

    const stats = aggregation[0] || {
      totalStock: 0,
      averageStock: 0,
      maxStock: 0,
      minStock: 0,
    };

    return {
      success: true,
      data: {
        totalProducts,
        productsWithStock,
        productsOutOfStock,
        lowStockProducts,
        totalStock: stats.totalStock,
        averageStock: Math.round(stats.averageStock * 100) / 100,
        maxStock: stats.maxStock,
        minStock: stats.minStock,
      },
    };
  } catch (error) {
    throw new Error(`Error al obtener estadísticas: ${error.message}`);
  }
};

