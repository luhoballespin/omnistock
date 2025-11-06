/**
 * Configuración y conexión a MongoDB Atlas
 * Maneja la conexión, eventos de conexión y errores
 */

import mongoose from 'mongoose';
import { config } from '../config/index.js';

/**
 * Conecta a MongoDB Atlas usando la URI de configuración
 * @returns {Promise<void>}
 */
export const connectDB = async () => {
  try {
    const options = {
      // Opciones de conexión recomendadas para MongoDB Atlas
      serverSelectionTimeoutMS: 5000, // Timeout después de 5s en lugar de 30s
      socketTimeoutMS: 45000, // Cierra sockets después de 45s de inactividad
    };

    const conn = await mongoose.connect(config.mongoUri, options);

    console.log(`✅ MongoDB Atlas conectado: ${conn.connection.host}`);
    console.log(`📊 Base de datos: ${conn.connection.name}`);

    // Manejar eventos de conexión
    mongoose.connection.on('error', (err) => {
      console.error('❌ Error de MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB desconectado');
    });

    // Cerrar conexión al terminar la aplicación
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 Conexión a MongoDB cerrada');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error al conectar a MongoDB Atlas:', error.message);
    console.error('💡 Verifica tu MONGO_URI en el archivo .env');
    process.exit(1);
  }
};

/**
 * Desconecta de MongoDB
 * @returns {Promise<void>}
 */
export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('🔌 Desconectado de MongoDB');
  } catch (error) {
    console.error('❌ Error al desconectar de MongoDB:', error.message);
  }
};

