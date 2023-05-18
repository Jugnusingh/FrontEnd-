import React, { useState } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = ({ productData }) => {
  const [products, setProducts] = useState(productData);

  const handleDelete = (productId) => {
    axios.delete(`http://127.0.0.1:4000/product/${productId}`)
      .then((response) => {
        if (response.status === 200) {
          // If the deletion was successful, update the products state
          const updatedProducts = products.filter((product) => product._id !== productId);
          setProducts(updatedProducts);
        } else {
          // Handle the error case
          console.log('Failed to delete product');
        }
      })
      .catch((error) => {
        // Handle the error case
        console.log('Error occurred while deleting product:', error);
      });
  };

  return (
    <>
      <div className="product-list-container">
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
            {productData.map((product) => (
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
      </div>
    </>
  );
};

export default ProductList;
