const Product = require('../models/product');
const Order = require('../models/order');

// get products for the normal user
// from the database
exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      //console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        isAuthenticated : req.session.isLoggedIn
      });
    })
    .catch(err =>  {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// get the product details using the ID
//  remove old sequelize 
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products',
      isAuthenticated : req.session.isLoggedIn
    });
  })
  .catch(err =>  {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

// get all products for the index page
// from the database
exports.getIndex = (req, res, next) => {
  Product.find()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err =>  {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

//get the cart information
exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
        isAuthenticated : req.session.isLoggedIn
      });
    })
    .catch(err =>  {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// post the product to the cart
// if the product is already in the cart increase the quantity amount
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
     // console.log(result);
      res.redirect('/cart');
    });
};

// post the delete product to the cart (Delete the product) 
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err =>  {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};



// get products from cart and post to orders
exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err =>  {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


// get all orders 
exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        isAuthenticated : req.session.isLoggedIn
      });
    })
    .catch(err =>  {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


// get the checkout view for the user
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
    isAuthenticated : req.isLoggedIn
  });
};
