import React, { useState, useEffect , useRef  } from 'react';
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
import SliderImage from './Admin/SliderImageUpload /SliderImage';
import Success from './FrontEnd/PaymentURl/Success';
import Failed from './FrontEnd/PaymentURl/Failed';
import { loadStripe } from '@stripe/stripe-js';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countCartItems, setCountCartItems] = useState(0);
  const [cartMessage, setCartMessage] = useState('');
  const [productData, setProductData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [myorders, setOrders] = useState([]);
  const cardElement = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getSliderData(), getCategories(), getProductData(), fetchBlogs(), fetchOrders()]);
    };

    fetchData();
  }, []);

  const getSliderData = () => {
    axios.get("https://dalaltechnologies.in:4000/image")
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
  const handlePayNow = async (products, name, email, phone) => {
    try {
        const response = await fetch('https://dalaltechnologies.in:4000/pay/createCheckoutSession', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ products, name, email, phone }),
        });

        const sessionData = await response.json();

        if (sessionData.error) {
            console.log(sessionData.error);
            return;
        }

        const stripe = await loadStripe("pk_live_51NcoEZSHE6TytuIgf3zNPKiZPc6sx7TDghWcweMGXHo0Fvz77ECVtZEthWuSN8IkIjSh3JMt7ULdhyjeFVSs3Yqk006v2cZJKW");

        const session = await stripe.redirectToCheckout({
            sessionId: sessionData.id,
        });

        if (session.error) {
            console.log(session.error);
        }
    } catch (error) {
        console.log(error);
    }
};
  const fetchOrders = async () => {
    try {
      const ordersResponse = await axios.get('https://dalaltechnologies.in:4000/pay/getOrder');
      const orders = ordersResponse.data;
      // Process and display orders as needed
      console.log('Fetched orders:', orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  


  return (
    <div>
      <Navbar countCartItems={countCartItems} />
      <Routes>
        <Route exact path='/' element={<Home productData={productData} image={imageData} />} />
        <Route exact path='/Blogs' element={<Blog blogsData={blogs} />} />
        <Route exact path='/Contact' element={<Contact />} />
        <Route exact path="/cart" element={<Cart cartItems={cartItems} onRemove={onRemove} countCartItems={countCartItems} handlePayNow={handlePayNow} cardElement={cardElement}  />} />
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
