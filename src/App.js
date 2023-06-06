import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import "./index.css";
import axios from 'axios';
import Navbar from './FrontEnd/Header/Navbar';
import Home from './FrontEnd/Home';
import Contact from './FrontEnd/Contact';
import Cart from './FrontEnd/Cart';
import Login from './FrontEnd/login';
import Product from './FrontEnd/Product';
import BlogUpload from './Admin/BlogsUpload';
import OrderManagement from './Admin/OrderManagement';
import CategoryForm from './Admin/categoryUpload';
import UploadManagement from './Admin/ProductManagement/UploadManagement';
import AdminPanel from './Admin/AdminPanel/AdminPanel';
import Blog from './FrontEnd/Blogs';


function App() {
  const [blogs, setBlogs] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countCartItems, setCountCartItems] = useState(0);
  const [cartMessage, setCartMessage] = useState('');
  const [productData, setProductData] = useState([]);
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getSliderData(), getCategories(), getProductData(), fetchBlogs()]);
    };

    fetchData();
  }, []);

  const getSliderData = () => {
    axios
      .get("http://localhost:4000/image")
      .then((result) => {
        
        setImageData(result.data.imageData);
      })
      .catch(error => {
        console.log(error, "Slider Error");
      });
  };

  const onRemove = (curElement) => {
    axios
      .delete(`http://localhost:4000/product/${curElement._id}`)
      .then(() => {
        setCartItems(cartItems.filter((x) => x._id !== curElement._id));
        setCountCartItems(countCartItems - curElement.qty);
      })
      .catch(error => {
        console.log(error, "Error removing product");
      });
  };

  const onAdd = (item) => {
    const itemExist = cartItems.find((x) => x._id === item._id);
    if (itemExist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === item._id ? { ...itemExist, qty: itemExist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
    setCountCartItems(countCartItems + 1);
    setCartMessage("added to cart");

    axios
      .post("http://localhost:4000/product", item)
      .then((response) => {
        console.log("Product added successfully:", response.data);
        updateProductData(response.data); // Call the updateProductData function
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const updateProductData = (newProduct) => {
    setProductData([...productData, newProduct]);
  };

 

  const getProductData = () => {
    axios
      .get("http://localhost:4000/product")
      .then((result) => {
        setProductData(result.data.productData);
      })
      .catch(error => {
        console.log(error, "ProductData Error");
      });
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/Blog");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching Blogs:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/categories');
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
        <Route exact path='/Blogs' element={<Blog blogsData={blogs} />} />
        <Route exact path='/Contact' element={<Contact />} />
        <Route exact path="/cart" element={<Cart cartItems={cartItems} data={productData} onRemove={onRemove} countCartItems={countCartItems} />} />
        <Route exact path="/Project" element={<Product productData={productData} onAdd={onAdd} cartMessage={cartMessage} categories={categories} />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/adminPanel" element={<AdminPanel />} />
        <Route exact path="/BlogUpload" element={<BlogUpload blogsData={blogs} setBlogs={setBlogs} />} />
        <Route exact path="/UploadManagement" element={<UploadManagement productData={productData} categories={categories} updateProductData={updateProductData} />} />
        <Route exact path="/CategoryUpload" element={<CategoryForm categories={categories} />} />
        <Route exact path="/Order" element={<OrderManagement />} />
       
      </Routes>
    </div>
  );
}

export default App;
