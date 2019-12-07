"use strict";

const GroupModel = require('../../models/GroupModel');
const UserModel = require('../../models/UserModel');
const GroupUtil = require('../../util/GroupUtil');
const fs = require('fs');
class Contact {

    createGroup(req, res) {
    
        const { body } = req;
        const { grp_icon,adminId,grp_name } = body;
        if(grp_icon !== '') {
            const fileName = `${Date.now()}.png`;
            var uploadPath = `uploads/group_dps/${adminId}_${grp_name}`
            , path = `${__dirname}/../../${uploadPath}/${fileName}`;
            if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
            else {
                let files = fs.readdirSync(uploadPath);
                for(let file of files) fs.unlinkSync(`${uploadPath}/${file}`);
            } 
            GroupUtil.uploadBase64Image(path,grp_icon);
            body.grp_icon = uploadPath + '/' + fileName; 
        }
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
                   
                    let { groupMembers,adminId } = body;
                    groupMembers = groupMembers.join("','");
                    UserModel.findUserByIds(groupMembers, (err, rows)=>{
                        const createdGroupResponse = result4[0];
                        createdGroupResponse.adminId = adminId;
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
                                const userIds = users.map(row=>{
                                    return row.user_id;
                                }).join("','");
                                const adminId = users.filter(row=>{
                                    return row.is_admin_user == 1;
                                });
                                UserModel.findUserByIds(userIds, (err, rows)=>{
                                    const createdGroupResponse = result4[0];
                                    createdGroupResponse.adminId = adminId[0].user_id;
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