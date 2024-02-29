const express = require('express');
const router = express.Router();

const {getAllProducts,getProduct,addProduct} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/add', addProduct);

module.exports = router;