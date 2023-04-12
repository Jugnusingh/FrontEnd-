import React, { useState,useEffect } from 'react';
import './CardSlider.css';
import "../../../src/index.css"

const CardSlider = ({ productData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(null);
  const nextSlide = () => {
    setCurrentSlide(currentSlide === productData.length - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? productData.length - 1 : currentSlide - 1);
  };
  useEffect(() => {
    // Start auto slide
    setAutoSlide(setInterval(() => {
      nextSlide();
    }, 3000));
    // Stop auto slide when the component unmounts
    return () => clearInterval(autoSlide);
  }, []);
  const handlePrevClick = () => {
    clearInterval(autoSlide);
    prevSlide();
  };
  const handleNextClick = () => {
    clearInterval(autoSlide);
    nextSlide();
  }
  return (
    <div className="product-card-slider">
      <button className="prev" onClick={prevSlide}>&#10094;</button>
      <button className="next" onClick={nextSlide}>&#10095;</button>
      <div className="slider-product">
        {productData.map((i, _id) => (
          <div className={_id === currentSlide ? 'slide-product active' : 'slide-product'} key={_id}>
            <img src={i.Image} alt={i.name} />
            <div className="product-details">
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default CardSlider;