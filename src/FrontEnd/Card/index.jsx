import React, { useState } from 'react';
import './Card.css';

function Card({ onAdd, data, filterProduct }) {
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (item) => {
    onAdd(item);
    setAddedToCart({ [item._id]: true });
    setTimeout(() => setAddedToCart({}), 2000); // clear message after 2 seconds
  };

  return (
    <div className='card-comp'>
      {filterProduct.length ? (
        filterProduct.map((item) => (
          <div className='flip-card' key={item._id}>
            <div className='flip-card-inner'>
              <div className='flip-card-front'>
                <img
                  className='srcimg'
                  src={`https://dalaltechnologies.in:4000/uploads/${item.Image}`}
                  alt='img'
                />
              </div>
              <div className='flip-card-back'>
                <h3>{item.Title}</h3>
                <h2>{item.Category}</h2>
                {item.subcategory && <h5>{item.subcategory}</h5>}
                <h2 className='product-price'>₹ {item.Price}/-</h2>
                <button
                  onClick={() => handleAddToCart(item)}
                  className='buy-button'>
                  Add To Cart
                </button>
                {addedToCart[item._id] && (
                  <p style={{ color: 'white' }}>Added to cart!</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        data.map((item) => (
          <div className='flip-card' key={item._id}>
            <div className='flip-card-inner'>
              <div className='flip-card-front'>
                <img
                  className='srcimg'
                  src={`https://dalaltechnologies.in:4000/uploads/${item.Image}`}
                  alt='img'
                />
              </div>
              <div className='flip-card-back'>
                <h3>{item.Title}</h3>
                <h2>{item.Category}</h2>
                <h1 className='product-price'>₹ {item.Price}/-</h1>
                <button
                  onClick={() => handleAddToCart(item)}
                  className='buy-button'>
                  Add To Cart
                </button>
                {addedToCart[item._id] && (
                  <p style={{ color: 'white' }}>Added to cart!</p>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Card;
