const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore= require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const errorController = require('./controllers/errors');
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');
const User = require('./models/user');
const MONGODB_URI = 'Please enter you DB information to use this app';

const app = express();
//create store connection 
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

// create a var that uses the csrf function
const csrfProtection = csrf();

//
const date = new Date().toISOString();
//console.log(date);
// store the file/filename
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);

  }
});

// set up a filter so that the user can only upload png/jpeg images
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// allows us to set values globally. 
app.set('view engine', 'ejs');
app.set('views', 'views');


// the routes for the admin and shop pages. 
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: false}));

app.use(multer({ storage: fileStorage, fileFilter: fileFilter}).single('image'));

// use this to connect the css files. lets express access the file 'public'
app.use(express.static(path.join(__dirname,'public')));
// setup directory to use the images
app.use('/images', express.static(path.join(__dirname, 'images')));

// use this to configure the session 
app.use(
  session({
    secret: 'thisIsASecret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);


app.use(flash());
// find user by the id
// 
app.use((req, res, next) => {
  if (!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
  .then(user => {
    if (!user) {
      return next();// continue if user is not found. 
    }
    req.user = user;
    next();
  })
  .catch(err => {
    next(new Error(err));
  });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
})

// /create-order => POST orders
app.post('/create-order', isAuth, shopController.postOrder);

// init csrf middleware
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
})

// use the shop and admin routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// route to 500 if 500 error is thrown
app.get('/500', errorController.get500);

// catch all router, if the route cannot be handled it will throw a 404 error and display "Page Not Found"
app.use(errorController.get404);

// error handling middleware
app.use((error, req, res, next) => {
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.isLoggedIn
  });
});

// connect using mongoose
mongoose.connect(
  MONGODB_URI
)
.then(result => {
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});


