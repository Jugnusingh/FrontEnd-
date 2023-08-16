import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ totalAmount, products, handlePayNow }) => {
  const [userData, setUserData] = useState({
    amount: totalAmount,
    productName: products.map((product) => product.Title).join(', '), // Set product names as a comma-separated string
    firstName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://secure.payu.in/_payment', {
        key: 'your_api_key',
        txnid: 'TXN123456789', // Replace with your unique transaction ID
        amount: userData.amount,
        productinfo: userData.productName,
        firstname: userData.firstName,
        email: userData.email,
        phone: userData.phone,
        surl: 'https://yourwebsite.com/payment_success', // Replace with your success URL
        furl: 'https://yourwebsite.com/payment_failure', // Replace with your failure URL
        service_provider: 'payu_paisa', // Replace with the service provider you want to use
      });

      if (response.data && response.data.status === 'success') {
        // Redirect the user to PayU's hosted checkout page
        window.location.href = response.data.redirect_url;
      } else {
        // Handle the case where the API response is not successful
        console.log('Payment initiation failed:', response.data);
        alert('Payment initiation failed. Please try again later.');
      }
    } catch (error) {
      // Handle API call errors
      console.error('Payment API Error:', error);
      alert('An error occurred while processing your payment. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <div>
        <label>Amount: </label>
        <input type="text" name="amount" value={userData.amount} onChange={handleChange} />
      </div>
      <div>
        <label>Product Name: </label>
        <input type="text" name="productName" value={userData.productName} onChange={handleChange} />
      </div>
      <div>
        <label>First Name: </label>
        <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
      </div>
      <div>
        <label>Email: </label>
        <input type="email" name="email" value={userData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Phone: </label>
        <input type="tel" name="phone" value={userData.phone} onChange={handleChange} />
      </div>
      <button onClick={handleSubmit}>Proceed to Pay</button>
    </div>
  );
};

export default PaymentForm;