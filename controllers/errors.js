// Handles 404 error and sets page title to page not found.
exports.get404 = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
  };
  