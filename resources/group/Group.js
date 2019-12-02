"use strict";

const GroupModel = require('../../models/GroupModel');
const UserModel = require('../../models/UserModel');

class Contact {

    createGroup(req, res) {
    
        const { body } = req;
         GroupModel.createGroup(body, (err, result) => {
            if(err) throw err;
            GroupModel.groupMembersAssoc(
                body.adminId,
                result.insertId,
                body.groupMembers,
                (err, result3) => {
                if(err) throw err;
                const grpId = result.insertId; 
                GroupModel.findGroupById(grpId, (err, result4)=>{
                   
                    let { groupMembers } = body;
                    groupMembers = groupMembers.join("','");
                    UserModel.findUserByIds(groupMembers, (err, rows)=>{
                        const createdGroupResponse = result4[0];
                        createdGroupResponse.groupMembers = rows;
                        res.send({
                            success:true,
                            result:createdGroupResponse 
                        });
                    });
                });
            });
        });
    }
}

module.exports = Contact;