/**
 * Middleware de manejo de errores
 * Captura y formatea errores de manera consistente
 */

/**
 * Middleware para manejar errores de la aplicación
 * @param {Error} err - Objeto de error
 * @param {Request} req - Objeto de solicitud Express
 * @param {Response} res - Objeto de respuesta Express
 * @param {Function} next - Función next de Express
 */
export const errorHandler = (err, req, res, next) => {
  // Log del error en consola (en desarrollo)
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', err);
  }

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors: errors,
    });
  }

  // Error de duplicado (unique constraint)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      message: `El ${field} ya existe`,
      error: `${field} duplicado`,
    });
  }

  // Error de Cast (ID inválido)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'ID inválido',
      error: 'Formato de ID incorrecto',
    });
  }

  // Error personalizado con código de estado
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message || 'Error en la solicitud',
      error: err.name || 'Error',
    });
  }

  // Error genérico del servidor
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : 'Error interno',
  });
};

/**
 * Middleware para manejar rutas no encontradas (404)
 * @param {Request} req - Objeto de solicitud Express
 * @param {Response} res - Objeto de respuesta Express
 * @param {Function} next - Función next de Express
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    error: 'Not Found',
  });
};

