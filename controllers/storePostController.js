const BlogPost = require('../models/BlogPost.js')
const path = require('path');
module.exports = (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', 'public/img', image.name))
        .then(() => BlogPost.create({ ...req.body, image: '/img/' + image.name, userid: req.session.userId }))
        .then(blogpost => res.redirect('/'))
        .catch(error => console.log(error))
}