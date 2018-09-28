import 'babel-polyfill';
import express from 'express';
import AppConfig from './startUp/appConfig';
import Logger from './startUp/logger';
import MyApp from './routes/index';

const port = process.env.PORT || 8080;
const app = express();

Logger()
AppConfig(app);
MyApp(app);

app.listen(port, () => {
    console.log(`Running on Port ${port}`);
});