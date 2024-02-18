// /src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <div>
        {products.map(product => (
          <div key={product._id} className="card" style={{ width: '18rem' }}>
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">${product.price}</p>
              <Link to={`/product/${product._id}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
