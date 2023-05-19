import React, { useState, useEffect } from 'react';
import Navbar from './FrontEnd/Header/Navbar';
import { Route, Routes } from 'react-router-dom'
import Home from './FrontEnd/Home';
import Contact from './FrontEnd/Contact';
import Cart from './FrontEnd/Cart';
import Login from './FrontEnd/login';
import axios from 'axios';
import Blogs from './FrontEnd/Blogs';
import Product from './FrontEnd/Product';
import "./index.css";
import BlogUpload from './Admin/BlogsUpload';
import OrderManagement from './Admin/OrderManagement';
import CategoryForm from './Admin/categoryUpload';
import UploadManagement from './Admin/ProductManagement/UploadManagement';
import AdminPanel from './Admin/AdminPanel/AdminPanel';

function SearchBar() {
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <div className={`search-bar${isActive ? ' active' : ''}`}>
      <input
        type="text"
        placeholder="Search"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button type="submit">
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
}

function App() {

  const [cartItems, setCartItems] = useState([])
  const [categories, setCategories] = useState([]);
  const [countCartItems, setCountCartItems] = useState(0)
  const [cartMessage, setCartMessage] = useState()
  const [productData, setProductData] = useState([])
  const [imageData, setImageData] = useState([])
  

  const getSliderData = () => {
    axios.get("http://localhost:4000/image")
      .then((result) => {
        console.log(result.data.imageData, "imageData")
        setImageData(result.data.imageData)
      }).catch(error => {
        console.log(error, "slider Error")
      })
  }
  useEffect(() => {
    getSliderData()
    getCategories()
    // localStorage.setItem("localProductData", JSON.stringify(imageData))
  }, [])

  const onRemove = (curElemt) => {
    setCartItems((cartItems.filter((x) => x._id !== curElemt._id)))
    setCountCartItems(countCartItems - curElemt.qty)
  }
  const onAdd = (item) => {
    console.log(item, "item")
    const itemExist = cartItems.find((x) => x._id === item._id)
    console.log(itemExist, "itemExist")
    if (itemExist) {
      setCartItems(cartItems.map((x) => x._id === item._id ? { ...itemExist, qty: itemExist.qty + 1 } : x))
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }])
    }
    setCountCartItems(countCartItems + 1)
    setCartMessage("added to cart")
  }
  const getProductData = () => {
    axios.get("http://localhost:4000/product")
      .then((result) => {
        setProductData(result.data.productData)
      }).catch(error => {
        console.log(error, "ProductData Error")
      })
  }
  useEffect(() => {
    getProductData()
    localStorage.setItem("localProductData", JSON.stringify(productData))
  }, [])

  const getCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4000/categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
     
      <Navbar countCartItems={countCartItems} />
      <Routes>
        <Route exact path='/' element={<Home productData={productData} image={imageData} />} />
        <Route exact path='/Blogs' element={<Blogs />} />
        <Route exact path='/Contact' element={<Contact />} />
        <Route exact path="/cart" element={<Cart cartItems={cartItems} data={productData} onRemove={onRemove} countCartItems={countCartItems} />} />
        <Route exact path="/Project" element={<Product productData={productData} onAdd={onAdd} cartMessage={cartMessage} categories={categories} />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/adminPanel" element={<AdminPanel />} />
        <Route exact path="/BlogUpload" element={<BlogUpload/>} />
        <Route exact path="/UploadManagement" element={<UploadManagement productData={productData} categories={categories}/>} />
        <Route exact path="/CategoryUpload" element={<CategoryForm categories={categories} />} />
        <Route exact path="/Order" element={<OrderManagement/>} />
      </Routes>
    </div>
  );
}
export default App;
