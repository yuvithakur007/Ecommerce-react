import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/carts`, {
          headers: {
            Authorization: token,
          },
        });
        setCartItems(response.data);
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

    const fetchAllCartProducts = async () => {
      try {
        const productPromises = cartItems.map(fetchProduct);
        const products = await Promise.all(productPromises);
        setCartProducts(products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };
  
    fetchCartItems();
    fetchAllCartProducts();
  }, [cartItems]);

  const handleDeleteItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/carts/delete/${itemId}`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8080/api/orders/place-order`, null, {
        headers: {
          Authorization: token,
        },
      });
      console.log('Order placed successfully');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  

  return (
    <div>
      <h2>Cart</h2>
      {cartProducts.length > 0 ? (
        <ul>
          {cartProducts.map((item) => (
            <li key={item._id}>
              {item.name} - ${item.price}
              <button onClick={() => handleDeleteItem (item._id)}>Delete</button>
            </li>
          ))}
        </ul>
        // add place order button

      ) : (
        <p>No products in the cart.</p>
      )}
       <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Cart;