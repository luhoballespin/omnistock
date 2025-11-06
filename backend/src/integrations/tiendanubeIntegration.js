/**
 * Integración con TiendaNube
 * Funciones para interactuar con la API de TiendaNube (mock inicial)
 * 
 * En el futuro, aquí se implementará la conexión real con la API de TiendaNube
 * usando OAuth2 y los endpoints oficiales de la API.
 */

/**
 * Obtiene productos desde TiendaNube
 * @param {string} storeId - ID de la tienda en TiendaNube
 * @returns {Promise<Array>} Lista de productos
 */
export const getProductsFromTN = async (storeId = null) => {
  // TODO: Implementar llamada real a la API de TiendaNube
  // Ejemplo: GET https://api.tiendanube.com/v1/{store_id}/products

  console.log('🛍️  [TiendaNube] Obteniendo productos... (mock)');

  // Simulación de respuesta
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 12345,
          sku: 'PROD-002',
          name: 'Producto de ejemplo TN',
          price: 12000,
          stock: 15,
        },
      ]);
    }, 500);
  });
};

/**
 * Actualiza el stock de un producto en TiendaNube
 * @param {string} canal - Nombre del canal (TiendaNube)
 * @param {string} sku - SKU del producto
 * @param {number} newStock - Nuevo stock a establecer
 * @returns {Promise<Object>} Resultado de la actualización
 */
export const updateStock = async (canal, sku, newStock) => {
  // TODO: Implementar llamada real a la API de TiendaNube
  // Ejemplo: PUT https://api.tiendanube.com/v1/{store_id}/products/{product_id}/variants/{variant_id}
  // Body: { stock: newStock }

  console.log(`🛍️  [TiendaNube] Actualizando stock de ${sku} a ${newStock}... (mock)`);

  // Simulación de actualización
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Stock actualizado en TiendaNube: ${newStock} unidades`,
        sku,
        stock: newStock,
        canal,
        timestamp: new Date().toISOString(),
      });
    }, 300);
  });
};

/**
 * Obtiene el stock actual de un producto en TiendaNube
 * @param {string} canal - Nombre del canal
 * @param {string} sku - SKU del producto
 * @returns {Promise<number>} Stock actual
 */
export const getStock = async (canal, sku) => {
  // TODO: Implementar llamada real a la API de TiendaNube
  // Ejemplo: GET https://api.tiendanube.com/v1/{store_id}/products?sku={sku}

  console.log(`🛍️  [TiendaNube] Obteniendo stock de ${sku}... (mock)`);

  // Simulación: retornar un stock aleatorio para pruebas
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 50) + 1);
    }, 200);
  });
};

/**
 * Crea un nuevo producto en TiendaNube
 * @param {Object} productData - Datos del producto
 * @returns {Promise<Object>} Producto creado
 */
export const createProduct = async (productData) => {
  // TODO: Implementar creación real en TiendaNube
  console.log('🛍️  [TiendaNube] Creando producto... (mock)');

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Producto creado en TiendaNube',
        productId: Date.now(),
        ...productData,
      });
    }, 500);
  });
};

