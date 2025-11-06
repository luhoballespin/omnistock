/**
 * Servidor principal
 * Punto de entrada de la aplicación
 */

import { config, validateConfig } from './config/index.js';
import { connectDB } from './db/mongo.js';
import app from './app.js';
import { initializeCronJobs } from './utils/cronJobs.js';

// Validar configuración
validateConfig();

/**
 * Iniciar servidor
 */
const startServer = async () => {
  try {
    // Conectar a MongoDB
    await connectDB();

    // Inicializar tareas programadas (solo en producción o si está habilitado)
    if (process.env.ENABLE_CRON === 'true' || config.nodeEnv === 'production') {
      initializeCronJobs();
    }

    // Iniciar servidor Express
    app.listen(config.port, () => {
      console.log('\n🚀 ========================================');
      console.log('   OmniStock API Server');
      console.log('========================================');
      console.log(`✅ Servidor corriendo en puerto ${config.port}`);
      console.log(`🌍 Entorno: ${config.nodeEnv}`);
      console.log(`📚 Documentación: http://localhost:${config.port}/api-docs`);
      console.log(`💚 Health Check: http://localhost:${config.port}/health`);
      console.log('========================================\n');
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejar errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Iniciar servidor
startServer();

