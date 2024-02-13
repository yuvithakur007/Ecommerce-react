const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to get user's cart items
router.get('/cart', cartController.getCartItems);

// Route to add item to cart
router.post('/cart/add', cartController.addToCart);

// Route to remove item from cart
router.delete('/cart/remove/:id', cartController.removeFromCart);

module.exports = router;
