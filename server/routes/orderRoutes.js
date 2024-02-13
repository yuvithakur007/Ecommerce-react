const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to get user's orders
router.get('/orders', orderController.getUserOrders);

// Route to place a new order
router.post('/orders/place', orderController.placeOrder);

module.exports = router;
