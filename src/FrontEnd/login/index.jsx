import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
 
  const [inputValue, setInputValue] = useState({
    username: "",
    email:"",
    password: ""
  })
 
  const handleValue = (e) => {
    const value = e.target.value
    const name = e.target.name
    setInputValue({
      ...inputValue, [name]: value
    })
  }

  const handleLoginForm = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:4000/admin/signin",inputValue);
      console.log(response,"hhhhhhhhh");
      if (response.status === 201) {
        setMessage("Login successful!");
        navigate('/Dashboard');
      } else {
        // console.log("action perfomed")
        setMessage(response.data.message);
      }
    } catch (error) {
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
            <input type="text" placeholder="Username" name="username" onChange={handleValue} />
          </div>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="email" name="email" onChange={handleValue} />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" name="password" onChange={handleValue} />
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
  )
}

export default Login;
