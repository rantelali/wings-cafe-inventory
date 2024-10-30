import React, { useState } from 'react';

const StockManagement = ({ products, setProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityChange, setQuantityChange] = useState('');
  const [message, setMessage] = useState('');

  const availableProducts = products.filter(product => Number(product.quantity) >= 0);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setQuantityChange('');
    setMessage('');
  };

  const handleUpdateStock = () => {
    if (selectedProduct) {
      const change = Number(quantityChange);

      // Validate that the change is a valid positive number
      if (change === 0) {
        setMessage("Quantity change must be a non-zero number.");
        return;
      }

      const newQuantity = Number(selectedProduct.quantity) + change;

      const updatedProducts = products.map(product => {
        if (product.name === selectedProduct.name) {
          return { ...product, quantity: newQuantity };
        }
        return product;
      });

      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setMessage(`Stock updated for ${selectedProduct.name}. New quantity: ${newQuantity}`);
      setSelectedProduct(null);
      setQuantityChange('');
    }
  };

  const filteredProducts = availableProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Stock Management</h2>
      <input
        type="text"
        placeholder="Search by product name"
        value={searchTerm}
        onChange={handleSearch}
      />
      {message && <p>{message}</p>}
      
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div>
          <h3>Current Stock</h3>
          {filteredProducts.map((product, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <span>{product.name} - Quantity: {product.quantity}</span>
              <button onClick={() => handleSelectProduct(product)} style={{ marginLeft: '10px' }}>
                Adjust Stock
              </button>
            </div>
          ))}
        </div>
      )}
      
      {selectedProduct && (
        <div>
          <h4>Adjust Stock for {selectedProduct.name}</h4>
          <input
            type="number"
            value={quantityChange}
            onChange={(e) => setQuantityChange(e.target.value)}
            placeholder="Change quantity"
          />
          <button onClick={handleUpdateStock}>Update Stock</button>
        </div>
      )}
      <style jsx>{`
        button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #2980b9;
        }

        input[type="number"] {
          margin-left: 10px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        input[type="text"] {
          margin-bottom: 10px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
        }

        p {
          color: #e74c3c;
        }
      `}</style>
    </div>
  );
};

export default StockManagement;
