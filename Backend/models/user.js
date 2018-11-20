const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        fName: Joi.string().required(),
        lName: Joi.string().required(),
        email: Joi.string().required().email(),
        username: Joi.string().required(),
        password: Joi.string().required()
    }

    return Joi.validate(user, schema);
}

function validateEmail(email){
    const schema = {
        email: Joi.string().required().email()
    }

    return Joi.validate(email, schema);
}

function validateUsername(username){
    const schema = {
        username: Joi.string().required()
    }

    return Joi.validate(username, schema);
}

function validatePassword(password){
    const schema = {
        password: Joi.string().required()
    }

    return Joi.validate(password, schema);
}

function validatePage(page){
    const schema = {
        page: Joi.number().required()
    }

    return Joi.validate(page, schema);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.validateUsername = validateUsername;
exports.validatePage = validatePage;