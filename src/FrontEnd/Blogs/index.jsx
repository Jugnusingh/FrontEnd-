import React from "react";
import "./Blog.css";

const Blog = ({ blogsData }) => {
  console.log(blogsData,"Blogs page ")
  return (
    <div className="blog-list">
      <h1>Blogs</h1>
      {blogsData.map((blog) => (
        <div className="blog-item" key={blog._id}>
          <div>
            <h3>Title: {blog.Title}</h3>
            <p>Content: {blog.Content}</p>
            <img
              className='srcimg'
              src={`http://localhost:4000/uploads/${blog.Image}`}
              alt='img'
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
