// Handles 404 error and sets page title to page not found.
exports.get404 = (req, res, next) => {
    res.status(404).render('404', { 
    pageTitle: 'Could Not Find Page', 
    path: '/404',
    isAuthenticated : req.isLoggedIn});
  };
  