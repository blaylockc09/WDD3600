// Handles 404 error and sets page title to page not found.
exports.get404 = (req, res, next) => {
    res.status(404).render('404', { 
    pageTitle: 'Could Not Find Page', 
    path: '/404',
    isAuthenticated :  req.session.isLoggedIn});
  };
  // Handles 500 error and sets page title to error.
  exports.get500 = (req, res, next) => {
    res.status(500).render('500', {
      pageTitle: 'Error!',
      path: '/500',
      isAuthenticated: req.session.isLoggedIn
    });
  };
  