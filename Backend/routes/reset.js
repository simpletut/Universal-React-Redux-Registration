const _ = require('lodash');
const { User, validateEmail } = require('./../models/user');
const generator = require('generate-password');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const bcrypt = require('bcrypt');
const config = require('config');

// reset password
router.put('/', async (req, res, next) => {
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