const BlogPost = require('../models/BlogPost')
const path = require('path');

module.exports = async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id).populate('userid');
    res.render('post',{
        blogpost
    })
    console.log(path.resolve(__dirname,'../../..'));
}