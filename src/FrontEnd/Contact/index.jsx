import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';

const ContactUs = () => {
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    mobile: "",
    message: "",
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

    const { username, email, mobile, message } = inputValue;
    // Prepare the email data
    const emailData = {
      username,
      email,
      mobile,
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
    <div className="contact-container">
      <div className="contact">
        <form action="#" className="contact-sign-in-form" onSubmit={handleLoginForm}>
          <h2 className="contact-title">Contact Us</h2>
          <div className="contact-input-field">
            <input
              type="text"
              placeholder="Your Name"
              name="username"
              value={inputValue.username}
              onChange={handleValue}
            />
          </div>
          <div className="contact-input-field">
            <input
              type="text"
              placeholder="Your Email"
              name="email"
              value={inputValue.email}
              onChange={handleValue}
            />
          </div>
          <div className="contact-input-field">
            <input
              type="number"
              placeholder="Mobile Number"
              name="mobile"
              value={inputValue.mobile}
              onChange={handleValue}
            />
          </div>
          <div className="contact-input-field">
            <input
              type="text"
              placeholder="Your Message"
              name="message"
              value={inputValue.message}
              onChange={handleValue}
            />
          </div>
          <center><button className="contact-btn solid">Send</button></center>
        </form>
      </div>
      <div className="contact-panels-container">
        <div className="contact-panel contact-left-panel">
          <img src="Images/contact.png" className="contact-image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
