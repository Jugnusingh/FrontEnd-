import React from 'react'
import ProductList from '../ProductList'
import UploadProductData from '../UploadProductData'
import "./UploadManagement.css"
import AdminNavbar from '../../adminNavbar'
// import { Scrollbars } from 'react-custom-scrollbars-2';

const UploadManagement = ({ productData, categories }) => {
    return (
        <>
            <AdminNavbar />

            <div className='upload-management-container'>
                <div >
                    {/* <Scrollbars> */}
                    <ProductList productData={productData} />
                    {/* </Scrollbars> */}
                </div>

                <div className='update-list'>
                    <UploadProductData categories={categories} />
                </div>
            </div>
        </>
    );
}

export default UploadManagement