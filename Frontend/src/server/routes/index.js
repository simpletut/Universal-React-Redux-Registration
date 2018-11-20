import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from './../../client/routes/index';
import renderer from './../../helpers/renderer';
import createStore from './../../helpers/createStore';

const MyApp = (app) => {
    
    app.get(['/*/:param', '*'], (req, res) => {

        const ParamValue = req.params.param ? req.params.param : null;
    
        const store = createStore(req);
    
        const promises = matchRoutes(Routes, req.path)
            .map(({ route }) => {
                return route.loadData ? route.loadData(store, ParamValue) : null;
            })
            .map(promise => {
                if (promise) {
                    return new Promise((resolve, reject) => {
                        promise.then(resolve).catch(resolve);
                    });
                }
            });
    
        Promise.all(promises).then(() => {
            const context = {};
            const content = renderer(req, store, context);
    
            if (context.url) {
                return res.redirect(301, context.url);
            }
    
            // check if 404
            if (context.notFound) {
                res.status(404);
            }
            res.send(content);
        });
    
    });
}

export default MyApp;