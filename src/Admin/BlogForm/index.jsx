import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = ({ fetchBlogs }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/blogs', { title, content });
      setTitle('');
      setContent('');
      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <h2>Create a new blog post</h2>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />
      <label htmlFor="content">Content:</label>
      <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} required></textarea><br />
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
