// ProductDetails.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
        `http://localhost:8080/api/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/carts/additem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: product._id }),
    });
  };

  return (
    <div className="product-details-container">
      {product && (
        <div className="product-details">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <div className="product-actions">

            {/* <button onClick={handleClick}>
               Buy now
              </button> */}

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
