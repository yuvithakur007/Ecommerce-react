import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "../styles/products.css";

const ProductList = ({ search, category, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // from backend: category, sort
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products", {
          params: {
            category: category,
            sort: sort,
          },
        });
        // console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [category, sort]);

  // from frontend: search
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
    </>
  );
};

export default ProductList;
