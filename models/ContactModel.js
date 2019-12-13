"use strict";

const ContactModel = {};
const QueryExeccutor = require('../util/QueryExecutor');

ContactModel.findContactsByPhoneNumbers = async function(contactList) {
    const query = `select * from users where user_phone in ('${contactList}') `; 
    const result = await QueryExeccutor.execute(query);
    return result;
}

module.exports = ContactModel;