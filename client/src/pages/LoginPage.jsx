// /src/pages/Login.js
import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/Login';
import Footer from '../components/Footer';
// import { useEffect, useState } from 'react';

const LoginPage = () => {
   
  return (
    <div>
      <Header />
      <LoginForm/>
      <Footer/>
    </div>
  );
}

export default LoginPage;
