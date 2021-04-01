const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

 // / => GET
router.get('/', shopController.getIndex);


// /products => GET
router.get('/products', shopController.getProducts);

// /products/:productId => GET
// based on queryParam of productID
router.get('/products/:productId', shopController.getProduct);

// /cart => GET
router.get('/cart', shopController.getCart);

// /cart => post
router.post('/cart', shopController.postCart);

// /cart-delete-item => post
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// /create-order => POST orders
router.post('/create-order', shopController.postOrder);

// /orders => GET
//router.get('/orders', shopController.getOrders);

// /checkout => GET
//router.get('/checkout', shopController.getCheckout); 


module.exports = router;
