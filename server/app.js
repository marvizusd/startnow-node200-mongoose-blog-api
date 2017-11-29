const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json;
const mongoose = require('mongoose');
const userModel = require('./models/User.js');
const blogModel = require('./models/Blog.js');

mongoose.connect('mongodb://localhost/my-blog', { useMongoClient: true });
mongoose.Promise = Promise;

const app = express();

app.use(morgan('dev'));
app.use(jsonParser());

app.get('/', (req, res) => {
    res.status(200).send();
});

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;