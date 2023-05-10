import React, { useState } from 'react'
import '../login/index.css'

const ContactUs = () => {
  const [inputValue, setInputValue] = useState({
    username: "",
    password: ""
  })
  const handleValue = (e) => {
    const value = e.target.value
    const name = e.target.name
    setInputValue({
      ...inputValue, [name]: value
    })
  }
  const handleLoginForm = (e) => {
  }
  return (
    <div class="container">
      <div class="signin-signup">
        <form action="#" class="sign-in-form fm" onSubmit={handleLoginForm}>
          <h2 class="title">Contact Us</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" placeholder="Name" name="username" data-validate = "Name is required" />
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input type="text" placeholder="Email" name="email" data-validate = "Valid email is required: ex@abc.xyz" />
          </div>
          <div class="input-field">
            <i class="fas fa-book"></i>
            <input type="text" placeholder="Subject" name="subject" data-validate = "Subject is required" />
          </div>
          <div class="input-field">
            <i class="fas fa-comment"></i>
            <input type="text" placeholder="Massage" name="massage" data-validate = "Message is required" />
          </div>
          <button className="btn solid"> Send Email </button>
          <p class="social-text">Or Contact us with our social platforms</p>
          <div class="social-media">
            <a href="#" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-google"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </form>
      </div>
      <div class="panels-container">
        <div class="panel left-panel">
          <img src="Images/contact.png" className="image" alt="" />
        </div>
      </div>
    </div>
  )
}

export default ContactUs