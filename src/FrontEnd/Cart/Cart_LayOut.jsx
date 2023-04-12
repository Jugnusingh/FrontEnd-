import React, { useState } from 'react'
import './Cart_LayOut.css'
import { MdDelete } from 'react-icons/md';
import { Scrollbars } from "react-custom-scrollbars-2";

const Cart_LayOut = ({ data,onRemove, countCartItems }) => {
    const totalAmount=  data.reduce((total,item)=>total+item.Price*item.qty,0)
    return (
        <>
            <div className='layout-div'>
                <div className='heading'>Shopping Cart</div>
                <div className='main-div'>
                    <div className='left-div'>
                        <Scrollbars>
                            {data.map((curElemt) => {
                                return (
                                    <>
                                        <div className='items-div' key={curElemt.id}>
                                            <img className='left-div-image' src={curElemt.Image} alt='hosi' />
                                            <p className='title-div'>{curElemt.Name}</p>
                                            <div className='amount-div'> ₹ <span>{curElemt.Price}</span>/-</div>
                                            <div className='amount-div'> Qty <span>{curElemt.qty}</span></div>
                                            <div className='amount-div'> Total <span>{curElemt.Price * curElemt.qty}</span></div>
                                            <div className='remove-div' onClick={() => {onRemove(curElemt)}} >{<MdDelete />}</div>
                                        </div>
                                        <hr className='line-div'></hr>
                                    </>
                                )
                            })}
                        </Scrollbars>
                    </div>
                    <div className='right-div'>
                        <h1>Subtotal <span>{countCartItems} items</span></h1>
                        <p> <span> {totalAmount} </span></p>
                        <button className='btn'> Proceed to Buy</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart_LayOut;