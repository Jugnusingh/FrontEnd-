import React, { useState } from 'react';
import './Cart_LayOut.css';
import { MdDelete } from 'react-icons/md';
import { Scrollbars } from 'react-custom-scrollbars-2';

const Cart_LayOut = ({ data, onRemove, countCartItems, onAdd }) => {
  const [showMessage, setShowMessage] = useState(false);
  const totalAmount = data.reduce((total, { Price, qty }) => total + Price * qty, 0);
  const handleAddToCart = (item) => {
    setShowMessage(true);
    onAdd(item);
  };

  const handlePayNow = () => {
    const options = {
      key: 'YOUR_PAYUMONEY_KEY',
      amount: totalAmount * 100, // PayUMoney accepts amount in paisa, so multiply by 100
      currency: 'INR',
      name: 'DalalTechnologies',
      description: 'Payment for items purchased on My Online  Assignment',
      image: 'https://DalalTechnologies.com/logo.png',
      order_id: 'UNIQUE_ORDER_ID',
      callback_url: 'https://www.example.com/payumoney/success',
      cancel_url: 'https://www.example.com/payumoney/cancel',
    };

    const form = document.createElement('form');
    form.setAttribute('action', 'https://sandboxsecure.payu.in/_payment');
    form.setAttribute('method', 'POST');

    Object.keys(options).forEach((key) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', options[key]);
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
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
            <span>{totalAmount}</span>
          </p>
          <button className='btn' onClick={handlePayNow}>
            Proceed to Buy
          </button>
          {showMessage && <div>Added to Cart</div>}
        </div>
      </div>
    </div>
  );
};

export default Cart_LayOut;
