const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/errors');
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

app.use('/admin', adminRoutes);
app.use(shopRoutes);


// catch all router, if the route cannot be handled it will throw a 404 error and display "Page Not Found"
app.use(errorController.get404);



app.listen(3000);

