const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}).populate('userid');//references the doc with userID in collection
    console.log(req.session) //to seee what is in the session
    res.render('index', {
        blogposts
    });
}

