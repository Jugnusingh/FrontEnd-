import React, { useState, useEffect, useRef } from 'react';
import './Cart_LayOut.css';
import { MdDelete } from 'react-icons/md';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Link } from 'react-router-dom';

const Cart_LayOut = ({ data, onRemove, countCartItems, handlePayNow }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const totalAmount = data.reduce((total, { Price, qty }) => total + Price * qty, 0);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.willReadFrequently = true;
    }
  }, []);

  const handleClickRemove = (item) => {
    onRemove(item);
  };

  const handleClickPayNow = () => {
    if (isPolicyAccepted) {
      try {
        const productIds = data.map((item) => item._id).toString();
        const title = data.map((item) => item.Title).toString();
        const totalAmount = data.reduce((total, { Price, qty }) => total + Price * qty, 0);

        handlePayNow(totalAmount, productIds, title);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Please accept the cancellation policy before proceeding to buy.');
    }
  };

  const handleTogglePolicy = () => {
    setIsPolicyAccepted(!isPolicyAccepted);
  };

  return (
    <div className="cart-layout">
      <div className="cart-heading">Shopping Cart</div>
      <div className="cart-main">
        <div className="cart-left">
          <Scrollbars>
            {data.map((item) => (
              <div className="cart-item" key={item._id}>
                <img className="cart-image" src={`http://localhost:4000/uploads/${item.Image}`} alt="hosi" />
                <p className="cart-title">{item.Name}</p>
                <div className="cart-amount">
                  ₹ <span>{item.Price}</span>/-
                </div>
                <div className="cart-amount">
                  Qty <span>{item.qty}</span>
                </div>
                <div className="cart-amount">
                  Total <span>{item.Price * item.qty}</span>
                </div>
                <div className="cart-remove" onClick={() => handleClickRemove(item)}>
                  <MdDelete />
                </div>
              </div>
            ))}
          </Scrollbars>
        </div>
        <div className="cart-right">
          <h1>
            Subtotal <span>{countCartItems} items</span>
          </h1>
          <p>
            <span className="cart-total-amount">₹ {totalAmount}</span>
          </p>
          <button className="cart-btn" onClick={handleClickPayNow}>
            Proceed to Buy
          </button>
         
          {showMessage && <div className="cart-message">Added to Cart</div>}
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <label className="cart-checkbox-label">
        <input
          type="checkbox"
          checked={isPolicyAccepted}
          onChange={handleTogglePolicy}
        />
        <span className="cart-checkmark"></span>
        I accept the cancellation policy
      </label>
      <Link to="/CancellationPolicy" className="cart-cancellation-policy-link">
        Cancellation Policy
      </Link>
    </div>
  );
};

export default Cart_LayOut;
