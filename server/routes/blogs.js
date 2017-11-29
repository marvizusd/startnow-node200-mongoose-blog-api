const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog.find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req, res) => {
    Blog.where({ blogs: 'featured'})
        .then(blogs => {
            console.log('get all featured');
            res.status(200).send(blogs);
        });
});

router.get('/:id', (req, res) => {
    var id = req.params.id;
    console.log('Checking for ID', id);
    Blog.findOne({ _id: id }, (err, record) => {
        if (record) {
            console.log('In success');
            return res.status(200).send(record);
        } else {
            return res.status(404).send();
        }
    });
});

router.post('/', (req, res) => {
    let dbUser = null;
    User.findById(req.body.authorId)
        .then(user => {
            dbUser = user;
            const newBlog = new Blog(req.body);
            newBlog.author = user._id;
            return newBlog.save();
        })
        .then(blog => {
            dbUser.blogs.push(blog);
            dbUser.save()
            .then(() => res.status(201).json(blog));
        })
});

router.put('/:id', (req, res) => {
    var id1 = req.param('id');
    var id = id1.replace(':', '');
    Blog.findByIdAndUpdate(
        { _id: id},
        { title: req.param('title'),
          article: req.param('article'),
          published: req.param('published'),
          featured: req.param('featured') 
        }
    ).then(blogs => {
        console.log('Saved the blog');
        res.status(204).send();
    });
});

router.delete('/:id', (req, res) => {
    var id1 = req.param('id');
    var id = id1.replace(':', '');
    Blog.findByIdAndRemove(
        { _id: id }
    ).then(blogs => {
        console.log('Remove the blog');
        res.status(200).send();
    });
});



module.exports = router;