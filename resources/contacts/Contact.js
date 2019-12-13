"use strict";

const ContactModel = require('../../models/ContactModel');

class Contact {

    async contactSync(req, res) {
        let contactList = req.body.contactList;
        contactList = contactList.join("','");
        const rows = await ContactModel.findContactsByPhoneNumbers(contactList);
        try {
            if(rows.length > 0) 
                res.status(200).send({validContactList:rows});
            else 
                res.status(200).res.send({validContactList:[]});
        
        }catch(e) {
            res.status(500).send(new Error(e).stack);
        }
    }
}

module.exports = Contact;