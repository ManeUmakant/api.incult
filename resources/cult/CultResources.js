const CultRouter = require('express').Router();
const Cult = require('./cult');
const TokenMiddleware = require('../../util/TokenMiddleware');

let cult = new Cult();
//TokenMiddleware.checkToken
CultRouter.post('/createCult', cult.createCult);
CultRouter.get('/getCult/:id', cult.getCult);

module.exports = CultRouter;