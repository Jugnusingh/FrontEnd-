import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryForm.css';
import AdminNavbar from '../adminNavbar';

const CategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get('https://dalaltechnologies.in:4000/categories');
=======
      const response = await axios.get('http://localhost:4000/categories');
>>>>>>> e80122ddfe6a74a80b6942ef6f544bc23b06bf8d
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
<<<<<<< HEAD
        const response = await axios.put(`https://dalaltechnologies.in:4000/categories/${editingId}`, { category });
=======
        const response = await axios.put(`http://localhost:4000/categories/${editingId}`, { category });
>>>>>>> e80122ddfe6a74a80b6942ef6f544bc23b06bf8d
        console.log(response);
        setEditing(false);
        setEditingId('');
      } else {
<<<<<<< HEAD
        const response = await axios.post('https://dalaltechnologies.in:4000/categories', { category });
=======
        const response = await axios.post('http://localhost:4000/categories', { category });
>>>>>>> e80122ddfe6a74a80b6942ef6f544bc23b06bf8d
        console.log(response);
      }
      setCategory('');
      fetchCategories(); // Fetch the updated categories
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
<<<<<<< HEAD
      const response = await axios.delete(`https://dalaltechnologies.in:4000/categories/${id}`);
=======
      const response = await axios.delete(`http://localhost:4000/categories/${id}`);
>>>>>>> e80122ddfe6a74a80b6942ef6f544bc23b06bf8d
      console.log(response);
      fetchCategories(); // Fetch the updated categories
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
<<<<<<< HEAD
      const response = await axios.get(`https://dalaltechnologies.in:4000/categories/${id}`);
=======
      const response = await axios.get(`http://localhost:4000/categories/${id}`);
>>>>>>> e80122ddfe6a74a80b6942ef6f544bc23b06bf8d
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
      <AdminNavbar/>
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
