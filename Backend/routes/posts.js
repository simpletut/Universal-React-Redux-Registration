const auth = require('./../middleware/auth');
const _ = require('lodash');
const { Post, validate } = require('./../models/posts');

const express = require('express');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const post = new Post(
        _.pick(req.body, ["postTitle", "postText", "userID"])
    );

    await post.save();

    res.send(_.pick(post, ["_id"]));
});

router.get('/', async (req, res) => {

    const posts = await Post.find().populate({ path: 'userID', select: '-password -_id'});

    res.send(posts);
})


module.exports = router;