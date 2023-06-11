import React, { useEffect, useState } from 'react';
import AdminNavbar from '../adminNavbar';

const OrderManagement = () => {
  const [myorders, setOrders] = useState([]);
  console.log(myorders, "ordermanagement");
 
  


  useEffect(() => {
    // Fetch orders from the backend
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch('http://localhost:4000/pay/orders')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data.orderData);
        setOrders(data.orderData);
      })
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
      <AdminNavbar />
      <h2>Order Management</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Title</th>
            <th>Order Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {myorders.map((order) => (
           

            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.title}</td>
              <td>₹{order.amount}</td>
              <td>
                <button onClick={() => handleDeleteOrder(order._id)}>
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
