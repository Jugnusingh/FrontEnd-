import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
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

function App() {
  const [blogs, setBlogs] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countCartItems, setCountCartItems] = useState(0);
  const [cartMessage, setCartMessage] = useState('');
  const [productData, setProductData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [myorders, setOrders] = useState([]);
 


  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getSliderData(), getCategories(), getProductData(), fetchBlogs(),fetchOrders()]);
    };

    fetchData();
  }, []);

  const getSliderData = () => {
    axios
      .get("http://203.123.33.138:4000/image")
      .then((result) => {
        setImageData(result.data.imageData);
      })
      .catch(error => {
        console.log(error, "Slider Error");
      });
  };

  const onRemove = async (curElement) => {
    try {
      await axios.delete(`http://203.123.33.138:4000/product/${curElement._id}`);
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
      const response = await axios.post("http://203.123.33.138:4000/product", item);
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
      .get("http://203.123.33.138:4000/product")
      .then((result) => {
        setProductData(result.data.productData);
      })
      .catch(error => {
        console.log(error, "ProductData Error");
      });
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://203.123.33.138:4000/Blog");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching Blogs:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('http://203.123.33.138:4000/categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayNow = async (totalAmount,productIds,title) => {
    try {
      const orderResponse = await axios.post("http://203.123.33.138:4000/pay/orders", {
        amount: totalAmount,
        productIds:productIds,
        title:title
      });
      console.log(orderResponse.data, "order mai kya aaya 43");
      const orderData = orderResponse.data;
      console.log(orderData, "orderData aaya  ");
      const options = {
        key: "rzp_test_LLTSrqLmpUtsIx",
        amount: totalAmount * 100, // Convert to paise
        currency: "INR",
        order_id: orderData.id, // Make sure orderData contains the correct id field
        handler: async (response) => {
          console.log(response, "yyy");
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;
          console.log(razorpay_signature, "razorpay_signature hai ");
          try {
            const verifyUrl = "http://203.123.33.138:4000/pay/verify";
            const verificationResponse = await axios.post(verifyUrl, {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            });
            console.log(verificationResponse.data);

            // Set the purchased product ID in state
            // setPurchasedProductId(productIds); // Replace with the actual product ID
            setOrders(orderData); // Set the order data

            // After payment is verified, navigate to the download page
            window.location.href = "/download";
          } catch (error) {
            console.log(error, "error occurred");
          }
        },
        theme: {
          color: "#121212",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = () => {
    fetch('http://203.123.33.138:4000/pay/orders')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data.orderData);
        setOrders(data.orderData);
      })
      .catch((error) => console.error('Error fetching orders:', error));
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
        <Route exact path="/BlogUpload" element={<BlogUpload blogsData={blogs} setBlogs={setBlogs} />} />
        <Route exact path="/UploadManagement" element={<UploadManagement productData={productData} categories={categories} updateProductData={updateProductData} />} />
        <Route exact path="/CategoryUpload" element={<CategoryForm categories={categories} />} />
        <Route exact path="/Order" element={<OrderManagement myorders={myorders} />} />
        <Route exact path="/download" element={<DownloadPage productData={productData} myorders={myorders} />} /> 
        <Route exact path="/CancellationPolicy" element={<CancellationPolicy />} /> 
        <Route exact path="/Disclaimer" element={<Disclaimer />} /> 
        <Route exact path="/TermsAndConditions" element={<TermsAndConditions/>} /> 
        <Route exact path="/PrivacyPolicy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
