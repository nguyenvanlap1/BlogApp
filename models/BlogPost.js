const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'please provide title']
    },
    body: {
        type: String,
        required: [true, 'please provide content']
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted:{/* can declare property type with an object like this beacause we need 'default'*/
        type: Date,
        default: new Date()
    },
    image: String
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;