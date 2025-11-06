/**
 * Componente Navbar
 * Barra de navegación principal
 */

import { Package, Plus, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { syncAll } from '../api/productApi';

const Navbar = ({ onAddProduct, onSync }) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const result = await syncAll();
      toast.success(result.message || 'Sincronización completada correctamente');
      if (onSync) onSync();
    } catch (error) {
      toast.error(error.message || 'Error al sincronizar');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">OmniStock</h1>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="btn btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar canales'}</span>
            </button>

            <button
              onClick={onAddProduct}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Agregar producto</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

