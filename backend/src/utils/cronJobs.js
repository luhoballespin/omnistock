/**
 * Tareas programadas (Cron Jobs)
 * Sincronización automática de stock entre canales
 */

import cron from 'node-cron';
import * as syncService from '../services/syncService.js';

/**
 * Inicializa las tareas programadas
 */
export const initializeCronJobs = () => {
  // Sincronización automática cada 15 minutos
  // Formato: minuto hora día mes día-semana
  cron.schedule('*/15 * * * *', async () => {
    try {
      console.log('⏰ [Cron] Iniciando sincronización automática...');
      const result = await syncService.syncAllProducts();
      console.log('✅ [Cron] Sincronización completada:', {
        total: result.data.total,
        exitosos: result.data.exitosos,
        fallidos: result.data.fallidos,
      });
    } catch (error) {
      console.error('❌ [Cron] Error en sincronización automática:', error.message);
    }
  });

  console.log('⏰ Tareas programadas inicializadas (sincronización cada 15 minutos)');
};

/**
 * Sincronización diaria completa (ejecutar a las 2 AM)
 */
export const initializeDailySync = () => {
  cron.schedule('0 2 * * *', async () => {
    try {
      console.log('🌙 [Cron] Iniciando sincronización diaria completa...');
      const result = await syncService.syncAllProducts();
      console.log('✅ [Cron] Sincronización diaria completada');
    } catch (error) {
      console.error('❌ [Cron] Error en sincronización diaria:', error.message);
    }
  });
};

