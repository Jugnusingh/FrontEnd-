import React, { useState } from 'react'
import Card from '../Card'
import './Product.css'

const Product = ({ productData, onAdd, categories }) => {
  const [filterProduct, setfilterProduct] = useState([])
  const searchProduct = (item) => {
    const result = productData.filter((x) => x.Category === item);
    setfilterProduct(result)
  }
  return (
    <div>
      
      <div className='card-body'>
        <div className='card-left-body'>
          <h2>Assignment</h2>
          {
            categories.map((item) => {
              // <button>{item.category}</button>
              return (
                <div>
                <button className='btn-mca' onClick={() => { searchProduct(item.category) }}>{item.category}</button>
                </div>
              )
            })
          }

        </div>


        <div className='card-right-parent'>
          <div className='card-right-body'>
            <Card data={productData} onAdd={onAdd} filterProduct={filterProduct}  />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product