const bcrypt = require("bcryptjs");
const User = require('../models/User');
const passport = require("passport");

exports.register = (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;

    const renderError = (message) => {
        let datas = {
            message: message,
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
        };
        return res.render('register', datas);
    };

    if (!name || !email || !password || !passwordConfirm) {
        return renderError("Please fill in all fields");
    }

    if (password !== passwordConfirm) {
        return renderError("Passwords do not match");
    }

    if (password.length < 5) {
        return renderError("Enter minimum 5 characters");
    }

    // Code here will be linted with JSHint.
    /* jshint ignore:start */
    User.findOne({
        email: email
    }).then(async (user) => {
        if (user) {
            return renderError("User already exists");
        } else {
            let hashedPassword = await bcrypt.hash(password, 8);
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });

            newUser.save();
            res.redirect("/users/login");
        }
    }).catch((err) => console.log(err));
    // Code here will be ignored by JSHint.
    /* jshint ignore:end */
};

exports.login = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req, res, next);
};