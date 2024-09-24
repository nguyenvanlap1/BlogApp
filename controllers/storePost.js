const BlogPost = require ('../models/BlogPost');
const path = require('path');

module.exports = async (req, res) => {
    try{
        let imagePath = '';
        if (req.files && req.files.image) {
            let image = req.files.image;
            imagePath = '/img/blogimg/' + image.name;
            await image.mv(path.resolve(__dirname,'..','public/img/blogimg',image.name),(error)=>{
                if (error){
                    console.log(error);
                    return res.redirect('/posts/new');
                    }
                }
            )
        }

        await BlogPost.create({
            ...req.body,
            image: imagePath,
            userid: req.session.userId
        })
        res.redirect('/');

    }catch(error){
        const validationErrors =  Object.keys(error.errors).map(key => error.errors[key].message)
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        return res.redirect('/posts/new');
    }
}
