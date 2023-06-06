import React, { useState, useEffect, useRef } from 'react';
import './Cart_LayOut.css';
import { MdDelete } from 'react-icons/md';
import { Scrollbars } from 'react-custom-scrollbars-2';
import axios from 'axios';

const Cart_LayOut = ({ data, onRemove, countCartItems }) => {
  const [showMessage, setShowMessage] = useState(false);
  const totalAmount = data.reduce((total, { Price, qty }) => total + Price * qty, 0);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.willReadFrequently = true;
    }
  }, []);

  const initPayment = async (data) => {
    const options = {
      key: "rzp_test_LLTSrqLmpUtsIx",
      amount: totalAmount * 100, // Convert to paise
      currency: 'INR',
      order_id: data.id, // Make sure data contains the correct id field
      handler: async (response) => {
        console.log(response, "yyy");
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
        console.log(razorpay_signature, "razorpay_signature hai ");
        try {
          const verifyUrl = "http://localhost:4000/Pay/verify";
          const verificationResponse = await axios.post(verifyUrl, {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          });
          console.log(verificationResponse.data);
        } catch (error) {
          console.log(error, "error occurred");
        }
      },
      theme: {
        "color": "#121212"
    }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  
  const handlePayNow = async () => {
    try {
      const orderUrl = "http://localhost:4000/Pay/orders";
      const orderResponse = await axios.post(orderUrl, { amount: totalAmount });
      console.log(orderResponse.data,"order mai kya aaya 43");
      initPayment(orderResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='layout-div'>
      <div className='heading'>Shopping Cart</div>
      <div className='main-div'>
        <div className='left-div'>
          <Scrollbars>
            {data.map((item) => (
              <div className='items-div' key={item.id}>
                <img className='left-div-image' src={`http://localhost:4000/uploads/${item.Image}`} alt='hosi' />
                <p className='title-div'>{item.Name}</p>
                <div className='amount-div'>
                  ₹ <span>{item.Price}</span>/-
                </div>
                <div className='amount-div'>
                  Qty <span>{item.qty}</span>
                </div>
                <div className='amount-div'>
                  Total <span>{item.Price * item.qty}</span>
                </div>
                <div className='remove-div' onClick={() => onRemove(item)}>
                  <MdDelete />
                </div>
              </div>
            ))}
          </Scrollbars>
        </div>
        <div className='right-div'>
          <h1>
            Subtotal <span>{countCartItems} items</span>
          </h1>
          <p>
            <span>₹ {totalAmount}</span>
          </p>
          <button className='btn' onClick={handlePayNow}>
            Proceed to Buy
          </button>
          {showMessage && <div>Added to Cart</div>}
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default Cart_LayOut;
