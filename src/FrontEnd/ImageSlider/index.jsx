import React, { useEffect, useState } from 'react';
import './ImageSlider.css';

const ImageSlider = ({images}) => {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex => (currentIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider">
      {images.map(({ ImgUrl, Title}, _id) => (
        <div key={_id} className={currentIndex === _id ? 'slide active' : 'slide'}>
          <img src={ImgUrl} alt={Title} />
          <h2>{Title}</h2>
        </div>
      ))}
    </div>
  );
};

  
export default ImageSlider;