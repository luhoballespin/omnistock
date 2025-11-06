/**
 * Componente SyncButton
 * Botón para sincronizar productos
 */

import { RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { syncAll } from '../api/productApi';

const SyncButton = ({ onSyncComplete }) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const result = await syncAll();
      toast.success(result.message || 'Sincronización completada correctamente');
      if (onSyncComplete) onSyncComplete();
    } catch (error) {
      toast.error(error.message || 'Error al sincronizar');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <button
      onClick={handleSync}
      disabled={isSyncing}
      className="btn btn-success flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <RefreshCw className={`h-5 w-5 ${isSyncing ? 'animate-spin' : ''}`} />
      <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar todos'}</span>
    </button>
  );
};

export default SyncButton;

