/**
 * Configuración de Swagger para documentación API
 */

import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OmniStock API',
      version: '1.0.0',
      description: 'API para gestión de stock omnicanal - Sincronización de inventario entre múltiples canales',
      contact: {
        name: 'OmniStock Support',
        email: 'support@omnistock.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Servidor de desarrollo',
      },
      {
        url: 'https://api.omnistock.com',
        description: 'Servidor de producción',
      },
    ],
    tags: [
      {
        name: 'Products',
        description: 'Operaciones CRUD de productos',
      },
      {
        name: 'Stock',
        description: 'Gestión de stock',
      },
      {
        name: 'Sync',
        description: 'Sincronización entre canales',
      },
      {
        name: 'Webhooks',
        description: 'Webhooks de canales externos',
      },
      {
        name: 'Seed',
        description: 'Generación de datos de prueba',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // Rutas a documentar
};

export const swaggerSpec = swaggerJsdoc(options);

