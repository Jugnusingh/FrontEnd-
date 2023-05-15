import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogForm from '../../Admin/BlogForm';
import BlogList from '../blogList';


function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id) => {
    // Handle update logic here
  };

  const handleDelete = async (id) => {
    // Handle delete logic here
  };

  return (
    <div>
      <h1>Blog Page</h1>
      <BlogForm fetchBlogs={fetchBlogs} />
      <BlogList blogs={blogs} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    </div>
  );
}

export default Blog;
