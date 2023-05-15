import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryForm.css';
import AdminSidebar from '../Dashboard/adminLeftBar/AdminSidebar';
import Upload from './Upload';

const CategoryForm = ({ categories }) => {
  // const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        const response = await axios.put(`http://127.0.0.1:4000/categories/${editingId}`, { category });
        console.log(response);
        setEditing(false);
        setEditingId('');
      } else {
        const response = await axios.post('http://127.0.0.1:4000/categories', { category });
        console.log(response);
      }
      setCategory('');
      // getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:4000/categories/${id}`);
      console.log(response);
      // getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/categories/${id}`);
      console.log(response);
      setCategory(response.data.category);
      setEditing(true);
      setEditingId(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AdminSidebar />
      <Upload />
      <div className="container11">
        <h2 className='heading'> Add New Category</h2>
        <form className='categoryFrom' onSubmit={handleSubmit}>
          <div className="group">
            <input className='inp' type="text" value={category} onChange={(event) => setCategory(event.target.value)} />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className='labl'>Category</label>
          </div>


          <button className='bton' type="submit">{editing ? 'Update' : 'Submit'}</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.category}</td>
                <td>
                  <button className='bton' onClick={() => handleEdit(category._id)}>Edit</button>
                  <button className='bton' onClick={() => handleDelete(category._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryForm;
