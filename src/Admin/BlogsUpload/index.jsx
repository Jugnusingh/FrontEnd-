import React, { useState } from "react";
import axios from "axios";
import "./BlogUpload.css";
import AdminNavbar from "../adminNavbar";

const BlogUpload = ({ blogsData, setBlogs }) => {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Image", Image);
    formData.append("Title", Title);
    formData.append("Content", Content);

    try {
      if (selectedBlog) {
        // Update existing blog
        await axios.put(`http://127.0.0.1:4000/Blog/${selectedBlog._id}`, formData);
      } else {
        // Create new blog
        const response = await axios.post("http://127.0.0.1:4000/Blog", formData);
        const newBlog = response.data;
        setBlogs([...blogsData, newBlog]); // Append new blog to the existing list
      }

      resetForm();
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  const handleBlogEdit = (blog) => {
    setSelectedBlog(blog);
    setTitle(blog.Title);
    setContent(blog.Content);
  };

  const handleBlogDelete = async (blog) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/Blog/${blog._id}`);
      setBlogs(blogsData.filter((item) => item._id !== blog._id));
      resetForm();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const resetForm = () => {
    setSelectedBlog(null);
    setTitle("");
    setContent("");
    setImage(null);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="blogUpload">
        <h2>Blog Upload</h2>
        <form onSubmit={handleBlogSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            value={Content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <input type="file" onChange={handleFileChange} required />
          <button type="submit">{selectedBlog ? "Update Blog" : "Add Blog"}</button>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        </form>
        <div className="blog-list">
          <h2>Existing Blogs</h2>
          {blogsData.map((blog) => (
            <div className="blog-item" key={blog._id}>
              <h3>Title: {blog.Title}</h3>
              <p>Content: {blog.Content}</p>
              <img
                className='srcimg'
                src={`http://localhost:4000/uploads/${blog.Image}`}
                alt='img'
              />
              <button type="button" onClick={() => handleBlogEdit(blog)}>
                Edit
              </button>
              <button type="button" onClick={() => handleBlogDelete(blog)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogUpload;
