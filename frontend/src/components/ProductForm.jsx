/**
 * Componente ProductForm
 * Formulario para crear/editar productos
 */

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createProduct, updateProduct } from '../api/productApi';

const ProductForm = ({ product, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    sku: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    canal: [],
    imagen: '',
  });
  const [loading, setLoading] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState([]);

  const channels = ['MercadoLibre', 'TiendaNube', 'Shopify', 'POS'];

  useEffect(() => {
    if (product) {
      setFormData({
        sku: product.sku || '',
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        precio: product.precio?.toString() || '',
        stock: product.stock?.toString() || '',
        canal: product.canal || [],
        imagen: product.imagen || '',
      });
      setSelectedChannels(product.canal || []);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChannelToggle = (channel) => {
    setSelectedChannels((prev) => {
      if (prev.includes(channel)) {
        return prev.filter((c) => c !== channel);
      } else {
        return [...prev, channel];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        canal: selectedChannels,
      };

      if (product) {
        await updateProduct(product.sku, data);
        toast.success('Producto actualizado exitosamente');
      } else {
        await createProduct(data);
        toast.success('Producto creado exitosamente');
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      const errorMessage = error.errors
        ? error.errors.map((e) => e.message).join(', ')
        : error.message || 'Error al guardar producto';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
                disabled={!!product}
                className={`input ${product ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                placeholder="PROD-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="input"
                placeholder="Nombre del producto"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
              className="input"
              placeholder="Descripción del producto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="input"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="input"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Canales
            </label>
            <div className="flex flex-wrap gap-2">
              {channels.map((channel) => (
                <button
                  key={channel}
                  type="button"
                  onClick={() => handleChannelToggle(channel)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    selectedChannels.includes(channel)
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                  }`}
                >
                  {channel}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de Imagen
            </label>
            <input
              type="url"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              className="input"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Guardando...' : product ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

