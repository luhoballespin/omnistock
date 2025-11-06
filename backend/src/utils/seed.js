/**
 * Script de semilla independiente
 * Ejecutable desde la línea de comandos: npm run seed
 */

import dotenv from 'dotenv';
import { connectDB } from '../db/mongo.js';
import { faker } from '@faker-js/faker';
import Product from '../models/Product.js';

// Cargar variables de entorno
dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando semilla de base de datos...');

    // Conectar a MongoDB
    await connectDB();

    // Limpiar productos existentes (opcional)
    const deleteResult = await Product.deleteMany({});
    console.log(`🗑️  Eliminados ${deleteResult.deletedCount} productos existentes`);

    const count = 10;
    const canales = ['MercadoLibre', 'TiendaNube', 'Shopify', 'POS'];
    const products = [];

    console.log(`📦 Generando ${count} productos...`);

    for (let i = 0; i < count; i++) {
      const sku = `PROD-${faker.string.alphanumeric(6).toUpperCase()}`;
      const numCanales = faker.number.int({ min: 1, max: 3 });
      const selectedCanales = faker.helpers.arrayElements(canales, numCanales);

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
      console.log(`✅ Producto creado: ${product.sku} - ${product.nombre}`);
    }

    console.log(`\n🎉 Semilla completada: ${products.length} productos creados`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en la semilla:', error);
    process.exit(1);
  }
};

// Ejecutar semilla
seedDatabase();

