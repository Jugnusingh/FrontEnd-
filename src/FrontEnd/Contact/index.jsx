import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';

const ContactUs = () => {
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleValue = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();

    const { username, email, mobile, subject, message } = inputValue;
    // Form validation
    if (!username || !email || !mobile || !subject || !message) {
      setResponseMessage("All fields are required.");
      return;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setResponseMessage("Invalid email address.");
      return;
    }

    try {
      // Send the email using an API endpoint

      await axios.post('https://dalaltechnologies.in:4000/Contact', inputValue);

      setIsFormSubmitted(true);
      setResponseMessage('Email sent successfully!');
      setInputValue({
        username: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setIsFormSubmitted(false);
        setResponseMessage("");
      }, 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setIsFormSubmitted(false);
      setResponseMessage('An error occurred while sending the email.');
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
              placeholder="Subject"
              name="subject"
              value={inputValue.subject}
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
          <center>
            <button className="contact-btn solid" disabled={isFormSubmitted}>
              {isFormSubmitted ? 'Sending...' : 'Send'}
            </button>
            {responseMessage && <p>{responseMessage}</p>}
          </center>
        </form>
      </div>
      <div className="contact-panels-container">
        <div className="contact-panel contact-left-panel">
          <img src="Images/contact.png" className="contact-image" alt="" />
        </div>
        <h2>Address </h2>
        <p>12/196,Geeta Colony,Delhi Pin-110031
          <br></br>
          Email-jugnu908@gmail.com Mb-9654400726
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
