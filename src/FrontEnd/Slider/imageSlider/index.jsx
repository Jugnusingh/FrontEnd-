import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios.get('http://127.0.0.1:4000/image')
      .then(response => {
        setImages(response.data.imageData);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="imageslider">
      {images.map((image, index) => (
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
