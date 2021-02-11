// this handles the 404 error page
exports.get404 = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
  };
  