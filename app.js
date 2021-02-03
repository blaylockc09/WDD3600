const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { error } = require('console');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);


// catch all router, if the route cannot be handled it will throw a 404 error and display "Page Not Found"
app.use((req,res,next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
});



app.listen(3000);

