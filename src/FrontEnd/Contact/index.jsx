import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';

const ContactUs = () => {
  const [inputValue, setInputValue] = useState({
    username: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleValue = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value
    }));
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();

    const { username, email, subject, message } = inputValue;

    // Prepare the email data
    const emailData = {
      username,
      email,
      subject,
      message
    };

    try {
      // Send the email using an API endpoint
      await axios.post('http://localhost:4000/Contact', emailData);
      // TODO: Add logic for successful email submission
      console.log('Email sent');
    } catch (error) {
      console.error('Error sending email:', error);
      // TODO: Add error handling logic
    }
  };

  return (
    <div className="container1">
      <div className="signin-signup">
        <form action="#" className="sign-in-form fm" onSubmit={handleLoginForm}>
          <h2 className="title">Contact Us</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Name" name="username" onChange={handleValue} required />
          </div>
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email" name="email" onChange={handleValue} required />
          </div>
          <div className="input-field">
            <i className="fas fa-book"></i>
            <input type="text" placeholder="Subject" name="subject" onChange={handleValue} required />
          </div>
          <div className="input-field">
            <i className="fas fa-comment"></i>
            <textarea
              placeholder="Message"
              name="message"
              onChange={handleValue}
              required
            ></textarea>
          </div>
          <button className="btn solid" type="submit">Send Email</button>
          <p className="social-text">Or Contact us with our social platforms</p>
          <div className="social-media">
            <a href="#" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-google"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </form>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <img src="Images/contact.png" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
