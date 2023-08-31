import React, { useEffect, useState } from 'react';
import AdminNavbar from '../adminNavbar';
import './OrderManagement.css'; // Import the CSS file for the component

const OrderManagement = ({ myorders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(myorders);

  useEffect(() => {
    const filtered = myorders.filter((order) => {
      const orderId = order._id ? order._id.toLowerCase() : '';
      return orderId.includes(searchTerm.toLowerCase());
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
        placeholder="Search by Order ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="order-table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Phone</th>
              <th>Payment Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="fade-in">
                <td>{order._id}</td>
                <td>{order.productName}</td>
                <td>{order.userName}</td>
                <td>{order.userEmail}</td>
                <td>{order.userPhone}</td>
                <td>{order.paymentStatus}</td>
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
