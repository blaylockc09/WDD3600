const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

 // / => GET
router.get('/', shopController.getIndex);


// /products => GET
router.get('/products', shopController.getProducts);

// /products/:productId => GET
// based on queryParam of productID
router.get('/products/:productId', shopController.getProduct);

// /cart => GET
router.get('/cart', isAuth, shopController.getCart);

// /cart => post
router.post('/cart',  isAuth, shopController.postCart);

// /cart-delete-item => post
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

// /create-order => POST orders
router.post('/create-order', isAuth, shopController.postOrder);

// /orders => GET
router.get('/orders', isAuth, shopController.getOrders);

router.get('/orders/:orderId', isAuth, shopController.getInvoice);

// /checkout => GET
router.get('/checkout', isAuth, shopController.getCheckout);


module.exports = router;
