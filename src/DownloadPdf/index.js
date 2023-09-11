import React from 'react';
import { saveAs } from 'file-saver';
import './Downloadpdf.css'; // Import the CSS file for styling

const DownloadPage = ({ productData, myorders }) => {
  const handleDownload = (productId) => {
    const selectedOrder = myorders.find((order) => order.productName === productId);
    const selectedProduct = productData.find((product) => product.id === productId);

    if (selectedOrder && selectedOrder.paymentStatus === 'paid') {
      const pdfBlob = new Blob([selectedProduct.pdfData], { type: 'application/pdf' });
      saveAs(pdfBlob, `${selectedProduct.title}.pdf`);
    } else {
      alert('Payment is required to download the PDF.');
    }
  };

  if (!myorders || myorders.length === 0) {
    return <div>No orders available.</div>;
  }

  return (
    <div>
      <h1>Download your PDF </h1>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Title</th>
            <th>Your Name</th>
            <th>Your Email</th>
            <th>Your Phone</th>
          </tr>
        </thead>
        <tbody>
          {myorders.map((order) => {
            const product = productData.find((product) => product.id === order.productName);

            if (!product) {
              return null; // Skip if product not found
            }

            return (
              <tr key={order._id} className="fade-in">
                <td>{order._id}</td>
                <td>{product.title}</td>
                <td>{order.userName}</td>
                <td>{order.userEmail}</td>
                <td>{order.userPhone}</td>
                <td>
                  {order.paymentStatus === 'paid' ? (
                    <button onClick={() => handleDownload(order.productName)}>Download PDF</button>
                  ) : (
                    <span>Payment required</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DownloadPage;
