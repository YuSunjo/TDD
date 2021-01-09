const express = require('express');
const {createProduct} = require('./controller/products');

const router = express.Router();

router.post('/',createProduct)

module.exports = router;