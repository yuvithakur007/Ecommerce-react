import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "../styles/products.css";
import { useDarkMode } from '../context/DarkModeContext'; 

const ProductList = ({ search, category, sort }) => {
  const { state } = useDarkMode(); 

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://ecommerce-knol.onrender.com/api/products", {
          params: {
            category: category,
            sort: sort,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [category, sort]);

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const productNameIncludesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const descriptionIncludesSearch = product.description
        .toLowerCase()
        .includes(search.toLowerCase());
      return productNameIncludesSearch || descriptionIncludesSearch;
    });
    setFilteredProducts(filteredProducts);
  }, [search, products]);

  return (
    <>
      <div className={state.darkMode ? 'dark-mode' : 'light-mode'}> 
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div className="individualProductBox">
              <ProductCard
                key={product._id}
                image={product.image}
                name={product.name}
                avgRating={product.avgRating}
                price={product.price}
                id={product._id}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
