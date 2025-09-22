const validateMiddleware = (req, res, next) => {//validation middleware: checks for null fields
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}

module.exports = validateMiddleware;