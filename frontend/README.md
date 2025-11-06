# 🎨 OmniStock Frontend

Frontend moderno para OmniStock - Dashboard de gestión de stock omnicanal.

## 🛠️ Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos
- **React Toastify** - Notificaciones

## 📁 Estructura del Proyecto

```
frontend/
  src/
    components/      # Componentes reutilizables
      Navbar.jsx
      ProductTable.jsx
      ProductForm.jsx
      SyncButton.jsx
    pages/          # Páginas
      Dashboard.jsx
    api/            # Cliente API
      productApi.js
    App.jsx         # Componente principal
    main.jsx        # Punto de entrada
    index.css       # Estilos globales
  package.json
  vite.config.js
  tailwind.config.js
  README.md
```

## 🚀 Instalación

### 1. Instalar dependencias

```bash
cd frontend
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `frontend`:

```env
VITE_API_URL=http://localhost:4000/api
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:5173`

### 4. Build para producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`

### 5. Preview de producción

```bash
npm run preview
```

## 🎯 Funcionalidades

### Dashboard

- **Tabla de productos**: Visualización completa de productos con filtros
- **Búsqueda**: Filtrar por nombre o SKU
- **Filtro por canal**: Filtrar productos por canal de venta
- **Estadísticas**: Resumen de productos, stock disponible, stock bajo, sin stock

### Gestión de Productos

- **Crear producto**: Formulario completo con validaciones
- **Editar producto**: Modificar información existente
- **Eliminar producto**: Con confirmación
- **Sincronizar producto**: Sincronizar stock individual

### Sincronización

- **Sincronizar todos**: Botón para sincronizar todos los productos
- **Sincronizar individual**: Botón en cada fila de la tabla
- **Indicadores visuales**: Loading states y animaciones

### Datos de Prueba

- **Generar seed**: Botón para generar 10 productos de prueba

## 🎨 Componentes

### Navbar

Barra de navegación con:
- Logo de OmniStock
- Botón "Sincronizar canales"
- Botón "Agregar producto"

### ProductTable

Tabla responsive con:
- Columnas: SKU, Nombre, Precio, Stock, Canales, Acciones
- Badges de color para stock (verde/amarillo/rojo)
- Badges de canales
- Botones de acción (Sincronizar, Editar, Eliminar)

### ProductForm

Modal de formulario con:
- Campos: SKU, Nombre, Descripción, Precio, Stock, Canales, Imagen
- Validaciones en tiempo real
- Selección múltiple de canales
- Modo crear/editar

### SyncButton

Botón de sincronización con:
- Estado de carga
- Animación de spinner
- Notificaciones de éxito/error

## 🔌 Integración con Backend

El frontend se conecta al backend a través de:

- **API URL**: Configurable mediante `VITE_API_URL`
- **Proxy en desarrollo**: Configurado en `vite.config.js`
- **Cliente Axios**: Centralizado en `src/api/productApi.js`

## 🚢 Despliegue

### Vercel

1. Conecta tu repositorio a Vercel
2. Configura el proyecto:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Agrega variable de entorno:
   - `VITE_API_URL`: URL de tu backend en producción
4. Despliega

### Netlify

1. Conecta tu repositorio a Netlify
2. Configura:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Agrega variable de entorno:
   - `VITE_API_URL`: URL de tu backend
4. Despliega

### Variables de entorno en producción

```env
VITE_API_URL=https://api.omnistock.com/api
```

## 🎨 Personalización

### Colores

Los colores se pueden personalizar en `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Tu paleta de colores
  }
}
```

### Estilos

Los estilos globales están en `src/index.css` usando Tailwind CSS.

## 📱 Responsive

El diseño es completamente responsive:
- **Mobile**: Stack vertical, tabla con scroll horizontal
- **Tablet**: Layout adaptativo
- **Desktop**: Layout completo con todas las funcionalidades

## 🐛 Solución de Problemas

### Error de conexión con el backend

- Verifica que `VITE_API_URL` esté correctamente configurado
- Asegúrate de que el backend esté corriendo
- Revisa la consola del navegador para errores CORS

### Estilos no se aplican

- Verifica que Tailwind CSS esté correctamente configurado
- Ejecuta `npm install` nuevamente
- Limpia la caché: `rm -rf node_modules/.vite`

## 📄 Licencia

ISC

## 👥 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

