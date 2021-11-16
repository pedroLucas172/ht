/* eslint-disable new-cap */
import showRoutes from '../../lib/tools/show_routes';
import gelbooruHandler from './posts_sources/gel';
import rule34Handler from './posts_sources/r34';

const booruRouter = require('express').Router();

booruRouter.get('/', showRoutes('./src/routes/posts/posts_sources'));
booruRouter.get('/gel', gelbooruHandler);
booruRouter.get('/r34', rule34Handler);

module.exports = booruRouter;


