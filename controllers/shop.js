const Product = require('../models/product');
const Cart = require('../models/cart');

// get products for the normal user
// from the database
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => console.log(err)); // log the error in the console if there is one.
};

// get the product details using the ID
// 
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId) 
  .then(([product]) => {
      res.render('shop/product-detail', {
        product: product[0], // use the 0 index to get just the object from the array that is returned. 
        pageTitle: product.title,
        path: '/products'
      });
  })
  .catch(err => console.log(err)); // log the error in the console if there is one.
};

// get all products for the index page
// from the database
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
  });
  })
  .catch(err => console.log(err));  // log the error in the console if there is one.
};

//get the cart information that is saved in the cart.JSON
exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

// post the product to the cart
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

// post the delete product to the cart (Delete the product) 
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

// get all orders 
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

// get the checkout view for the user
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
