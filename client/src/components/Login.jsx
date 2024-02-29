import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';

const Login = ({handleLogout}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', {
        email,
        password,
      });
      // console.log('Login successful:', response.data);
      localStorage.setItem("token", response.data.token);
        if (window.confirm('LogIn Successfull')) {
          window.location.href = '/';
        } else {
          window.location.href = '/';
        }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-box">
    <div className="login-container">
      <p>Login</p>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit" className="login">Login</button>
      </form>
    </div>
  </div>  
  );  
};

export default Login;
