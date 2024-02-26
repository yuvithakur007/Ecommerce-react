import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = ({search, category, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products', {
          params: {
            category: category,
            sort: sort
          }
        });
        
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [category, sort]);
  
  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const productNameIncludesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const descriptionIncludesSearch = product.description.toLowerCase().includes(search.toLowerCase());
      return productNameIncludesSearch || descriptionIncludesSearch;
    });
    setFilteredProducts(filteredProducts);
  }, [search, products]);

  return (
    <div>
      <h2>Product List</h2>
      <div>
        {filteredProducts.map(product => (
          <div key={product._id} className="card" style={{ width: '18rem' }}>
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              {/* <p className="card-text">{product.description}</p> */}

              <div id='rating'>
              <span>Rating: {product.avgRating}★</span>
            </div>
            


              <p className="card-text">Price: ${product.price}</p>
              <Link to={`/product/${product._id}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
