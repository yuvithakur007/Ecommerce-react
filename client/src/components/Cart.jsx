import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/api/carts`, {
          headers: {
            Authorization: token,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
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
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/carts/delete/${itemId}`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:8080/api/orders/place-order`, null, {
        headers: {
          Authorization: token,
        },
      });
      console.log("Order placed successfully");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartProducts.length > 0 ? (
        <div className="cart-products">
          <table className="cart-table">
            <thead>
              <tr className="cart-table-header">
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((item) => (
                <tr key={item._id} className="cart-item">
                  <td style={{ paddingRight: "0rem" }}>
                    <img className="cart-item-image"
                      src={item.image}
                      alt={item.name}
                    />
                    <br />
                    {item.name}
                  </td>

                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => handleDeleteItem(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-amount">
            <p>
              Total: $
              {cartProducts.reduce(
                (total, product) => total + product.price,
                0
              )}
            </p>
          </div>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      ) : (
        <p style={{ margin: "1.5rem" }}>No products in the cart.</p>
      )}
    </div>
  );
};

export default Cart;
