module.exports = (req, res) => {
    if (req.session.userId) { //check if session has user ID
        return res.render('create', { createPost: true }); //createPost will only exist and =true when a user visits the route /posts/new.
    }
    res.redirect('/auth/login');

}