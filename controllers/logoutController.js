module.exports = (req, res) => {
    req.session.destroy(() => {//destroy all session data including the session user id
        res.redirect('/')
    })
}