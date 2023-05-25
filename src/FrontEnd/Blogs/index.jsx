import React from "react";
import "./Blog.css";

const Blog = ({ blogsData }) => {
  return (
    <div className="blog">
      {blogsData.map((blog) => (
        <div className="blog-item-user" key={blog._id}>
          <a href={`/blogs/${blog._id}`} target="_blank" rel="noopener noreferrer">
            <div>
              <h3>Title: {blog.Title}</h3>
              <p>Content: {blog.Content}</p>
              <img className="srcimg" src={`http://localhost:4000/uploads/${blog.Image}`} alt="img" />
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Blog;
