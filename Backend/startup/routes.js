const express = require('express');
const error = require('./../middleware/error');
const users = require('./../routes/users');
const auth = require('./../routes/auth');
const status = require('./../routes/authStatus');
const email = require('./../routes/email');
const password = require('./../routes/password');
const reset = require('./../routes/reset');
const username = require('./../routes/username');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/auth-status', status);
    app.use('/api/email', email);
    app.use('/api/password', password);
    app.use('/api/reset', reset);
    app.use('/api/username', username);
    app.use(error);
}