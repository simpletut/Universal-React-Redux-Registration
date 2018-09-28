const auth = require('./../middleware/auth');
const _ = require('lodash');
const {User, validate} = require('./../models/user');

const express = require('express');
const router = express.Router();

// auth status
router.get('/', auth, async (req,res,next) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(true);    
});

module.exports = router;