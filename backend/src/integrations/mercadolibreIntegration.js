/**
 * Integración con MercadoLibre
 * Funciones para interactuar con la API de MercadoLibre (mock inicial)
 * 
 * En el futuro, aquí se implementará la conexión real con la API de MercadoLibre
 * usando OAuth2 y los endpoints oficiales de la API.
 */

/**
 * Obtiene productos desde MercadoLibre
 * @param {string} sellerId - ID del vendedor en MercadoLibre
 * @returns {Promise<Array>} Lista de productos
 */
export const getProductsFromML = async (sellerId = null) => {
  // TODO: Implementar llamada real a la API de MercadoLibre
  // Ejemplo: GET https://api.mercadolibre.com/users/{seller_id}/items/search

  console.log('📦 [MercadoLibre] Obteniendo productos... (mock)');

  // Simulación de respuesta
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'ML123456789',
          sku: 'PROD-001',
          title: 'Producto de ejemplo ML',
          price: 15000,
          available_quantity: 10,
        },
      ]);
    }, 500);
  });
};

/**
 * Actualiza el stock de un producto en MercadoLibre
 * @param {string} canal - Nombre del canal (MercadoLibre)
 * @param {string} sku - SKU del producto
 * @param {number} newStock - Nuevo stock a establecer
 * @returns {Promise<Object>} Resultado de la actualización
 */
export const updateStock = async (canal, sku, newStock) => {
  // TODO: Implementar llamada real a la API de MercadoLibre
  // Ejemplo: PUT https://api.mercadolibre.com/items/{item_id}
  // Body: { available_quantity: newStock }

  console.log(`📦 [MercadoLibre] Actualizando stock de ${sku} a ${newStock}... (mock)`);

  // Simulación de actualización
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Stock actualizado en MercadoLibre: ${newStock} unidades`,
        sku,
        stock: newStock,
        canal,
        timestamp: new Date().toISOString(),
      });
    }, 300);
  });
};

/**
 * Obtiene el stock actual de un producto en MercadoLibre
 * @param {string} canal - Nombre del canal
 * @param {string} sku - SKU del producto
 * @returns {Promise<number>} Stock actual
 */
export const getStock = async (canal, sku) => {
  // TODO: Implementar llamada real a la API de MercadoLibre
  // Ejemplo: GET https://api.mercadolibre.com/items/{item_id}

  console.log(`📦 [MercadoLibre] Obteniendo stock de ${sku}... (mock)`);

  // Simulación: retornar un stock aleatorio para pruebas
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 50) + 1);
    }, 200);
  });
};

/**
 * Crea un nuevo producto en MercadoLibre
 * @param {Object} productData - Datos del producto
 * @returns {Promise<Object>} Producto creado
 */
export const createProduct = async (productData) => {
  // TODO: Implementar creación real en MercadoLibre
  console.log('📦 [MercadoLibre] Creando producto... (mock)');

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Producto creado en MercadoLibre',
        productId: 'ML' + Date.now(),
        ...productData,
      });
    }, 500);
  });
};

