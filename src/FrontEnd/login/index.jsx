// import React from 'react';
// import axios from 'axios';
// import Register from '../../Admin/Register';

// const Login = () => {
//   const [username, setUsername] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     axios.post('http://127.0.0.1:4000/login', { username, password })
//       .then(response => console.log(response.data))
//       .catch(error => console.log(error));
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <div>
//         <Register/>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import '../login/index.css'

const Login = () => {
  const navigate=useNavigate()
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
    e.preventDefault()
    axios.post("http://localhost:4000/login",inputValue)
    navigate('/Dashboard')
  }
  return (
    <div class="container">
      <div class="signin-signup">
        <form action="#" class="sign-in-form fm" onSubmit={handleLoginForm}>
          <h2 class="title">Sign in</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" placeholder="Username" name="username" onChange={handleValue} />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Password" name="password" onChange={handleValue} />
          </div> 
          <button className="btn solid"> Login </button>
        </form>
      </div>
      <div class="panels-container">
        <div class="panel left-panel">
          <img src="Images/login_img.png" className="image" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Login