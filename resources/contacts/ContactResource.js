const ContactRouter = require('express').Router();
const Contact = require('./Contact');

let contact = new Contact();
ContactRouter.post('/contactSync', contact.contactSync);

module.exports = ContactRouter;


