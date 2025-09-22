const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
    const { username, password } = req.body;

    //find user by username
    User.findOne({ username: username })
        .then((user) => {
            if (user) {
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {
                        // if passwords match store user session
                        //requests are sent with the data of the authenticated user (current user)
                        req.session.userId = user._id;
                        res.redirect('/');
                    }
                    else {
                        req.flash('data', {username: req.body.username, password: req.body.password})
                        req.flash('loginError', "Password is incorrect. Please try again.");
                        res.redirect('/auth/login');
                    }
                });
            }
        })
        .catch((error) => {
            req.flash('loginError', "Password is incorrect. Please try again.");
            req.flash('data', req.body);
            res.redirect('/auth/login');
        });
};