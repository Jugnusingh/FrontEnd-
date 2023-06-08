import React from 'react';

const DownloadPage = ({ purchasedProductId, order, productPdf }) => {
  const handleDownload = () => {
    // Create a blob URL from the PDF data
    const blobUrl = URL.createObjectURL(productPdf);

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${purchasedProductId}.pdf`;

    // Trigger the download
    link.click();

    // Clean up the blob URL
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Order ID: {order.id}</p>
      <p>Amount: {order.amount}</p>
      <p>Payment Status: {order.status}</p>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default DownloadPage;
