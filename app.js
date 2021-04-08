const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore= require('connect-mongodb-session')(session);

const errorController = require('./controllers/errors');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://blaylock:passwordpassword1@cluster0.x59f4.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();
//create store connection 
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

// allows us to set values globally. 
app.set('view engine', 'ejs');
app.set('views', 'views');


// the routes for the admin and shop pages. 
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: false}));

// use this to connect the css files. lets express access the file 'public'
app.use(express.static(path.join(__dirname,'public')));


// use this to configure the session 
app.use(
  session({
    secret: 'thisIsASecret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// find user by the id
// 
app.use((req, res, next) => {
  if (!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
});

// use the shop and admin routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// catch all router, if the route cannot be handled it will throw a 404 error and display "Page Not Found"
app.use(errorController.get404);

// connect using mongoose
mongoose.connect(
  MONGODB_URI
)
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Chris',
        email: 'blaylock@mail.com',
        cart: {
          items:[]
        }
      });
      user.save();
    }
  });
  app.listen(3000);
}).catch(err => {
  console.log(err);
});


