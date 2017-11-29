const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.get('/:id', (req, res) => {
    var id = req.params.id;
    console.log('Checking for ID', id);
    User.findOne({ _id: id }, (err, record) => {
        if (record) {
            console.log('In success', record.lastName);
            return res.status(200).send(record);
        } else {
            return res.status(404).send();
        }
    });
});

router.post('/', (req, res) => {
    users = new User({
        firstName: req.param('firstName'),
        lastName: req.param('lastName'),
        email: req.param('email'),
        social: {
            facebook: req.param('facebook'),
            twitter: req.param('twitter'),
            linkedIn: req.param('linkedIn')
        }
    });
    users.save()
         .then(users => {
             console.log('Saved user to DB');
             res.status(201).send(users);
         });
});

router.put('/:id', (req, res) => {
    var id = req.params.id;
    User.findByIdAndUpdate(
        { _id: id },
        {
            firstName: req.param('firstName'),
            lastName: req.param('lastName'),
            email: req.param('email')
        }
    ).then(user => {
        console.log('Saved the user');
        res.status(204).send(user);
    });
});

router.delete('/:id', (req, res) => {
    var id1 = req.param('id');
    var id = id1.replace(':', '');
    User.findByIdAndRemove(
        { _id: id }
    ).then(user => {
        console.log('Removed the user');
        res.status(200).send();
    });
});

module.exports = router;