const express = require('express');
const router = express.Router();

const {getAllProducts,getProduct,addProduct,getFilterProducts} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/add', addProduct);
// router.get('/filter', getFilterProducts)

module.exports = router;