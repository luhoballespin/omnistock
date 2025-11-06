/**
 * Componente ProductTable
 * Tabla de productos con acciones
 */

import { Edit, Trash2, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteProduct, syncProduct } from '../api/productApi';

const ProductTable = ({ products, onEdit, onRefresh }) => {
  const [deletingSku, setDeletingSku] = useState(null);
  const [syncingSku, setSyncingSku] = useState(null);

  const handleDelete = async (sku) => {
    if (!window.confirm(`¿Estás seguro de eliminar el producto ${sku}?`)) {
      return;
    }

    setDeletingSku(sku);
    try {
      await deleteProduct(sku);
      toast.success('Producto eliminado exitosamente');
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error(error.message || 'Error al eliminar producto');
    } finally {
      setDeletingSku(null);
    }
  };

  const handleSync = async (sku) => {
    setSyncingSku(sku);
    try {
      const result = await syncProduct(sku);
      toast.success(result.message || 'Producto sincronizado exitosamente');
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error(error.message || 'Error al sincronizar producto');
    } finally {
      setSyncingSku(null);
    }
  };

  const getStockBadgeClass = (stock) => {
    if (stock === 0) return 'bg-red-100 text-red-800';
    if (stock <= 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getCanalBadgeClass = (canal) => {
    const colors = {
      MercadoLibre: 'bg-blue-100 text-blue-800',
      TiendaNube: 'bg-purple-100 text-purple-800',
      Shopify: 'bg-green-100 text-green-800',
      POS: 'bg-gray-100 text-gray-800',
    };
    return colors[canal] || 'bg-gray-100 text-gray-800';
  };

  if (!products || products.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 text-lg">No hay productos disponibles</p>
        <p className="text-gray-400 text-sm mt-2">Agrega tu primer producto para comenzar</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Canales
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.sku} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.sku}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{product.nombre}</div>
                  {product.descripcion && (
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {product.descripcion}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${product.precio?.toLocaleString('es-AR')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockBadgeClass(
                      product.stock
                    )}`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {product.canal && product.canal.length > 0 ? (
                      product.canal.map((canal) => (
                        <span
                          key={canal}
                          className={`px-2 py-1 text-xs font-medium rounded ${getCanalBadgeClass(
                            canal
                          )}`}
                        >
                          {canal}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">Sin canales</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleSync(product.sku)}
                      disabled={syncingSku === product.sku}
                      className="text-primary-600 hover:text-primary-900 disabled:opacity-50"
                      title="Sincronizar"
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${syncingSku === product.sku ? 'animate-spin' : ''}`}
                      />
                    </button>
                    <button
                      onClick={() => onEdit(product)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.sku)}
                      disabled={deletingSku === product.sku}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;

