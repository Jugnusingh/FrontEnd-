import React from 'react';
import Cart_LayOut from './Cart_LayOut';
import './index.css';

const Cart = ({ cartItems, onRemove, countCartItems }) => {
  console.log(cartItems, "myCart");

  return (
    <>
      {cartItems.length === 0 ? (
        <img className="empty-cart-image" src="Images/cart.gif" alt="cart" />
      ) : (
        <Cart_LayOut data={cartItems} onRemove={onRemove} countCartItems={countCartItems} />
      )}
    </>
  );
};

export default Cart;
