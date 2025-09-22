module.exports = (req, res) => {
    let username = "" 
    let password = ""
    const data = req.flash('data')[0];
    if (typeof data != "undefined") {//check if req.flash('data') is undefined
        username = data.username // if not undefined: assign new username and password fields
        password = data.password
    }

    res.render('register', {
        //errors: req.session.validationErrors
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    })
}