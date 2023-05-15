import React from 'react';

const BlogList = ({ blogs, handleUpdate, handleDelete }) => {
  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <button onClick={() => handleUpdate(blog._id)}>Update</button>
            <button onClick={() => handleDelete(blog._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
