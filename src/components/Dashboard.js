import React from 'react';

const Dashboard = ({ products }) => {
  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum, product) => sum + Number(product.quantity), 0);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>Total Products: {totalProducts}</div>
      <div>Total Quantity: {totalQuantity}</div>
    </div>
  );
};

export default Dashboard;
