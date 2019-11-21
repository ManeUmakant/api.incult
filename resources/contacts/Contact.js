"use strict";

const ContactModel = require('../../models/ContactModel');

class Contact {

    contactSync(req, res) {
    
        let contactList = req.body.contactList;
        contactList = contactList.join("','");
        ContactModel.findContactsByPhoneNumbers(contactList,(err, rows)=>{
            if(err) throw err;
            try {
                if(rows.length > 0) {
                    var user;
                    let validContactList =  rows.map(row=>{ 
                        user = {};
                        user[row.user_phone] = row;
                        return user;
                    });
                    res.status(200).send({
                        validContactList:rows
                    })

                }else {
                    res.status(200);
                    res.send({
                        validContactList:[]
                    });
                }
            }catch(e) {
                res.status(500).send(new Error(e).stack);
            }
        });
    }
}

module.exports = Contact;