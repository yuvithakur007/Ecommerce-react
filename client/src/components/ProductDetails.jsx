import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/details.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("Product ID:", id);
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(
        `https://ecommerce-knol.onrender.com/api/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

  if (localStorage.getItem('token')) {
    fetch("https://ecommerce-knol.onrender.com/api/carts/additem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: product._id }),
    });
  } else {
    if (window.confirm('"Please Login to add to cart"')) {
      window.location.href = '/login';
    }
  }
  };

  return (
    <div className="product-details-container">
      {product && (
        <div className="product-details">
          <div className="product-details-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h2 className="product-details-name">{product.name}</h2>
            <p className="product-details-description">{product.description}</p>
            <p className="product-details-category">Category: {product.category}</p>
            <div className="details-rating">
              <span>Rating: ★{product.avgRating}</span>
            </div>
  
            <p className="product-details-price">Price: ${product.price}</p>
            <div className="product-details-actions">
              <button onClick={handleClick}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );  
};

export default ProductDetails;
