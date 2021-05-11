// this middleware was created so that we can use this function throughout the app
// it will redirect the user if they are not loggedin preventing someone from entering the path manually
module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}