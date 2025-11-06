# 🔧 Guía de Configuración de Variables de Entorno

## 📋 Archivos .env Creados

He creado los archivos `.env` para que puedas configurar tus datos:

- `backend/.env` - Configuración del backend
- `frontend/.env` - Configuración del frontend

## ⚙️ Configuración del Backend

### 1. MongoDB Atlas (OBLIGATORIO)

**Paso 1:** Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y crea una cuenta gratuita.

**Paso 2:** Crea un cluster gratuito (M0).

**Paso 3:** Crea un usuario de base de datos:
- Ve a "Database Access"
- Crea un nuevo usuario
- Guarda el usuario y contraseña

**Paso 4:** Configura la whitelist de IP:
- Ve a "Network Access"
- Agrega tu IP actual o usa `0.0.0.0/0` para desarrollo (no recomendado en producción)

**Paso 5:** Obtén la cadena de conexión:
- Ve a "Database" → "Connect"
- Selecciona "Connect your application"
- Copia la cadena de conexión

**Paso 6:** Edita `backend/.env`:
```env
MONGO_URI=mongodb+srv://TU_USUARIO:TU_PASSWORD@cluster0.xxxxx.mongodb.net/omnistock?retryWrites=true&w=majority
```

**⚠️ IMPORTANTE:** Reemplaza:
- `TU_USUARIO` con tu usuario de MongoDB
- `TU_PASSWORD` con tu contraseña de MongoDB
- `cluster0.xxxxx` con tu cluster de MongoDB

### 2. Puerto del Servidor (Opcional)

Por defecto el servidor corre en el puerto 4000. Si necesitas cambiarlo:

```env
PORT=4000
```

### 3. CORS (Opcional)

Si tu frontend corre en un puerto diferente, agrégalo aquí:

```env
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### 4. Tareas Programadas (Opcional)

Para habilitar la sincronización automática cada 15 minutos:

```env
ENABLE_CRON=true
```

### 5. Credenciales de Canales (Opcional - Para integraciones reales)

Estas credenciales solo son necesarias si vas a conectar con las APIs reales de los canales.

#### MercadoLibre
1. Ve a [MercadoLibre Developers](https://developers.mercadolibre.com.ar/)
2. Crea una aplicación
3. Obtén tu `ML_APP_ID` y `ML_SECRET_KEY`
4. Genera un `ML_ACCESS_TOKEN`

```env
ML_APP_ID=tu_app_id
ML_SECRET_KEY=tu_secret_key
ML_ACCESS_TOKEN=tu_access_token
```

#### TiendaNube
1. Ve a [TiendaNube Developers](https://developers.tiendanube.com/)
2. Crea una aplicación
3. Obtén tu `TIENDANUBE_ACCESS_TOKEN` y `TIENDANUBE_STORE_ID`

```env
TIENDANUBE_ACCESS_TOKEN=tu_access_token
TIENDANUBE_STORE_ID=tu_store_id
```

#### Shopify
1. Ve a [Shopify Partners](https://partners.shopify.com/)
2. Crea una aplicación
3. Obtén tus credenciales

```env
SHOPIFY_API_KEY=tu_api_key
SHOPIFY_ACCESS_TOKEN=tu_access_token
SHOPIFY_SHOP_DOMAIN=tu-tienda.myshopify.com
SHOPIFY_WEBHOOK_SECRET=tu_webhook_secret
```

## ⚙️ Configuración del Frontend

### URL del Backend

Por defecto está configurado para desarrollo local:

```env
VITE_API_URL=http://localhost:4000/api
```

Si tu backend está en otro servidor, cambia la URL:

```env
VITE_API_URL=https://tu-backend.com/api
```

## ✅ Verificación

### Backend

1. Abre `backend/.env`
2. Verifica que `MONGO_URI` esté correctamente configurado
3. Inicia el servidor:
   ```bash
   cd backend
   npm run dev
   ```
4. Deberías ver: `✅ MongoDB Atlas conectado`

### Frontend

1. Abre `frontend/.env`
2. Verifica que `VITE_API_URL` apunte a tu backend
3. Inicia el servidor:
   ```bash
   cd frontend
   npm run dev
   ```
4. Abre `http://localhost:5173` en tu navegador

## 🔒 Seguridad

**⚠️ IMPORTANTE:**
- Los archivos `.env` están en `.gitignore` y NO se subirán a Git
- **NUNCA** compartas tus credenciales
- **NUNCA** subas archivos `.env` a repositorios públicos
- En producción, usa variables de entorno del servidor (Render, Vercel, etc.)

## 🐛 Solución de Problemas

### Error: "Faltan variables de entorno requeridas"
- Verifica que `MONGO_URI` esté configurado en `backend/.env`
- Asegúrate de que el archivo se llame exactamente `.env` (no `.env.example`)

### Error: "Error al conectar a MongoDB Atlas"
- Verifica que tu IP esté en la whitelist de MongoDB Atlas
- Verifica que el usuario y contraseña sean correctos
- Verifica que la cadena de conexión esté bien formateada

### Error: "CORS Error" en el frontend
- Verifica que `CORS_ORIGIN` en el backend incluya la URL del frontend
- Verifica que `VITE_API_URL` en el frontend sea correcto

## 📝 Ejemplo de .env Completo

### backend/.env
```env
PORT=4000
MONGO_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/omnistock?retryWrites=true&w=majority
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
ENABLE_CRON=false
```

### frontend/.env
```env
VITE_API_URL=http://localhost:4000/api
```

## 🎉 ¡Listo!

Una vez configurados los archivos `.env`, puedes iniciar el proyecto siguiendo las instrucciones en [QUICKSTART.md](./QUICKSTART.md).

