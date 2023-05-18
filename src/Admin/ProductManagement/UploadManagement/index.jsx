import React from 'react'
import ProductList from '../ProductList'
import UploadProductData from '../UploadProductData'
import "./UploadManagement.css"
import AdminNavbar from '../../adminNavbar'

const UploadManagement = ({ productData, categories }) => {
    return (
        <>
            <AdminNavbar />
            <div className="upload-management-container">
                <div className='update-list'>
                    <ProductList productData={productData} />
                </div>
                <div>
                    <UploadProductData categories={categories} />
                </div>
            </div>
        </>
    );
}

export default UploadManagement