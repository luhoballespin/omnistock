/**
 * Controlador de Productos
 * Maneja la lógica de negocio para las operaciones CRUD de productos
 */

import Product from '../models/Product.js';

/**
 * Obtener todos los productos
 * GET /api/products
 */
export const getAllProducts = async (req, res, next) => {
  try {
    const { canal, search, limit = 50, page = 1 } = req.query;

    // Construir query de búsqueda
    const query = {};

    // Filtrar por canal si se proporciona
    if (canal) {
      query.canal = { $in: [canal] };
    }

    // Búsqueda por nombre o SKU
    if (search) {
      query.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { sku: { $regex: search.toUpperCase(), $options: 'i' } },
      ];
    }

    // Calcular paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Ejecutar consulta
    const products = await Product.find(query)
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ actualizadoEn: -1 });

    // Contar total de documentos
    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener un producto por SKU
 * GET /api/products/:sku
 */
export const getProductBySku = async (req, res, next) => {
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
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Crear un nuevo producto
 * POST /api/products
 */
export const createProduct = async (req, res, next) => {
  try {
    const { sku, nombre, descripcion, precio, stock, canal, imagen } = req.body;

    // Normalizar SKU a mayúsculas
    const normalizedSku = sku.toUpperCase();

    // Verificar si el producto ya existe
    const existingProduct = await Product.findBySku(normalizedSku);
    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: `El producto con SKU ${normalizedSku} ya existe`,
      });
    }

    // Crear nuevo producto
    const product = new Product({
      sku: normalizedSku,
      nombre,
      descripcion: descripcion || '',
      precio,
      stock: stock || 0,
      canal: canal || [],
      imagen: imagen || '',
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar un producto
 * PUT /api/products/:sku
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { sku } = req.params;
    const updateData = req.body;

    // Normalizar SKU
    const normalizedSku = sku.toUpperCase();

    // Si se actualiza el SKU, normalizarlo
    if (updateData.sku) {
      updateData.sku = updateData.sku.toUpperCase();
    }

    // Actualizar producto
    const product = await Product.findOneAndUpdate(
      { sku: normalizedSku },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Producto con SKU ${normalizedSku} no encontrado`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Eliminar un producto
 * DELETE /api/products/:sku
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { sku } = req.params;

    const product = await Product.findOneAndDelete({ sku: sku.toUpperCase() });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Producto con SKU ${sku} no encontrado`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Producto eliminado exitosamente',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

