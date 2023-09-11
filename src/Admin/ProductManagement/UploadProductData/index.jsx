import React, { useState } from 'react';
import "./UploadProductData.css";

const UploadProduct = ({ categories, updateProductData }) => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState("");
  const [Price, setPrice] = useState(0);
  const [Image, setImage] = useState("");
  const [Pdf, setPdf] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState(""); // Add submission message state
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Title', Title);
    formData.append('Description', Description);
    formData.append('Category', Category);
    formData.append('Price', Price);
    formData.append('image', Image);
    formData.append('pdf', Pdf);
  
    const url = 'https://dalaltechnologies.in:4000/product';
  
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      try {
        const data = await response.json();
        console.log('Product added successfully:', data);
        updateProductData(data.newProduct);
        setSubmissionMessage(data.message);
      } catch (error) {
        console.error('Error parsing JSON response:', error);
      }
    } else {
      try {
        const errorData = await response.json();
        console.error('Error adding product:', errorData.message);
        setSubmissionMessage(errorData.message);
      } catch (error) {
        console.error('Error parsing JSON error response:', error);
      }
    }
    
  };
  
  console.log('submissionMessage:', submissionMessage); // Log the submission message

  return (
    <div className='mainvalue'>
      <div className="upload_container ">
        <center><h1>Product Upload</h1></center>
        <form onSubmit={submitHandler}>
          <div className='dv-fm'>
            <div className='fm-div'>
              <div className="group">
                <input type="text" name='Title' onChange={(e) => setTitle(e.target.value)} />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Title</label>
              </div>
              <div className="group">
                <input type="number" name='Price' onChange={(e) => setPrice(e.target.value)} />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Price</label>
              </div>
              <div className="group">
                <textarea name='Description' className="textar" placeholder='Description' onChange={(e) => setDescription(e.target.value)}></textarea>
                <span className="highlight"></span>
                <span className="bar"></span>
              </div>
              <div className="select">
                <select value={Category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Select">Your Category</option>
                  {categories.map((item) => (
                    <option key={item._id} value={item.category}>
                      {item.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='upload-div'>
              <h3>Upload Images</h3>
              <div className="group">
                <input type="file" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                <span className="highlight"></span>
                <span className="bar"></span>
              </div>
              <h3>Upload Product Pdf</h3>
              <div className="group">
                <input type="file" name="pdf" accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} />
                <span className="highlight"></span>
                <span className="bar"></span>
              </div>
              <div>
                <input className='button' type="submit" value="Submit" />
                {submissionMessage && <p>{submissionMessage}</p>} {/* Display message if submissionMessage is not empty */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
