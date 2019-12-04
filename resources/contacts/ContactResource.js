const ContactRouter = require('express').Router();
const Contact = require('./Contact');
const TokenMiddleware = require('../../util/TokenMiddleware');

let contact = new Contact();
ContactRouter.post('/contactSync', TokenMiddleware.checkToken ,contact.contactSync);

module.exports = ContactRouter;


