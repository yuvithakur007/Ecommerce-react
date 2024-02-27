import React from "react";
import { Link } from "react-router-dom";
import "../styles/products.css";

export default function ProductCard(props) {
  return (
    <>
      <div className="product-list-container">
        <div className="products-list">
         
          <Link to={`/product/${props.id}`} className="product-link">
            <div key={props._id} className="product-card">
              <img
                src={props.image}
                className="product-image"
                alt={props.name}
              />

              <div className="product-textBox">
                <h5 className="product-name">{props.name}</h5>

                <div className="rating">
                  <span>Rating: ★{props.avgRating}</span>
                </div>

                <div className="product-price">
                  <span>Price: ${props.price}</span>
                </div>
              </div>

              {/* <p className="product-price">Price: ${props.price}</p> */}
              {/* <Link to={`/product/${props.id}`} className="product-link">
          View Details
        </Link> */}
            </div>
          </Link>
          </div>
        </div>
      
    </>
  );
}
