import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/orders`, {
          headers: {
            Authorization: token,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };


    const fetchProduct = async (id) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/products/${id}`
              );
              return response.data;
            } catch (error) {
              console.error("Error fetching product:", error);
            }
          };

    const fetchAllOrderProducts = async () => {
      try {
        const productPromises = orders.map(fetchProduct);
        const products = await Promise.all(productPromises);
        setOrderProducts(products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };
  
    fetchCartItems();
    fetchAllOrderProducts();
  }, [orders]);

  return (
    <div>
      <h2>Orders</h2>
      {orderProducts.length > 0 ? (
        <ul>
          {orderProducts.map(order => (
            <li key={order._id}>
              {order.name} - ${order.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
};

export default Orders;
