/**
 * Página Dashboard
 * Vista principal con tabla de productos y búsqueda
 */

import { useState, useEffect } from 'react';
import { Search, Package } from 'lucide-react';
import { toast } from 'react-toastify';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import SyncButton from '../components/SyncButton';
import { getProducts, seedProducts } from '../api/productApi';

const Dashboard = ({ showProductForm: externalShowForm, onCloseProductForm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');

  // Sincronizar con el estado externo del formulario
  useEffect(() => {
    if (externalShowForm) {
      setShowForm(true);
      setEditingProduct(null);
      if (onCloseProductForm) onCloseProductForm();
    }
  }, [externalShowForm, onCloseProductForm]);

  const channels = ['MercadoLibre', 'TiendaNube', 'Shopify', 'POS'];

  useEffect(() => {
    loadProducts();
  }, [searchTerm, selectedChannel]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedChannel) params.canal = selectedChannel;

      const response = await getProducts(params);
      setProducts(response.data || []);
    } catch (error) {
      toast.error(error.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormSuccess = () => {
    loadProducts();
  };

  const handleSyncComplete = () => {
    loadProducts();
  };

  const handleGenerateSeed = async () => {
    if (!window.confirm('¿Generar 10 productos de prueba? Esto no eliminará los productos existentes.')) {
      return;
    }

    try {
      await seedProducts(10);
      toast.success('Productos de prueba generados exitosamente');
      loadProducts();
    } catch (error) {
      toast.error(error.message || 'Error al generar productos de prueba');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Gestiona tu inventario omnicanal</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleGenerateSeed}
                className="btn btn-secondary text-sm"
              >
                Generar datos de prueba
              </button>
              <SyncButton onSyncComplete={handleSyncComplete} />
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="card mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar por nombre o SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="input w-full sm:w-48"
            >
              <option value="">Todos los canales</option>
              {channels.map((channel) => (
                <option key={channel} value={channel}>
                  {channel}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="card">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Productos</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div>
              <p className="text-sm text-gray-600">Con Stock</p>
              <p className="text-2xl font-bold text-green-600">
                {products.filter((p) => p.stock > 0).length}
              </p>
            </div>
          </div>
          <div className="card">
            <div>
              <p className="text-sm text-gray-600">Stock Bajo</p>
              <p className="text-2xl font-bold text-yellow-600">
                {products.filter((p) => p.stock > 0 && p.stock <= 10).length}
              </p>
            </div>
          </div>
          <div className="card">
            <div>
              <p className="text-sm text-gray-600">Sin Stock</p>
              <p className="text-2xl font-bold text-red-600">
                {products.filter((p) => p.stock === 0).length}
              </p>
            </div>
          </div>
        </div>

        {/* Tabla de productos */}
        {loading ? (
          <div className="card text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando productos...</p>
          </div>
        ) : (
          <ProductTable
            products={products}
            onEdit={handleEditProduct}
            onRefresh={loadProducts}
          />
        )}
      </div>

      {/* Modal de formulario */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;

