import React, { useState, useEffect, useRef } from 'react';
import './Cart_LayOut.css';
import { MdDelete } from 'react-icons/md';
import { Scrollbars } from 'react-custom-scrollbars-2';

const Cart_LayOut = ({ data, onRemove, countCartItems, handlePayNow }) => {
  console.log(data,"my pdf path ")
  const [showMessage, setShowMessage] = useState(false);
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
  try {
    const productIds = data.map((item) => item._id)
    const title = data.map((item) => item.Title);
    const totalAmount = data.reduce((total, { Price, qty }) => total + Price * qty, 0);

    handlePayNow(totalAmount, productIds,title);
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
              <div className='items-div' key={item._id}>
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
                <div className='remove-div' onClick={() => handleClickRemove(item)}>
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
          <button className='btn' onClick={handleClickPayNow}>
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
