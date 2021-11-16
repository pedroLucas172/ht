/* eslint-disable new-cap */
import showRoutes from '../../lib/tools/show_routes';
import ehentaiIndexHandler from './galleries_sources/index';
import ehentaiBestHandler from './galleries_sources/best';
import ehentaiGalleryHandler from './galleries_sources/gallery';



const booruRouter = require('express').Router();

booruRouter.get('/', showRoutes('./src/routes/galleries/galleries_sources'));
booruRouter.get('/index', ehentaiIndexHandler);
booruRouter.get('/best', ehentaiBestHandler);
booruRouter.get('/gallery', ehentaiGalleryHandler);



module.exports = booruRouter;


