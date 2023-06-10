import React, { useEffect, useState } from 'react';
import AdminNavbar from '../adminNavbar';

const OrderManagement = () => {
  const [ordersData, setOrdersData] = useState([]);
console.log(ordersData,"manmani chal rhai hai teri ")
  useEffect(() => {
    // Fetch orders from the backend
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    // Make an API call to fetch orders from the backend
    // Example using fetch:
    fetch('http://localhost:4000/pay/orders')
      .then((response) => response.json())
      .then((data) => setOrdersData(data))
      .catch((error) => console.error('Error fetching orders:', error));
  };

  const handleDeleteOrder = (orderId) => {
    // Make an API call to delete the order
    // Example using fetch:
    fetch(`http://localhost:4000/pay/orders/${orderId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted order from the local state
          setOrdersData((prevOrders) =>
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
            <th>Product Title</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.title}</td>
              <td>{order.amount}</td>
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
