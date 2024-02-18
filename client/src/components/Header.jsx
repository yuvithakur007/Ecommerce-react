// /src/components/Header.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/header.css';


const Header = () => {
  // Dummy categories and sorting options
  const categories = ['All', 'Electronics', 'Clothing', 'Books'];
  const sortingOptions = ['Price: Low to High', 'Price: High to Low', 'Rating: Low to High', 'Rating: High to Low'];

  const handleSearch = (e) => {
    // Handle search functionality
    const searchTerm = e.target.value;
    console.log('Search term:', searchTerm);
  };

  const handleFilterByCategory = (category) => {
    // Handle filtering by category
    console.log('Filtering by category:', category);
  };

  const handleSortBy = (option) => {
    // Handle sorting products
    console.log('Sorting by:', option);
  };



const [data, setdata] = useState(null)




  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // navigate("/login");
        } else {
          const response = await fetch(
            "http://localhost:8080/api/user/userDetails",
            {
              method: "GET",
              headers: {
                Authorization: token,
              },
            }
          );
          const res = await response.json();
            // console.log(res);
           setdata(res);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);


  return (
    <header>
    <div className="navbar">
      <nav>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/orders">Orders</Link></li>
        </ul>
      </nav>
  
      <div className='product-display'>
        <input type="text" placeholder="Search products..." onChange={handleSearch} />
          
        <select onChange={(e) => handleFilterByCategory(e.target.value)}>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
  
        <select onChange={(e) => handleSortBy(e.target.value)}>
          {sortingOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>

            <button className="login-button">
              {data ? <Link to="/user">{data?.user?.email}</Link> : <Link to="/login">Login</Link>}
              
            </button>

      </div>
    </div>
  </header>
  );
};

export default Header;
