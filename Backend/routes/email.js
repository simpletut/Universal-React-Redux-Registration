const auth = require('./../middleware/auth');
const _ = require('lodash');
const {User, validateEmail} = require('./../models/user');

const express = require('express');
const router = express.Router();

// update email
router.put('/', auth, async (req,res,next) => {
    const {error} = validateEmail(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('Email already used.')

    user = await User.findById(req.user._id);
    if(!user) return res.status(404).send('User account not found.');
    user.email = req.body.email;

    user.save();
    res.status(200).send(_.pick(user, ['_id', 'email']));
});

// async email taken
router.post('/unique', async (req,res,next) => {

    const {error} = validateEmail(_.pick(req.body, ['email']));
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    let res_obj = {
        unique: !user ? true : false
    }

    res.status(200).send(res_obj);
});


module.exports = router;