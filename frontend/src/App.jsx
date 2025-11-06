/**
 * Componente principal de la aplicación
 */

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
  const [showProductForm, setShowProductForm] = useState(false);

  const handleAddProduct = () => {
    setShowProductForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onAddProduct={handleAddProduct} />
      <Routes>
        <Route 
          path="/" 
          element={
            <Dashboard 
              showProductForm={showProductForm}
              onCloseProductForm={() => setShowProductForm(false)}
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;

