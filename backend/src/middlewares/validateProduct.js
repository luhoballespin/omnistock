/**
 * Middleware de validación para productos
 * Valida los campos requeridos y formatos antes de procesar la solicitud
 */

import { body, validationResult } from 'express-validator';

/**
 * Reglas de validación para crear/actualizar productos
 */
export const validateProduct = [
  // Validar SKU
  body('sku')
    .trim()
    .notEmpty()
    .withMessage('El SKU es requerido')
    .isLength({ min: 1, max: 50 })
    .withMessage('El SKU debe tener entre 1 y 50 caracteres')
    .matches(/^[A-Z0-9-_]+$/)
    .withMessage('El SKU solo puede contener letras mayúsculas, números, guiones y guiones bajos'),

  // Validar nombre
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 1, max: 200 })
    .withMessage('El nombre debe tener entre 1 y 200 caracteres'),

  // Validar descripción (opcional)
  body('descripcion')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('La descripción no puede exceder 1000 caracteres'),

  // Validar precio
  body('precio')
    .notEmpty()
    .withMessage('El precio es requerido')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo'),

  // Validar stock
  body('stock')
    .notEmpty()
    .withMessage('El stock es requerido')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero positivo o cero'),

  // Validar canal (opcional, pero si existe debe ser un array)
  body('canal')
    .optional()
    .isArray()
    .withMessage('El canal debe ser un array')
    .custom((value) => {
      if (Array.isArray(value)) {
        return value.every(item => typeof item === 'string' && item.trim().length > 0);
      }
      return false;
    })
    .withMessage('Todos los elementos del canal deben ser strings no vacíos'),

  // Validar imagen (opcional)
  body('imagen')
    .optional()
    .trim()
    .isURL()
    .withMessage('La imagen debe ser una URL válida'),

  // Middleware para verificar resultados de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }
    next();
  },
];

/**
 * Reglas de validación para actualizar stock
 */
export const validateStockUpdate = [
  body('stock')
    .notEmpty()
    .withMessage('El stock es requerido')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero positivo o cero'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }
    next();
  },
];

/**
 * Reglas de validación para sincronización
 */
export const validateSync = [
  body('sku')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El SKU no puede estar vacío si se proporciona'),

  body('canal')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El canal no puede estar vacío si se proporciona'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: errors.array(),
      });
    }
    next();
  },
];

