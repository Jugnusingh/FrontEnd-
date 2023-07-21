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
      alert('Please accept the Term and Conditions policy before proceeding to buy.');
    }
  };

  const handleTogglePolicy = () => {
    setIsPolicyAccepted(!isPolicyAccepted);
  };
  return (
    <>
      <div className='layout-div'>
        <div className='heading'>Shopping Cart</div>
        <div className='main-div'>
          <div className='left-div'>
            <Scrollbars>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Prodcut</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td><img className='left-div-image' src={`http://203.123.33.138:4000/uploads/${item.Image}`} alt='hosi' /></td>
                        <td className='title-div'>{item.Title}</td>
                        <td className='amount-div'>₹ <span>{item.Price}/-</span></td>
                        <td className='amount-div'>Qty <span>{item.qty}</span></td>
                        <td className='amount-div'>Total <span>{item.Price * item.qty}</span></td>
                        <td className='remove-div' onClick={() => handleClickRemove(item)}>
                          <MdDelete />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
        <div className="cart-checkbox-div">
          <input
            type="checkbox"
            checked={isPolicyAccepted}
            onChange={handleTogglePolicy}
          />
          <p>I accept the Term and Conditions</p>
          <Link to="/CancellationPolicy" className="cart-cancellation-policy-link">
            Term and Conditions
          </Link>
        </div>
      </div>

    </>
  )
};
export default Cart_LayOut;
