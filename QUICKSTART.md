# 🚀 Guía de Inicio Rápido - OmniStock

Esta guía te ayudará a poner en marcha OmniStock en menos de 10 minutos.

## 📋 Prerrequisitos

- Node.js 18+ instalado
- Cuenta de MongoDB Atlas (gratuita)
- Git (opcional)

## ⚡ Pasos Rápidos

### 1. Configurar MongoDB Atlas

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un cluster (gratis)
4. Crea un usuario de base de datos
5. Obtén la cadena de conexión (Connection String)
6. Agrega tu IP a la whitelist (o usa 0.0.0.0/0 para desarrollo)

### 2. Configurar Backend

```bash
# Ir a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
# Copia .env.example y edita con tus credenciales
# Windows:
copy .env.example .env
# Linux/Mac:
cp .env.example .env

# Editar .env y agregar tu MONGO_URI
# Ejemplo: MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/omnistock?retryWrites=true&w=majority

# Iniciar servidor
npm run dev
```

El backend estará disponible en `http://localhost:4000`

### 3. Configurar Frontend

```bash
# En una nueva terminal, ir a la carpeta del frontend
cd frontend

# Instalar dependencias
npm install

# Crear archivo .env
# Windows:
copy .env.example .env
# Linux/Mac:
cp .env.example .env

# El .env ya tiene la configuración correcta para desarrollo
# VITE_API_URL=http://localhost:4000/api

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### 4. Generar Datos de Prueba

#### Opción 1: Desde el Frontend
1. Abre `http://localhost:5173`
2. Haz clic en "Generar datos de prueba"
3. Se crearán 10 productos de ejemplo

#### Opción 2: Desde el Backend
```bash
cd backend
npm run seed
```

O usar el endpoint:
```bash
curl -X POST http://localhost:4000/api/seed?count=10
```

## ✅ Verificar que Todo Funciona

### Backend
- Health Check: http://localhost:4000/health
- API Docs: http://localhost:4000/api-docs
- Listar productos: http://localhost:4000/api/products

### Frontend
- Dashboard: http://localhost:5173
- Deberías ver la tabla de productos (vacía o con datos de prueba)

## 🎯 Próximos Pasos

1. **Explorar el Dashboard**: Navega por la interfaz y familiarízate con las funcionalidades
2. **Crear Productos**: Usa el botón "Agregar producto" para crear tus primeros productos
3. **Sincronizar**: Prueba la sincronización de stock entre canales
4. **Revisar Documentación**: Lee los README.md de backend y frontend para más detalles

## 🐛 Solución de Problemas

### Error de conexión a MongoDB
- Verifica que `MONGO_URI` esté correcto en `.env`
- Asegúrate de que tu IP esté en la whitelist de MongoDB Atlas
- Verifica las credenciales de usuario

### Puerto en uso
- Cambia el puerto en `.env` (backend) o `vite.config.js` (frontend)
- O cierra la aplicación que está usando el puerto

### CORS Error
- Verifica que `CORS_ORIGIN` en el backend incluya la URL del frontend
- Por defecto está configurado para `http://localhost:5173`

### Frontend no se conecta al backend
- Verifica que el backend esté corriendo
- Verifica que `VITE_API_URL` en el frontend sea correcto
- Revisa la consola del navegador para errores

## 📚 Recursos

- [Documentación del Backend](./backend/README.md)
- [Documentación del Frontend](./frontend/README.md)
- [API Documentation](http://localhost:4000/api-docs) (cuando el backend esté corriendo)

## 🎉 ¡Listo!

Ya tienes OmniStock funcionando. Ahora puedes:
- Gestionar productos
- Sincronizar stock
- Preparar integraciones reales con canales de venta

¡Disfruta usando OmniStock! 🚀

