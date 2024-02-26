import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/header.css';


const Header = ({handleSearch,handleSortBy, handleFilterByCategory}) => {
  const categories = ['All', 'smartphones', 'laptops', 'fragrances','skincare'];
  const sortingOptions = ['None','Price: Low to High', 'Price: High to Low', 'Rating: Low to High', 'Rating: High to Low'];


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
          // cont name= res.
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
          
        <select onChange={handleFilterByCategory}>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
  
        <select onChange={handleSortBy}>
          {sortingOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>

            <button className="login-button">
            {data ? <Link to="/user">{data?.user?.email.split('@')[0]}</Link> : <Link to="/login">Login</Link>}
            </button>

      </div>
    </div>
  </header>
  );
};

export default Header;
