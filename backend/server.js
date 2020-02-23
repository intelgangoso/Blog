const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRoutes = express.Router();
const PORT = 4000;

let Blog = require('./blog.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/blogs', {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database established successfully!');
});

blogRoutes.route('/').get((req, res)=> {
    Blog.find((err, blogs) => {
        if(err){
            console.log(err);
        } else {
            res.json(blogs);
        }
    });
});

blogRoutes.route('/:id').get((req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        res.json(blog);
    });
})

blogRoutes.route('/add').post((req, res) => {
    let blog = new Blog(req.body);
    
    blog.blog_publish = new Date();

    blog.save()
        .then(blog => {
            res.status(200).json(blog);
        })
        .catch(err => {
            res.status(400).send('adding new blog failed.');
        });
});

blogRoutes.route('/update').put((req, res) => {
    if(req.body && req.body.blog_id) {
        Blog.findById(req.body.blog_id, (err, blog) => {
            if(!blog){
                res.status(404).send('data is not found');
            } else {
                blog.blog_title = req.body.blog_title;
                blog.blog_author = req.body.blog_author;
                blog.blog_description = req.body.blog_description;
                blog.blog_url = req.body.blog_url;
                blog.blog_image = req.body.blog_image;
                blog.blog_publish = new Date();
    
                blog.save()
                    .then(blog => {
                        res.json(blog);
                    })
                    .catch(err => {
                        res.status(400).send('update blog failed.');
                    });
            }
        });
    } else {
        return res.status(400).send('update blog failed.');
    }
});

blogRoutes.route('/delete/:id').delete((req, res) => {
    Blog.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(err => {
        res.status(400).send('update blog failed.');
    });
});

app.use('/blogs', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});

