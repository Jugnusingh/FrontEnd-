import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../Admin/Dashboard/adminLeftBar/AdminSidebar';
import './Dashboard.css';

const AdminDashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://example-api.com/data');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <AdminSidebar />
      <section className="home-section">
        <div className="home-content">
          <div className="overview-boxes">
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Order</div>
                <div className="number">{data.totalOrders}</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt"></i>
                  <span className="text">Up from yesterday</span>
                </div>
              </div>
              <img className="bx bxs-cart-add cart two" src="./Images/order.png" alt="cart" />
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Sales</div>
                <div className="number">{data.totalSales}</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt"></i>
                  <span className="text">Up from yesterday</span>
                </div>
              </div>
              <img className="bx bxs-cart-add cart two" src="./Images/cart.png" alt="cart" />
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Earning </div>
                <div className="number">₹{data.totalEarning}</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt"></i>
                  <span className="text">Up from yesterday</span>
                </div>
              </div>
              <img className="bx bxs-cart-add cart two" src="./Images/rupee.png" alt="cart" />
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total View</div>
                <div className="number">{data.totalViews}</div>
                <div className="indicator">
                  <i className="bx bx-down-arrow-alt down"></i>
                  <span className="text">Down From Today</span>
                </div>
              </div>
              <img className="bx bxs-cart-add cart two" src="./Images/view.png" alt="cart" />
            </div>
          </div>
          <div className="sales-boxes">
            <div className="recent-sales box">
              <div className="title">Recent Sales</div>
              <div className="sales-details">
                {data.recentSales?.map((sale) => (
                  <div className="sale-item" key={sale.id}>
                    <span className="sale-item-name">{sale.productName}</span>
                    <span className="sale-item-amount">{sale.amount}</span>
                    <span className="sale-item-date">{sale.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
