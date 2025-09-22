const User = require('../models/User')

module.exports = (req, res, next) => {
    User.findById(req.session.userId)
        .then(user => {
            if (error || !user) {
                return res.redirect('/');
            }
            next();
        })
        .catch(error => {
            console.log("Login required");
            next();
        });
};



