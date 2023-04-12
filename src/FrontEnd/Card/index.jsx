import React from 'react'
import '../Card/Card.css'
function Card({ onAdd, productData }) {
    console.log(productData,"apni img")
    return (
        <div className='card-comp'>
            {productData.map((item) => {
                return (
                    <>
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img className="srcimg" src={`http://localhost:4000/uploads/${item.Image}`} alt="img"/>
                                    
                                </div>
                                <div className="flip-card-back">
                                    <h2>{item.Title}</h2>
                                    <h1>{item.Category}</h1>
                                    <h1 className="product-price"> ₹ {item.Price}/-</h1>
                                    <button onClick={() => onAdd(item)} className="buy-button">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default Card;