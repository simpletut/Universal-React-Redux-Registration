const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true
    },
    postText: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Post = mongoose.model('Post', postSchema);

function validatePost(post){
    const schema = {
        postTitle: Joi.string().required(),
        postText: Joi.string().required(),
        userID: Joi.objectId().required()
    }

    return Joi.validate(post, schema);
}

exports.postSchema = postSchema;
exports.Post = Post;
exports.validate = validatePost;