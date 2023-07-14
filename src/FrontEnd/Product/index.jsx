import React, { useState } from 'react';
import Card from '../Card';
import './Product.css';

const Product = ({ productData, onAdd, categories }) => {
  const [filterProduct, setFilterProduct] = useState([]);

  const searchProduct = (item) => {
    const result = productData.filter((x) => x.Category === item);
    setFilterProduct(result);
  };

  return (
    <div>
      <div className='card-body'>
        <div className='card-left-body'>
          <h2>Assignment</h2>
          {categories.map((item) => (
            <div key={item.category}>
              <button className='btn-mca' onClick={() => searchProduct(item.category)}>
                {item.category}
              </button>
            </div>
          ))}
        </div>
          <div className='card-right-body'>
            <Card data={productData} onAdd={onAdd} filterProduct={filterProduct} />
          </div>
     
      </div>
    </div>
  );
};

export default Product;
