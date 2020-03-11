const CultRouter = require('express').Router();
const Cult = require('./Cult');
const TokenMiddleware = require('../../util/TokenMiddleware');

let cult = new Cult();
//TokenMiddleware.checkToken
CultRouter.post('/createCult', TokenMiddleware.checkToken, cult.createCult);
CultRouter.get('/getCult/:id', TokenMiddleware.checkToken, cult.getCult);
CultRouter.get('/getCultByUserId/:userId', cult.getCultByUserId);

module.exports = CultRouter;