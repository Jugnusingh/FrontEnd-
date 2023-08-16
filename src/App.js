import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import "./index.css";
import axios from 'axios';
import Navbar from './FrontEnd/Header/Navbar';
import Footer from './FrontEnd/Footer';
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
import DownloadPage from './DownloadPdf';
import CancellationPolicy from './Policies/CancellationPolicy';
import Disclaimer from './Policies/Disclaimer'
import PrivacyPolicy from './Policies/PrivacyPolicy'
import TermsAndConditions from './Policies/TermsAndConditions'
import SliderImage from './Admin/SliderImageUpload /SliderImage';
import Success from './FrontEnd/PaymentURl/Success';
import Failed from './FrontEnd/PaymentURl/Failed';


function App() {
  const [blogs, setBlogs] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countCartItems, setCountCartItems] = useState(0);
  const [cartMessage, setCartMessage] = useState('');
  const [productData, setProductData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [myorders, setOrders] = useState([]);

  const stripePromise = loadStripe('pk_test_51NcoEZSHE6TytuIgZBS5omYXOL7Td61IHJNL8Hdn6plDudX5hwrYiKySiI8Vs9dUSGQdcjtqeKCNrvuQFePp84EV00lMAS5AQL');

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getSliderData(), getCategories(), getProductData(), fetchBlogs(), fetchOrders()]);
    };

    fetchData();
  }, []);

  const getSliderData = () => {
    axios
      .get("https://dalaltechnologies.in:4000/image")
      .then((result) => {
        setImageData(result.data.imageData);
      })
      .catch(error => {
        console.log(error, "Slider Error");
      });
  };

  const onRemove = async (curElement) => {
    try {

      setCartItems(cartItems.filter((x) => x._id !== curElement._id));
      setCountCartItems(countCartItems - curElement.qty);
    } catch (error) {
      console.log(error, "Error removing product");
    }
  };

  const onAdd = async (item) => {
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

    try {
      const response = await axios.post("https://dalaltechnologies.in:4000/product", item);
      console.log("Product added successfully:", response.data);
      updateProductData(response.data); // Call the updateProductData function
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProductData = (newProduct) => {
    setProductData([...productData, newProduct]);
  };

  const getProductData = () => {
    axios
      .get("https://dalaltechnologies.in:4000/product")
      .then((result) => {
        setProductData(result.data.productData);
      })
      .catch(error => {
        console.log(error, "ProductData Error");
      });
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://dalaltechnologies.in:4000/Blog");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching Blogs:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('https://dalaltechnologies.in:4000/categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayNow = async (totalAmount, productIds, title) => {
    try {
      const orderResponse = await axios.post("https://dalaltechnologies.in/pay/orders", {
        amount: totalAmount,
        productIds: productIds,
        title: title,
      });
  
      const orderData = orderResponse.data;
  
      // Fetch session ID from your server
      const sessionResponse = await axios.post("https://dalaltechnologies.in/payment/session", {
        amount: totalAmount,
        orderId: orderData.id,
      });
  
      const sessionData = sessionResponse.data;
  
      // Redirect user to Google Pay hosted checkout form
      if (sessionData.paymentUrl) {
        window.location.href = sessionData.paymentUrl;
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };
  
  const fetchOrders = () => {
    fetch('https://dalaltechnologies.in:4000/pay/getOrder')  // Make a GET request to your backend endpoint
      .then((response) => response.json())  // Parse the response as JSON
      .then((data) => {
        console.log('Fetched data:', data.orderData);  // Log the fetched data to the console
        setOrders(data.orderData);  // Update the state with the fetched orders
      })
      .catch((error) => console.error('Error fetching orders:', error));  // Handle any errors that occur during the fetch
  };
  

  return (
    <div>
      <Navbar countCartItems={countCartItems} />
      <Routes>
        <Route exact path='/' element={<Home productData={productData} image={imageData} />} />
        <Route exact path='/Blogs' element={<Blog blogsData={blogs} />} />
        <Route exact path='/Contact' element={<Contact />} />
        <Route exact path="/cart" element={<Cart cartItems={cartItems} onRemove={onRemove} countCartItems={countCartItems} handlePayNow={handlePayNow} />} />
        <Route exact path="/Project" element={<Product productData={productData} onAdd={onAdd} cartMessage={cartMessage} categories={categories} />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/adminPanel" element={<AdminPanel />} />
        <Route exact path="/SliderImage" element={<SliderImage images={imageData} />} />
        <Route exact path="/BlogUpload" element={<BlogUpload blogsData={blogs} setBlogs={setBlogs} />} />
        <Route exact path="/UploadManagement" element={<UploadManagement productData={productData} categories={categories} updateProductData={updateProductData} />} />
        <Route exact path="/CategoryUpload" element={<CategoryForm categories={categories} />} />
        <Route exact path="/Order" element={<OrderManagement myorders={myorders} />} />
        <Route exact path="/download" element={<DownloadPage productData={productData} myorders={myorders} />} />
        <Route exact path="/CancellationPolicy" element={<CancellationPolicy />} />
        <Route exact path="/Disclaimer" element={<Disclaimer />} />
        <Route exact path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route exact path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route exact path="/PaymentFailed" element={<Failed />} />
        <Route exact path="/PaymentSuccess" element={<Success/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
