const auth = require('./../middleware/auth');
const _ = require('lodash');
const {User, validateUsername} = require('./../models/user');

const express = require('express');
const router = express.Router();

// async email taken
router.post('/unique', async (req,res,next) => {

    const {error} = validateUsername(_.pick(req.body, ['username']));
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({username: req.body.username});
    let res_obj = {
        unique: !user ? true : false
    }

    res.status(200).send(res_obj);
});


module.exports = router;