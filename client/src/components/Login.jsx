// Login.js

import React, { useState } from 'react';
import axios from 'axios';

const Login = ({handleLogout}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      localStorage.setItem("token", response.data.token);
      // Redirect to another page after successful login, such as the home page
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" onClick={handleLogout}>Login</button>
      </form>
    </div>
  );
};

export default Login;
