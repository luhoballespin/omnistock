/**
 * Configuración centralizada de la aplicación
 * Carga variables de entorno y exporta configuración
 */

import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

/**
 * Configuración de la aplicación
 */
export const config = {
  // Puerto del servidor
  port: process.env.PORT || 4000,

  // URI de conexión a MongoDB Atlas
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/omnistock',

  // Entorno de ejecución
  nodeEnv: process.env.NODE_ENV || 'development',

  // Configuración de CORS
  corsOrigin: process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',') 
    : ['http://localhost:3000', 'http://localhost:5173'],

  // Configuración de la aplicación
  app: {
    name: 'OmniStock API',
    version: '1.0.0',
    description: 'Middleware de stock omnicanal'
  }
};

/**
 * Validar que las variables de entorno requeridas estén configuradas
 */
export const validateConfig = () => {
  const required = ['MONGO_URI'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Error: Faltan variables de entorno requeridas:', missing.join(', '));
    console.error('💡 Crea un archivo .env basado en .env.example');
    process.exit(1);
  }
};

