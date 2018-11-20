const auth = require('./../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('config');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const generator = require('generate-password');
const {User, validate, validateUsername, validateEmail, validatePassword, validatePage} = require('./../models/user');

const express = require('express');
const router = express.Router();

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

// get all users
router.get('/', async (req,res,next) => {
    const users = await User.find().limit(10).select('-password');
    res.send(users);    
});

router.post('/page', async (req,res,next) => {

    const {error} = validatePage(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const page = req.body.page;
    const page_arrayIndex = page - 1;
    const resultsPerPage = 6;
    const totalResults = await User.find().count();
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    
    if(page_arrayIndex > totalPages) return res.status(400).send('Bad Request');

    const skip = page_arrayIndex * resultsPerPage;
    const users = await User.find().select('-password').skip(skip).limit(resultsPerPage);

    const resObj = {
        page,
        resultsPerPage,
        totalResults,
        totalPages,
        results: users
    }

    res.send(resObj);
});

// get current user
router.get('/current-user', auth, async (req,res,next) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);    
});

// check if username is unique
router.post('/username/unique', async (req,res,next) => {

    const {error} = validateUsername(_.pick(req.body, ['username']));
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({username: req.body.username});
    let res_obj = {
        unique: !user ? true : false
    }

    res.status(200).send(res_obj);
});

// manual update email
router.put('/email', auth, async (req,res,next) => {
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

// check if email is unique
router.post('/email/unique', async (req,res,next) => {

    const {error} = validateEmail(_.pick(req.body, ['email']));
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    let res_obj = {
        unique: !user ? true : false
    }

    res.status(200).send(res_obj);
});

// manual update password
router.put('/password', auth, async (req,res,next) => {
    const {error} = validatePassword(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    user = await User.findById(req.user._id);
    if(!user) return res.status(404).send('User account not found.');

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    user.save();
    res.status(200).send(_.pick(user, ['_id']));
});

// reset password
router.put('/reset', async (req, res, next) => {
    const { error } = validateEmail(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send('User account not found.');

    const newPassword = generator.generate({ length: 8, numbers: true, uppercase: false });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.save();

    var mailer = nodemailer.createTransport({
        host: config.get('mailServer.host'),
        auth: {
            user: config.get('mailServer.auth.user'),
            pass: config.get('mailServer.auth.pass')
        }
    });

    mailer.use('compile', hbs({
        viewPath: 'assets/emailTemplates',
        extName: '.hbs'
    }));

    mailer.sendMail({
        from: config.get('mailServer.from'),
        to: req.body.email,
        subject: config.get('mailServer.subject'),
        template: 'reset',
        context: {
            email: req.body.email,
            password: newPassword
        }
    }, function (err) {
        if (err) {
            return res.status(500).send(`500 - Internal Server Error`)
        }

        res.status(200).send(_.pick(user, ['_id']));
    });

});

module.exports = router;