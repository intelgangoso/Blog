const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Blog = new Schema({
    blog_title: {
        type: String
    },
    blog_author: {
        type: String
    },
    blog_description: {
        type: String
    },
    blog_url: {
        type: String
    },
    blog_image: {
        type: String
    },
    blog_publish: {
        type: Date
    }
});

module.exports = mongoose.model('Blog', Blog);