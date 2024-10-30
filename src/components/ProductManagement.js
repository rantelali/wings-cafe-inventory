import React, { useState } from 'react';

const ProductManagement = ({ products, setProducts }) => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleAddOrEditProduct = (e) => {
    e.preventDefault();

    if (!productName || !productCategory || !productPrice || !productQuantity) {
      setMessage('All fields are required.');
      return;
    }

    const newProduct = {
      name: productName,
      category: productCategory,
      price: productPrice,
      quantity: productQuantity,
    };

    if (isEditing) {
      const updatedProducts = products.map(product =>
        product.name === currentProduct.name ? newProduct : product
      );
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setMessage('Product updated successfully.');
    } else {
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setMessage('Product added successfully.');
    }

    // Clear the form fields
    clearForm();
  };

  const handleEdit = (product) => {
    setProductName(product.name);
    setProductCategory(product.category);
    setProductPrice(product.price);
    setProductQuantity(product.quantity);
    setIsEditing(true);
    setCurrentProduct(product);
  };

  const handleDelete = (productName) => {
    const updatedProducts = products.filter(product => product.name !== productName);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    clearForm();
  };

  const handleSell = (productName) => {
    const product = products.find(product => product.name === productName);
    const quantityToSell = prompt(`Enter quantity to sell for ${productName}:`);
    
    if (quantityToSell) {
      const quantity = Number(quantityToSell);
      if (quantity <= 0) {
        setMessage('Quantity must be greater than zero.');
        return;
      }
      if (quantity > product.quantity) {
        setMessage('Not enough stock to sell.');
        return;
      }

      const updatedProducts = products.map(prod => {
        if (prod.name === productName) {
          return { ...prod, quantity: prod.quantity - quantity };
        }
        return prod;
      });

      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setMessage(`Sold ${quantity} of ${productName}.`);
    }
  };

  const clearForm = () => {
    setProductName('');
    setProductCategory('');
    setProductPrice('');
    setProductQuantity('');
    setIsEditing(false);
    setCurrentProduct(null);
  };

  return (
    <div>
      <style>
        {`
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #2980b9;
            color: white;
          }
          button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 8px 14px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
          }
          button:hover {
            background: #2980b9;
          }
        `}
      </style>

      <h2>Product Management</h2>
      <form onSubmit={handleAddOrEditProduct} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
          required
        />
        <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
      </form>
      {message && <p>{message}</p>}

      <h3>Product List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.name}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.name)}>Delete</button>
                <button onClick={() => handleSell(product.name)}>Sell</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
