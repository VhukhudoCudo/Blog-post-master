const customMiddleware = (req, res, next) => {//custom middleware
    console.log('Custom middleware called')
    next()//tells Express that middleware is done and must call the next middleware
}

module.exports = customMiddleware;