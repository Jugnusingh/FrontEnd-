import React, { useState } from 'react';
import axios from 'axios';
import "./SliderImage.css";
import AdminNavbar from '../adminNavbar';

const SliderImage = ({ images }) => {
  const [newImage, setNewImage] = useState({
    Title: '',
    Description: '',
    Image: null, // Update field name to 'Image'
  });

  const handleImageUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('Title', newImage.Title);
    formData.append('Description', newImage.Description);
    formData.append('Image', newImage.Image); // Use 'Image' instead of 'ImgUrl'

    try {

      const response = await axios.post('https://dalaltechnologies.in:4000/image', formData);

      console.log('Image uploaded successfully:', response.data.newImg);
      setNewImage({
        Title: '',
        Description: '',
        Image: null, // Reset Image field
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageDelete = async (imageId) => {
    try {

      const response = await axios.delete(`https://dalaltechnologies.in:4000/image/${imageId}`);

      console.log('Image deleted successfully:', response.data.deletedImage);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <>
    <AdminNavbar/>
    <div className="imageslider">
      {/* Form to add a new image */}
      <form onSubmit={handleImageUpload} className='imageslider-form'>
        <h2>Add New Image</h2>
        <input
          placeholder="Title"
          className='imageslider-input'
          type="text"
          id="Title"
          name="Title"
          value={newImage.Title}
          onChange={(e) => setNewImage({ ...newImage, Title: e.target.value })}
        /><br />
        <textarea
          placeholder='Description'
          className='imageslider-textarea'
          id="Description"
          name="Description"
          value={newImage.Description}
          onChange={(e) => setNewImage({ ...newImage, Description: e.target.value })}
        ></textarea><br />
        <input
          type="file"
          id="Image" // Use 'Image' as the field name
          name="Image" // Use 'Image' as the field name
          onChange={(e) => setNewImage({ ...newImage, Image: e.target.files[0] })} // Use 'Image' as the field name
        /><br />
        <button className='imageslider-button' type="submit">Upload Image</button>
      </form>
      {/* Display existing images */}
      {images.map((img) => (
        <div key={img._id} className='imageslider-image'>

          <img src={`https://dalaltechnologies.in:4000/uploads/${img.ImgUrl}`} alt={img.Title} />

          <button className='delete-button' onClick={() => handleImageDelete(img._id)}>Delete</button>
        </div>
      ))}
    </div>
    </>
  );
};

export default SliderImage;