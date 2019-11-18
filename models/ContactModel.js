"use strict";

const ContactModel = {};
const db = require('../config/db');

ContactModel.findContactsByPhoneNumbers = function(contactList, done) {
    const conn = db.getInstance();
    const query = `select * from users where user_phone in ('${contactList}') `; 
    console.log('query',query);
    conn.query(query, done);
}

module.exports = ContactModel;