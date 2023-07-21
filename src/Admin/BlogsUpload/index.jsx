import React, { useState } from "react";
import axios from "axios";
import "./BlogUpload.css";
import AdminNavbar from "../adminNavbar";

const BlogUpload = ({ blogsData, setBlogs }) => {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [expandedBlogs, setExpandedBlogs] = useState([]);

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
        await axios.put(`http://203.123.33.138:4000/Blog/${selectedBlog._id}`, formData);
      } else {
        // Create new blog
        const response = await axios.post("http://203.123.33.138:4000/Blog", formData);
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
      await axios.delete(`http://203.123.33.138:4000/Blog/${blog._id}`);
      setBlogs(blogsData.filter((item) => item._id !== blog._id));
      resetForm();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleExpandBlog = (blogId) => {
    setExpandedBlogs((prevExpandedBlogs) => [...prevExpandedBlogs, blogId]);
  };

  const handleCollapseBlog = (blogId) => {
    setExpandedBlogs((prevExpandedBlogs) =>
      prevExpandedBlogs.filter((id) => id !== blogId)
    );
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
      <div className="blog-upload">
        <h2>Blog Upload</h2>
        <form onSubmit={handleBlogSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            className="blog-input"
            required
          />
          <textarea
            placeholder="Content"
            value={Content}
            onChange={(e) => setContent(e.target.value)}
            className="blog-input"
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
            required
          />
          <button type="submit" className="submit-btn">
            {selectedBlog ? "Update Blog" : "Add Blog"}
          </button>
          <button type="button" onClick={resetForm} className="cancel-btn">
            Cancel
          </button>
        </form>
        <div className="blog-list">
          <h2>Existing Blogs</h2>
          <div className="blog-items">
            {blogsData.map((blog) => (
              <div className="blog-item" key={blog._id}>
                <img
                  className="srcimg1"
                  src={`http://203.123.33.138:4000/uploads/${blog.Image}`}
                  alt="img"
                />
                <div className="blog-content">
                  <h3>{blog.Title}</h3>
                  {expandedBlogs.includes(blog._id) ? (
                    <div>
                      <p>{blog.Content}</p>
                      <button
                        className="show-less-btn"
                        onClick={() => handleCollapseBlog(blog._id)}
                      >
                        Show Less
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>{blog.Content.slice(0, 100)}...</p>
                      <button
                        className="show-more-btn"
                        onClick={() => handleExpandBlog(blog._id)}
                      >
                        Show More
                      </button>
                    </div>
                  )}
                </div>
                <div className="blog-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleBlogEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleBlogDelete(blog)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogUpload;
