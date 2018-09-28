const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('./../models/user');

const express = require('express');

const router = express.Router();

router.post('/', async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid Email or Password.')

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Email or Password.')

    const token = user.generateAuthToken();
    res.send(token);
});

module.exports = router;

function validate(req){
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }

    return Joi.validate(req, schema);
}