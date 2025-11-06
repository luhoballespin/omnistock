/**
 * Aplicación Express principal
 * Configuración de middlewares, rutas y manejo de errores
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/index.js';
import { swaggerSpec } from './config/swagger.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

// Importar rutas
import productRoutes from './routes/productRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import syncRoutes from './routes/syncRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import seedRoutes from './routes/seedRoutes.js';

const app = express();

// Middlewares globales
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

app.use(morgan('dev')); // Logging de solicitudes
app.use(express.json()); // Parser de JSON
app.use(express.urlencoded({ extended: true })); // Parser de URL-encoded

// Ruta de salud (health check)
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'OmniStock API está funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bienvenido a OmniStock API',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      products: '/api/products',
      stock: '/api/stock',
      sync: '/api/sync',
      webhooks: '/api/webhooks',
      seed: '/api/seed',
    },
  });
});

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'OmniStock API Documentation',
}));

// Rutas de la API
app.use('/api/products', productRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/seed', seedRoutes);

// Middleware de manejo de errores (debe ir al final)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

