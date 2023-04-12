import React,{useState} from 'react'
import AdminSidebar from '../../Admin/Dashboard/adminLeftBar/AdminSidebar'
import Upload from './Upload'
import "./UploadBlogs.css"
import axios from 'axios'

const UploadBlogs = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
  
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
  
      axios.post("http://localhost:4000/upload",
      {
          title,
          
          content,
       
          image
          

      })
      .then((res) => {
          console.log(res)
      })
      .catch(error => {
          console.log(error)
      })
}

    return (
        <>
            <AdminSidebar />
            <Upload/>
            <div className="upload_container">
               <center><h1> Blogs Upload</h1></center>
                <form onSubmit={handleSubmit}  >
                    <div className='dv-fm'>
                        <div className='fm-div'>
                            <div className="group">
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Title</label>
                            </div>
                            <div className="group">
                                <textarea className="textar" value={content} onChange={(e) => setContent(e.target.value)} placeholder='your message'></textarea>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                            </div>
                        </div>
                        <div className='upload-div'>
                            <h3>Upload Images </h3>
                            <div className="group">
                                <input type="file" id="image"  onChange={handleImageChange}  required />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                            </div>
                            <div>
                                <input className='button' type="submit" value="Submit"  />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UploadBlogs




  
  