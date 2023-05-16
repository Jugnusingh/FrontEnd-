import React, { useEffect, useState } from 'react';
import AdminNavbar from '../adminNavbar';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the backend
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    // Make an API call to fetch orders from the backend
    // Example using fetch:
    fetch('/api/orders')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  };

  const handleDeleteOrder = (orderId) => {
    // Make an API call to delete the order
    // Example using fetch:
    fetch(`/api/orders/${orderId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted order from the local state
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order.id !== orderId)
          );
        } else {
          console.error('Error deleting order');
        }
      })
      .catch((error) => console.error('Error deleting order:', error));
  };

  return (
    <div>
      <AdminNavbar/>
      <h2>Order Management</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.total}</td>
              <td>
                <button onClick={() => handleDeleteOrder(order.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
