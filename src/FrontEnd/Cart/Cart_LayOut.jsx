import React, { useState, useEffect, useRef } from 'react';
import './Cart_LayOut.css';
import { MdDelete } from 'react-icons/md';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


const Cart_LayOut = ({ data, onRemove, countCartItems, handlePayNow }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
      if (!name || !email || !phone) {
        alert('Please fill in all fields.');
        return;
      }
  
      if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
  
      if (!validatePhone(phone)) {
        alert('Please enter a valid phone number.');
        return;
      }
  
      try {
        const products = data.map((item) => ({
          productId: item._id,
          productName: item.Title,
          totalAmount: item.Price * item.qty,
        }));
  
        Cookies.set('userData', { name, email, phone });
        // Call the handlePayNow function and pass the necessary data
        handlePayNow(products, name, email, phone);
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const validateEmail = (email) => {
    // Implement your email validation logic here
    // For example, a simple check for presence of '@' and '.'
    return email.includes('@') && email.includes('.');
  };

  const validatePhone = (phone) => {
    // Implement your phone number validation logic here
    // You can use regular expressions or other methods
    // For example, a simple check for length and numerical values
    return /^[0-9]+$/.test(phone) && phone.length === 10;
  };

  return (
    <>
      <div className='layout-div'>
        <div className='heading'>Shopping Cart</div>
        <div className="input-field-cart_layout">
          <input
            type="name"
            placeholder='Your Name'
            className='input-cart_layout'
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="email"
            placeholder='Email Id '
            className='input-cart_layout'
            value={email}
            onChange={handleEmailChange}
          />

          <input
            type="tel"
            placeholder='Mobile No '
            className='input-cart_layout'
            value={phone}
            onChange={handlePhoneChange}
          />

        </div>
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
                        <td><img className='left-div-image'  src={`https://dalaltechnologies.in:4000/uploads/${item.Image}`} alt='img' /></td>
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
        
            <button
              className="btn"
              onClick={handleClickPayNow}>
              Buy Now
            </button>
            <br></br> <br></br> <br></br>
            Pay to DalalTechnologies
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