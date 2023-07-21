import React, { useState } from "react";
import "./Blog.css";

const API_BASE_URL = "http://203.123.33.138:4000"; // Set your backend API URL here

const Blog = ({ blogsData }) => {
  const [expandedBlogs, setExpandedBlogs] = useState([]);

  const handleExpandBlog = (blogId) => {
    setExpandedBlogs((prevExpandedBlogs) => [...prevExpandedBlogs, blogId]);
  };

  const handleCollapseBlog = (blogId) => {
    setExpandedBlogs((prevExpandedBlogs) =>
      prevExpandedBlogs.filter((id) => id !== blogId)
    );
  };

  return (
    <div className="blog-list">
      <h1>Blogs</h1>

      {blogsData.map((blog) => (
        <div className="blog-item" key={blog._id}>
          <div className="blog-header">
            <h3 className="blog-title">{blog.Title}</h3>
            <img
              className="blog-image"
              src={`${API_BASE_URL}/uploads/${blog.Image}`}
              alt="img"
            />
          </div>
          <div className="blog-content">
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
        </div>
      ))}
    </div>
  );
};

export default Blog;
