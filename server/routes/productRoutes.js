const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.get('/products', productController.getAllProducts);

// Route to get product by ID
router.get('/products/:id', productController.getProductById);

// Route to add a new product
router.post('/products', productController.addProduct);

module.exports = router;
