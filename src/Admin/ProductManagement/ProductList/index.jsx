import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';
import { Scrollbars } from 'react-custom-scrollbars-2';

const ProductList = ({ productData }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setProducts(productData);
  }, [productData]);

  const handleDelete = (productId) => {
    axios.delete(`http://127.0.0.1:4000/product/${productId}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const updatedProducts = products.filter((product) => product._id !== productId);
          setProducts(updatedProducts);
        } else {
          console.log('Failed to delete product');
        }
      })
      .catch((error) => {
        console.log('Error occurred while deleting product:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Scrollbars style={{ height: '400px' }}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.Title}</td>
                <td>{product.Category}</td>
                <td>{product.Price}</td>
                <td>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Scrollbars>
    </div>
  );
};

export default ProductList;
