# 🚀 OmniStock - Sistema de Gestión de Stock Omnicanal

Sistema SaaS completo para sincronizar el stock de productos entre múltiples canales de venta (MercadoLibre, TiendaNube, Shopify, POS local, etc.) y mantener el inventario sincronizado en tiempo real.

## 📋 Descripción

OmniStock es una solución full-stack que consta de:

- **Backend**: API REST con Node.js + Express + MongoDB Atlas
- **Frontend**: Dashboard moderno con React + Vite + Tailwind CSS
- **Integraciones**: Preparado para conectar con APIs reales de canales de venta
- **Webhooks**: Sistema de webhooks para actualizaciones en tiempo real
- **Sincronización automática**: Tareas programadas para mantener stock sincronizado

## 🏗️ Arquitectura

```
omnistock/
├── backend/          # API REST (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/      # Configuración
│   │   ├── controllers/ # Controladores
│   │   ├── db/         # Conexión MongoDB
│   │   ├── integrations/ # Integraciones externas
│   │   ├── middlewares/ # Middlewares
│   │   ├── models/     # Modelos Mongoose
│   │   ├── routes/     # Rutas API
│   │   ├── services/   # Servicios de negocio
│   │   └── utils/      # Utilidades
│   └── README.md
│
└── frontend/        # Dashboard (React + Vite + Tailwind)
    ├── src/
    │   ├── components/  # Componentes React
    │   ├── pages/      # Páginas
    │   ├── api/        # Cliente API
    │   └── App.jsx
    └── README.md
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ instalado
- MongoDB Atlas (cuenta gratuita)
- Git

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd omnistock
```

### 2. Configurar Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales de MongoDB
npm run dev
```

El backend estará disponible en `http://localhost:4000`

### 3. Configurar Frontend

```bash
cd frontend
npm install
# Crear .env con VITE_API_URL=http://localhost:4000/api
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 📚 Documentación

### Backend

- [Documentación completa del backend](./backend/README.md)
- [API Documentation](http://localhost:4000/api-docs) (Swagger)

### Frontend

- [Documentación completa del frontend](./frontend/README.md)

## 🎯 Funcionalidades Principales

### ✅ Gestión de Productos

- CRUD completo de productos
- Validación de campos
- Búsqueda y filtrado
- Gestión de canales

### ✅ Gestión de Stock

- Actualización manual de stock
- Sincronización automática
- Comparación de stock local vs remoto
- Alertas de stock bajo

### ✅ Sincronización

- Sincronización manual por producto
- Sincronización masiva
- Sincronización automática (cron jobs)
- Comparación de stocks

### ✅ Integraciones

- MercadoLibre (preparado para API real)
- TiendaNube (preparado para API real)
- Shopify (preparado para API real)
- POS local

### ✅ Webhooks

- Endpoints para recibir webhooks
- Procesamiento automático de ventas
- Actualización de stock en tiempo real

## 🔧 Tecnologías

### Backend

- Node.js + Express.js
- MongoDB Atlas + Mongoose
- Swagger (documentación)
- Node-cron (tareas programadas)
- Faker (datos de prueba)

### Frontend

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React (iconos)
- React Toastify (notificaciones)

## 📖 Endpoints Principales

### Productos

- `GET /api/products` - Listar productos
- `GET /api/products/:sku` - Obtener producto
- `POST /api/products` - Crear producto
- `PUT /api/products/:sku` - Actualizar producto
- `DELETE /api/products/:sku` - Eliminar producto

### Stock

- `GET /api/stock` - Listar stocks
- `GET /api/stock/:sku` - Obtener stock
- `PUT /api/stock/:sku` - Actualizar stock

### Sincronización

- `POST /api/sync/all` - Sincronizar todos
- `POST /api/sync/product/:sku` - Sincronizar producto
- `GET /api/sync/compare/:sku/:canal` - Comparar stock

### Webhooks

- `POST /api/webhooks/mercadolibre` - Webhook ML
- `POST /api/webhooks/tiendanube` - Webhook TN
- `POST /api/webhooks/shopify` - Webhook Shopify

## 🧪 Generar Datos de Prueba

### Backend

```bash
cd backend
npm run seed
```

O usar el endpoint:

```bash
POST http://localhost:4000/api/seed?count=10
```

### Frontend

Usar el botón "Generar datos de prueba" en el dashboard.

## 🚢 Despliegue

### Backend (Render)

1. Conecta el repositorio a Render
2. Crea un Web Service
3. Configura:
   - Build: `npm install`
   - Start: `npm start`
4. Agrega variables de entorno

### Frontend (Vercel/Netlify)

1. Conecta el repositorio
2. Configura:
   - Build: `npm run build`
   - Output: `dist`
3. Agrega `VITE_API_URL` apuntando al backend

## 🔐 Variables de Entorno

### Backend (.env)

```env
PORT=4000
MONGO_URI=mongodb+srv://...
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
ENABLE_CRON=true
ML_APP_ID=...
ML_SECRET_KEY=...
TIENDANUBE_ACCESS_TOKEN=...
SHOPIFY_API_KEY=...
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:4000/api
```

## 📝 Próximos Pasos

- [ ] Implementar autenticación de usuarios
- [ ] Agregar más canales de venta
- [ ] Dashboard de estadísticas avanzadas
- [ ] Reportes y exportación de datos
- [ ] Notificaciones por email
- [ ] App móvil

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

ISC

## 👥 Autores

- Tu nombre aquí

## 🙏 Agradecimientos

- MongoDB Atlas
- Vercel/Netlify
- Render
- Comunidad open source

## 📧 Soporte

Para soporte, abre un issue en el repositorio.

---

**OmniStock** - Sincronización de stock omnicanal simplificada 🚀

