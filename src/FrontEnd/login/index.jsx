import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  console.log(message,"message")
  const [inputValue, setInputValue] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleValue = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/admin/signin',
        inputValue
      );
      
      console.log(response, 'hhhhhhhhh');
      localStorage.setItem("token",response.data.token)
      if (response.status === 200) {
        console.log("1234567890")
        setMessage('Login successful!');
        navigate('/AdminPanel');
      } else {
        setMessage("response");
      }
    } catch (error) {
      setMessage('Invalid credentials. Please try again.');
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="signin-signup">
        <form action="#" className="sign-in-form fm" onSubmit={handleLoginForm}>
          <div></div>
          <h2 className="title">Sign in</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleValue}
            />
          </div>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={handleValue}
            />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleValue}
            />
          </div>
          <button className="btn solid">Login</button>
        </form>
        <div>{message}</div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <img src="Images/login_img.png" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
