const express = require('express');
const productController = require('./controller/products');

const router = express.Router();

router.post('/',productController.createProduct)

router.get('/', productController.getProducts);

router.get('/:productId', productController.getProductById);

router.put('/:productId',productController.updateProduct);
module.exports = router;