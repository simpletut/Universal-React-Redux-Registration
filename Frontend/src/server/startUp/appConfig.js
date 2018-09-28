import express from 'express';
import bodyParser from 'body-parser';
import error from './../middleware/error';

const AppConfig = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('build/public'));
    app.use(error);
};

export default AppConfig;