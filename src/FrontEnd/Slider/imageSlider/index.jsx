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
<<<<<<< HEAD
        
         src={`http://203.123.33.138:4000/uploads/${image.ImgUrl}`}
=======
         src={`http://localhost:4000/uploads/${image.ImgUrl}`}
>>>>>>> e80122d (we are try to hosting)
          alt={image.Title}
          style={{ display: index === currentSlide ? 'block' : 'none' }}
        />
      ))}
    </div>
  );
};

export default ImageSlider;