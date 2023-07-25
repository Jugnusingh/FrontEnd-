import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageSlider = ({ image }) => { // <- Add curly braces around 'images'
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % image.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [image.length]);

  return (
    <div className="imageslider">
      {image.map((image, index) => (
        <img className='slider-mg'
          key={index}
          src={image.ImgUrl}
          alt={image.Title}
          style={{ display: index === currentSlide ? 'block' : 'none' }}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
