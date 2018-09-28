const auth = require('./../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validatePassword} = require('./../models/user');

const express = require('express');
const router = express.Router();

// update password
router.put('/', auth, async (req,res,next) => {
    const {error} = validatePassword(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    user = await User.findById(req.user._id);
    if(!user) return res.status(404).send('User account not found.');

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    user.save();
    res.status(200).send(_.pick(user, ['_id']));
});

module.exports = router;