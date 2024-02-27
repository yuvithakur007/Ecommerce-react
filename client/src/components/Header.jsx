import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("token") !== null;
    setIsLoggedIn(userLoggedIn);
    if (userLoggedIn) {
      fetchUserDetails();
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/user/userDetails", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <header>
      <div className="navbar">
        <nav>
          <ul className="navbar-links">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/cart"}>Cart</Link>
            </li>
            <li>
              <Link to={"/orders"}>Orders</Link>
            </li>
          </ul>
        </nav>

        
          <button className="login-button" onClick={() => setToggle(!toggle)}>
            {isLoggedIn ? (
              <>
                <div>{userData ? userData?.user?.email.split("@")[0] : null}</div>
                {toggle && (
                  <div>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </button>
          
        </div>
    </header>
  );
};

export default Header;
