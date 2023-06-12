import React, { useEffect, useState } from 'react';
import AdminNavbar from '../adminNavbar';
import './OrderManagement.css'; // Import the CSS file for the component

const OrderManagement = ({ myorders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(myorders);

  useEffect(() => {
    const filtered = myorders.filter((order) => {
      const title = order.title ? order.title.toLowerCase() : '';
      const orderId = order._id ? order._id.toLowerCase() : '';
      return (
        title.includes(searchTerm.toLowerCase()) ||
        orderId.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredOrders(filtered);
  }, [searchTerm, myorders]);

  const formatIndianDate = (dateString) => {
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return new Date(dateString).toLocaleString('en-IN', options);
  };

  return (
    <div>
      <AdminNavbar />
      <h2>Order Management</h2>
      <input
        type="text"
        placeholder="Search by title or Order ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="order-table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="fade-in">
                <td>{order._id}</td>
                <td>{order.title}</td>
                <td>₹{order.amount}</td>
                <td>{order.status}</td>
                <td>{formatIndianDate(order.createdAt)}</td>
                <td>
                  <button>Refund</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
