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

    updateGroup(req, res) {
        
        const { body, params } = req;
        const groupId = params.id;
        GroupModel.updateGroupInfo(groupId,body, (err, result)=> {
            if(err) throw err;
            else {
                GroupModel.findGroupById(groupId, (err, result4)=>{
                    GroupModel.findUsersByGroupId(groupId, (err, users) => {
                        if(err) throw err;
                        else {
                            if(users.length > 0) {
                                UserModel.findUserByIds(users.map(row=>{
                                    return row.user_id;
                                }).join("','"), (err, rows)=>{
                                    const createdGroupResponse = result4[0];
                                    createdGroupResponse.groupMembers = rows;
                                    res.status(200);
                                    res.send({
                                        success:true,
                                        result:createdGroupResponse 
                                    });
                                });
                            }
                        }
                    });
                });
            }
        });
    }

    deleteGroup(req, res){

        const groupid = req.params.id;
        GroupModel.deleteGroupById(groupid);
        res.status(200).send({
            message : "Group deleted",
	        status : "success"
        });

    }
}

module.exports = Contact;