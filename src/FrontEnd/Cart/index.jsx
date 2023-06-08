import React from 'react';
import Cart_LayOut from './Cart_LayOut';
import './index.css';

const Cart = ({ cartItems, onRemove, countCartItems, handlePayNow }) => {
  console.log(cartItems, "myCart");
  return (
    <>
      {cartItems.length === 0 ? (
        <img className="empty-cart-image" src="Images/cart.gif" alt="cart" />
      ) : (
        <Cart_LayOut data={cartItems} onRemove={onRemove} countCartItems={countCartItems} handlePayNow={handlePayNow} />
      )}
    </>
  );
};

export default Cart;
