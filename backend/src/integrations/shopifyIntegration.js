/**
 * Integración con Shopify
 * Funciones para interactuar con la API de Shopify (mock inicial)
 * 
 * En el futuro, aquí se implementará la conexión real con la API de Shopify
 * usando OAuth2 y los endpoints oficiales de la API.
 */

/**
 * Obtiene productos desde Shopify
 * @param {string} shopDomain - Dominio de la tienda Shopify (ej: mi-tienda.myshopify.com)
 * @returns {Promise<Array>} Lista de productos
 */
export const getProductsFromShopify = async (shopDomain = null) => {
  // TODO: Implementar llamada real a la API de Shopify
  // Ejemplo: GET https://{shop_domain}/admin/api/2024-01/products.json
  
  console.log('🛒 [Shopify] Obteniendo productos... (mock)');
  
  // Simulación de respuesta
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 67890,
          sku: 'PROD-003',
          title: 'Producto de ejemplo Shopify',
          price: 18000,
          inventory_quantity: 20,
        },
      ]);
    }, 500);
  });
};

/**
 * Actualiza el stock de un producto en Shopify
 * @param {string} canal - Nombre del canal (Shopify)
 * @param {string} sku - SKU del producto
 * @param {number} newStock - Nuevo stock a establecer
 * @returns {Promise<Object>} Resultado de la actualización
 */
export const updateStock = async (canal, sku, newStock) => {
  // TODO: Implementar llamada real a la API de Shopify
  // Ejemplo: PUT https://{shop_domain}/admin/api/2024-01/inventory_levels/set.json
  // Body: { location_id: xxx, inventory_item_id: xxx, available: newStock }
  
  console.log(`🛒 [Shopify] Actualizando stock de ${sku} a ${newStock}... (mock)`);
  
  // Simulación de actualización
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Stock actualizado en Shopify: ${newStock} unidades`,
        sku,
        stock: newStock,
        canal,
        timestamp: new Date().toISOString(),
      });
    }, 300);
  });
};

/**
 * Obtiene el stock actual de un producto en Shopify
 * @param {string} canal - Nombre del canal
 * @param {string} sku - SKU del producto
 * @returns {Promise<number>} Stock actual
 */
export const getStock = async (canal, sku) => {
  // TODO: Implementar llamada real a la API de Shopify
  // Ejemplo: GET https://{shop_domain}/admin/api/2024-01/products.json?sku={sku}
  
  console.log(`🛒 [Shopify] Obteniendo stock de ${sku}... (mock)`);
  
  // Simulación: retornar un stock aleatorio para pruebas
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 50) + 1);
    }, 200);
  });
};

/**
 * Crea un nuevo producto en Shopify
 * @param {Object} productData - Datos del producto
 * @returns {Promise<Object>} Producto creado
 */
export const createProduct = async (productData) => {
  // TODO: Implementar creación real en Shopify
  console.log('🛒 [Shopify] Creando producto... (mock)');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Producto creado en Shopify',
        productId: 'gid://shopify/Product/' + Date.now(),
        ...productData,
      });
    }, 500);
  });
};

