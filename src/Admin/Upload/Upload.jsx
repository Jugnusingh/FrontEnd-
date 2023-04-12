import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../../Admin/Dashboard/adminLeftBar/AdminSidebar'
import "./Upload.css"
// import UploadBlogs from './UploadBlogs'
// import UploadProduct from './UploadProduct'

const Upload = () => {

  const navigate=useNavigate()
  const handleProduct=(e)=>{
    navigate('/UploadProduct')
  }
  const handleBlogs=(e)=>{
    navigate('/UploadBlogs')
  }

  return (
    <div>
      <AdminSidebar />
      <div className='upload-div'>
        <center>
          <div>
          <p>You can upolad your Product hare </p>
          <button className="btn-upload" onClick={handleProduct}>Product Upload</button>
          <button className="btn-upload" onClick={handleBlogs}>Blogs upload</button>
          </div>
        </center>
        </div></div>
    
  )
}

export default Upload