module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.session.passport) {
            res.locals.login = req.session.passport;
        }

        if (req.isAuthenticated()) {
            return next();
        }

        req.flash('warning_msg', 'Please log in to view that resource');
        res.redirect('/users/login');
    }
};