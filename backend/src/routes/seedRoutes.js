/**
 * Rutas de Semilla (Seed)
 * Endpoint para generar datos de prueba
 */

import express from 'express';
import { seedProducts } from '../controllers/seedController.js';

const router = express.Router();

/**
 * @route   POST /api/seed
 * @desc    Generar productos de prueba usando Faker
 * @access  Public
 * @query   count (opcional, default: 10)
 */
router.post('/', seedProducts);

export default router;

