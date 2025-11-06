/**
 * Controlador de Semilla (Seed)
 * Genera datos de prueba usando Faker
 */

import { faker } from '@faker-js/faker';
import Product from '../models/Product.js';

/**
 * Genera productos de prueba
 * POST /api/seed
 */
export const seedProducts = async (req, res, next) => {
  try {
    const count = parseInt(req.query.count) || 10;
    const canales = ['MercadoLibre', 'TiendaNube', 'Shopify', 'POS'];

    // Limpiar productos existentes (opcional, comentado por seguridad)
    // await Product.deleteMany({});

    const products = [];

    for (let i = 0; i < count; i++) {
      // Generar SKU único
      const sku = `PROD-${faker.string.alphanumeric(6).toUpperCase()}`;

      // Verificar que el SKU no exista
      const existingProduct = await Product.findBySku(sku);
      if (existingProduct) {
        continue; // Saltar si ya existe
      }

      // Seleccionar canales aleatorios (1-3 canales por producto)
      const numCanales = faker.number.int({ min: 1, max: 3 });
      const selectedCanales = faker.helpers.arrayElements(canales, numCanales);

      // Crear producto
      const product = new Product({
        sku,
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        precio: parseFloat(faker.commerce.price({ min: 1000, max: 50000 })),
        stock: faker.number.int({ min: 0, max: 100 }),
        canal: selectedCanales,
        imagen: faker.image.url({ width: 400, height: 400 }),
      });

      await product.save();
      products.push(product);
    }

    res.status(201).json({
      success: true,
      message: `${products.length} productos generados exitosamente`,
      data: {
        count: products.length,
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

