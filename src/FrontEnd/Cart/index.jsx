import React from 'react'
import Cart_LayOut from './Cart_LayOut'
import './index.css'
const Cart = ({ cartItems,onRemove,countCartItems}) => {
  console.log(cartItems,"myCart")
  return (
    <div>
      {
        cartItems.length === 0 ? <div>
          <img className='empty-cart-image' src='Images/cart.gif' alt='cart'  />
          </div> : <div><Cart_LayOut data={cartItems} onRemove={onRemove} countCartItems={countCartItems} /></div>
      }



    </div>

  )
}

export default Cart

