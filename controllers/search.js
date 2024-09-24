const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    try{
        const blogposts = await BlogPost.find({
            title: new RegExp(req.query.search, 'i')
        });
        console.log('User search with search criteria title:',req.query.search);
        console.log(`The result of search with search criteria is ${blogposts}`)
        res.render('index', {
            blogposts
        })
    }catch(error) {
        console.log(error);
    }

}