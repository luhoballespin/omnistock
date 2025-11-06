# 🚀 OmniStock Backend

Middleware de stock omnicanal - Sistema SaaS para sincronización de inventario entre múltiples canales de venta.

## 📋 Descripción

OmniStock es un sistema backend que permite gestionar y sincronizar el stock de productos entre diferentes canales de venta como MercadoLibre, TiendaNube, Shopify y puntos de venta locales.

## 🛠️ Tecnologías

- **Node.js** + **Express.js** - Framework web
- **MongoDB Atlas** + **Mongoose** - Base de datos
- **ES Modules** (import/export) - Sistema de módulos
- **Swagger** - Documentación API
- **Node-cron** - Tareas programadas
- **Faker** - Datos de prueba

## 📁 Estructura del Proyecto

```
backend/
  src/
    config/          # Configuración de la aplicación
    controllers/     # Controladores (lógica de negocio)
    db/             # Conexión a MongoDB
    integrations/   # Integraciones con APIs externas
    middlewares/    # Middlewares de Express
    models/         # Modelos de Mongoose
    routes/         # Rutas de la API
    services/       # Servicios de negocio
    utils/          # Utilidades (seed, cron jobs)
    app.js          # Configuración de Express
    server.js       # Punto de entrada
  .env              # Variables de entorno (crear desde .env.example)
  package.json
  README.md
```

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd omnistock/backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita `.env` y configura:

- `MONGO_URI`: URI de conexión a MongoDB Atlas
- `PORT`: Puerto del servidor (default: 4000)
- `NODE_ENV`: Entorno de ejecución (development/production)

### 4. Conectar a MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Obtén la cadena de conexión
4. Reemplaza `<password>` y `<dbname>` en `MONGO_URI`

### 5. Ejecutar el servidor

**Modo desarrollo (con watch):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en `http://localhost:4000`

## 📚 Endpoints de la API

### Productos

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:sku` - Obtener producto por SKU
- `POST /api/products` - Crear nuevo producto
- `PUT /api/products/:sku` - Actualizar producto
- `DELETE /api/products/:sku` - Eliminar producto

### Stock

- `GET /api/stock` - Obtener stock de todos los productos
- `GET /api/stock/:sku` - Obtener stock de un producto
- `PUT /api/stock/:sku` - Actualizar stock

### Sincronización

- `POST /api/sync/product/:sku` - Sincronizar producto específico
- `POST /api/sync/all` - Sincronizar todos los productos
- `GET /api/sync/compare/:sku/:canal` - Comparar stock local vs remoto

### Webhooks

- `POST /api/webhooks/mercadolibre` - Webhook de MercadoLibre
- `POST /api/webhooks/tiendanube` - Webhook de TiendaNube
- `POST /api/webhooks/shopify` - Webhook de Shopify

### Utilidades

- `POST /api/seed?count=10` - Generar productos de prueba
- `GET /health` - Health check del servidor
- `GET /api-docs` - Documentación Swagger

## 📖 Documentación

La documentación completa de la API está disponible en:

```
http://localhost:4000/api-docs
```

## 🧪 Generar Datos de Prueba

### Usando el endpoint:

```bash
POST http://localhost:4000/api/seed?count=10
```

### Usando el script:

```bash
npm run seed
```

## 🔧 Modelo de Producto

```javascript
{
  sku: String,              // SKU único (requerido)
  nombre: String,           // Nombre del producto (requerido)
  descripcion: String,      // Descripción (opcional)
  precio: Number,           // Precio (requerido)
  stock: Number,            // Stock disponible (requerido)
  canal: [String],          // Canales: ["MercadoLibre", "TiendaNube", "Shopify", "POS"]
  imagen: String,           // URL de imagen (opcional)
  actualizadoEn: Date,      // Fecha de última actualización
  createdAt: Date,          // Fecha de creación
  updatedAt: Date           // Fecha de última modificación
}
```

## 🔄 Sincronización Automática

El sistema incluye tareas programadas (cron jobs) que sincronizan automáticamente el stock cada 15 minutos.

Para habilitar:

```env
ENABLE_CRON=true
```

## 🔐 Webhooks

### Configurar webhooks en canales externos:

**MercadoLibre:**
- URL: `https://tu-dominio.com/api/webhooks/mercadolibre`
- Eventos: `orders_v2`, `items`

**TiendaNube:**
- URL: `https://tu-dominio.com/api/webhooks/tiendanube`
- Eventos: `order/created`, `order/paid`

**Shopify:**
- URL: `https://tu-dominio.com/api/webhooks/shopify`
- Eventos: `orders/create`, `orders/paid`

## 🚢 Despliegue

### Render.com

1. Conecta tu repositorio a Render
2. Crea un nuevo Web Service
3. Configura:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Agrega variables de entorno desde el panel
5. Despliega

### Variables de entorno en producción:

```env
PORT=4000
MONGO_URI=mongodb+srv://...
NODE_ENV=production
CORS_ORIGIN=https://tu-frontend.com
ENABLE_CRON=true
```

## 📝 Ejemplos de Uso

### Crear un producto:

```bash
curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "PROD-001",
    "nombre": "Producto de ejemplo",
    "descripcion": "Descripción del producto",
    "precio": 15000,
    "stock": 50,
    "canal": ["MercadoLibre", "TiendaNube"]
  }'
```

### Actualizar stock:

```bash
curl -X PUT http://localhost:4000/api/stock/PROD-001 \
  -H "Content-Type: application/json" \
  -d '{
    "stock": 75
  }'
```

### Sincronizar todos los productos:

```bash
curl -X POST http://localhost:4000/api/sync/all
```

## 🐛 Solución de Problemas

### Error de conexión a MongoDB:

- Verifica que `MONGO_URI` esté correctamente configurado
- Asegúrate de que tu IP esté en la whitelist de MongoDB Atlas
- Verifica las credenciales de la base de datos

### Puerto en uso:

```bash
# Cambia el puerto en .env
PORT=4001
```

## 📄 Licencia

ISC

## 👥 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

## 📧 Soporte

Para soporte, abre un issue en el repositorio.

