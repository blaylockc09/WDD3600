const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/errors');

const mongoConnect = require('./util/database').mongoConnect;

const User = require('./models/user');

const app = express();

// allows us to set values globally. 
app.set('view engine', 'ejs');
app.set('views', 'views');


// the routes for the admin and shop pages. 
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));

// use this to connect the css files. lets express access the file 'public'
app.use(express.static(path.join(__dirname,'public')));

// find user by the id
// 
app.use((req, res, next) => {
  User.findById('6049002c3096ca37040b0d26')
  .then(user => {
    req.user = new User(user.name, user.email, user.cart, user._id);
    next();
  })
  .catch(err => console.log(err));
});

// use the shop and admin routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);


// catch all router, if the route cannot be handled it will throw a 404 error and display "Page Not Found"
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});


