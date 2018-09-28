const auth = require('./../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validate} = require('./../models/user');

const express = require('express');

const router = express.Router();

// get current user
router.get('/current-user', auth, async (req,res,next) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);    
});

// register new user
router.post('/', async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already exists.')

    user = new User(
        _.pick(req.body, ['fName', 'lName', 'email', 'username', 'password'])
    );

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id']));
});

module.exports = router;