
import React, { useState } from "react";
import axios from "axios";
import "./index.css"

const Signup = () => {
  const [username, setUsername] = useState({
    username:'',
    email:'',
    password:''
  });
  const handleSignup = (e)=>{
    const name= e.target.name
const value = e.target.value

setUsername({
  ...username,[name]:value
})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://203.123.33.138:4000/admin/signup",username)
      console.log(response.data.username); // display prompt message
  } catch (error) {
    console.error(error);
  }
};
  

  return (
    <form className="formRegister" onSubmit={handleSubmit}>
      
      <div className="group">
        <input type="text"   name="username" onChange={(e) => handleSignup(e)} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>UserName</label>
      </div>
      <div className="group">
        <input type="email"   name="email" onChange={(e) => handleSignup(e)} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Email</label>
      </div>

      <div className="group">
        <input type="password"  name="password" onChange={(e) => handleSignup(e)} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>password</label>
      </div>
      <button className="formButton" type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;

