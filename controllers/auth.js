const User = require('../models/user');

// get the login page 
exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated : false
    });
  };

  // get login data 
exports.postLogin = (req, res, next) => {
    User.findById('6064c789a40ce14ae4f07034')
      .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
          console.log(err);
          res.redirect('/');
        });
      })
      .catch(err => console.log(err));
};

// get logout page and kill session
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};



  