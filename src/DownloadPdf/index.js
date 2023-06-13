import React from 'react';
import { saveAs } from 'file-saver';

const DownloadPage = ({ productData, orderData }) => {
  console.log(orderData)
  const handleDownload = (productId) => {
    const selectedOrder = orderData.find((order) => order.productId === productId);
    const selectedProduct = productData.find((product) => product.id === selectedOrder.productId);
    
    if (selectedOrder.status === 'paid') {
      const pdfBlob = new Blob([selectedProduct.pdfData], { type: 'application/pdf' });
      saveAs(pdfBlob, `${selectedProduct.title}.pdf`);
    } else {
      alert('Payment is required to download the PDF.');
    }
  };

  if (!orderData || orderData.length === 0) {
    return <div>No orders available.</div>;
  }

  return (
    <div>
      <h1>Download Page</h1>
      <table>
        <thead>
          <tr>
            <th>Product Title</th>
            <th>Order ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => (
            <tr key={order.id}>
              <td>{productData.find((product) => product.id === order.productId)?.title}</td>
              <td>{order.id}</td>
              <td>
                {order.status === 'paid' ? (
                  <button onClick={() => handleDownload(order.productId)}>Download PDF</button>
                ) : (
                  <span>Payment required</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DownloadPage;
