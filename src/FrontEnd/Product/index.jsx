import React, { useState } from 'react'
import Card from '../Card'
import './Product.css'

const Product = ({ productData, onAdd, cartMessage }) => {
  const [filterProduct, setfilterProduct] = useState([])
  const searchProduct = (item) => {
      const result = productData.filter((x) => x.Category === item) ;
    setfilterProduct(result)
  }
  return (
    <div>
      <div className='cart-message'>
        {cartMessage}
      </div>
      <div className='card-body'>
        <div className='card-left-body'>
          <h2>Assignment</h2>
          <button className='btn-mca' onClick={() => { searchProduct("MCA_New") }}>MCA-NEW</button>
          <ul>
            <li className='li-btn-mca' onClick={() => { searchProduct("MCA_New_1st-Sem") }}>1st-Sem</li>
            <li className='li-btn-mca' onClick={() => { searchProduct("MCA_New_2nd-Sem") }}>2nd-Sem</li>
            <li className='li-btn-mca' onClick={() => { searchProduct("MCA_New_3rd-Sem") }}>3rd-Sem</li>
            <li className='li-btn-mca' onClick={() => { searchProduct("MCA_New_4th-Sem") }}>4th-Sem</li>
          </ul>
          <button className='btn-mca' onClick={() => { searchProduct("BCA") }}>BCA</button>
          <ul>
            <li className='li-btn-mca' onClick={() => { searchProduct("BCA_1st-Sem") }}>1st-Sem</li>
            <li className='li-btn-mca' onClick={() => { searchProduct("BCA_2nd-Sem") }}>2nd-Sem</li>
            <li className='li-btn-mca' onClick={() => { searchProduct("BCA_3rd-Sem") }}>3rd-Sem</li>
            <li className='li-btn-mca' onClick={() => { searchProduct("BCA_4th-Sem") }}>4th-Sem</li>
            <li className='li-btn-mca' onClick={() => { searchProduct("BCA_5th-Sem") }}>5th-Sem</li>
            <li className='li-btn-mca' onClick={() => { searchProduct("BCA_6th-Sem") }}>6th-Sem</li>
          </ul>
          <button className='btn-mca' onClick={() => { searchProduct("PGDCA-NEW") }}>PGDCA-NEW</button>
          <ul>
            <li className='li-btn-mca' onClick={() => { searchProduct("PGDCA-NEW_1st-Sem") }}>1st-Sem</li>
            <li className='li-btn-mca' onClick={() => { searchProduct("PGDCA-NEW_2nd-Sem") }}>2nd-Sem</li>
          </ul>
          <button className='btn-mca' onClick={() => { searchProduct("MBA_Project") }}>MBA</button>
          <ul>
            <li className='li-btn-mca' onClick={() => { searchProduct("MBA_Project_1st-Sem") }}>1st-Sem</li>
            <li className='li-btn-mca' onClick={() => { searchProduct("MBA_Project_2nd-Sem") }}>2nd-Sem</li>
            <li className='li-btn-mca' onClick={() => { searchProduct("MBA_Project_3rd-Sem") }}>3rd-Sem</li>
            <li className='li-btn-mca' onClick={() => { searchProduct("MBA_Project_4th-Sem") }}>4th-Sem</li>
          </ul>
          <button className='btn-mca' onClick={() => { setfilterProduct(productData) }}>All</button>
          <h2>Project</h2>
          <button className='btn-mca' onClick={() => { searchProduct("MCA Project") }}>MCA-Project</button>
          <ul>
            <li>PhP</li>
            <li>Java</li>
            <li>NodeJS</li>
            <li>C++</li>
          </ul>
        </div>
        <div className='card-right-parent'>
          <div className='card-right-body'>
            <Card data={productData} onAdd={onAdd} filterProduct={filterProduct} cartMessage={cartMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product