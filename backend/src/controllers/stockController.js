/**
 * Controlador de Stock
 * Maneja la lógica de negocio para las operaciones de stock
 */

import Product from '../models/Product.js';

/**
 * Actualizar stock de un producto por SKU
 * PUT /api/stock/:sku
 */
export const updateStock = async (req, res, next) => {
  try {
    const { sku } = req.params;
    const { stock } = req.body;

    // Buscar producto
    const product = await Product.findBySku(sku);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Producto con SKU ${sku} no encontrado`,
      });
    }

    // Actualizar stock
    product.stock = stock;
    product.actualizadoEn = new Date();
    await product.save();

    res.status(200).json({
      success: true,
      message: `Stock actualizado exitosamente para ${sku}`,
      data: {
        sku: product.sku,
        nombre: product.nombre,
        stockAnterior: product.stock,
        stockNuevo: stock,
        actualizadoEn: product.actualizadoEn,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener stock de un producto por SKU
 * GET /api/stock/:sku
 */
export const getStock = async (req, res, next) => {
  try {
    const { sku } = req.params;

    const product = await Product.findBySku(sku);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Producto con SKU ${sku} no encontrado`,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        sku: product.sku,
        nombre: product.nombre,
        stock: product.stock,
        canales: product.canal,
        actualizadoEn: product.actualizadoEn,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener stock de todos los productos
 * GET /api/stock
 */
export const getAllStocks = async (req, res, next) => {
  try {
    const { canal, lowStock } = req.query;

    // Construir query
    const query = {};

    if (canal) {
      query.canal = { $in: [canal] };
    }

    // Filtrar productos con stock bajo (opcional)
    if (lowStock === 'true') {
      query.stock = { $lte: 10 }; // Stock menor o igual a 10
    }

    const products = await Product.find(query)
      .select('sku nombre stock canal actualizadoEn')
      .sort({ stock: 1 });

    res.status(200).json({
      success: true,
      data: products,
      total: products.length,
    });
  } catch (error) {
    next(error);
  }
};

