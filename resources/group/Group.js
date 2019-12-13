"use strict";

const GroupModel = require('../../models/GroupModel');
const UserModel = require('../../models/UserModel');
const fs = require('fs');
const FileUploader = require('../../util/FileUploader');
const CommonUtil = require('../../util/CommonUtil');
class Contact {
    
    static groupImageUpload(req,groupId) {
        var uploadPath = `uploads/group_dps/${groupId}`;
        if (!fs.existsSync(uploadPath))  fs.mkdirSync(uploadPath);
        else CommonUtil.removeFilesFromDir(uploadPath);
        const fileObj = req.files.grp_icon;
        FileUploader.uploadFile(uploadPath, fileObj);
        return uploadPath + '/' + fileObj.name;
    }

    async createGroup(req, res) {

        try {
            const { body } = req;  
            const { adminId } = body;
            body.grp_icon = '';
            const result = await GroupModel.createGroup(body);
            const grpId = result.insertId; 
            if(req.files) { 
                body.grp_icon = Contact.groupImageUpload(req,grpId);
                await GroupModel.updateGroupInfo(grpId,body);
            }    
            let { groupMembers } = body;
            groupMembers = JSON.parse(groupMembers);
            await GroupModel.groupMembersAssoc(
                adminId,
                grpId,
                groupMembers
            );
            const result4 = await GroupModel.findGroupById(grpId);
            groupMembers = groupMembers.join("','");
            const rows = await UserModel.findUserByIds(groupMembers);
            const createdGroupResponse = result4[0];
            createdGroupResponse.adminId = adminId;
            createdGroupResponse.groupMembers = rows;
            res.send({
                success:true,
                result:createdGroupResponse 
            });
        }
        catch(e) {
            throw e;
        }
    }

    async updateGroup(req, res) {
        
        const { body, params } = req;
        const groupId = params.id;
        const { grp_name } = body;
        if(req.files) body.grp_icon = Contact.groupImageUpload(req, groupId,grp_name);
        try {
            await GroupModel.updateGroupInfo(groupId,body);
            const result4 = await GroupModel.findGroupById(groupId);
            const users = await GroupModel.findUsersByGroupId(groupId);
            if(users.length > 0) {
                const userIds = users.map(row=>{
                    return row.user_id;
                }).join("','");
                const adminId = users.filter(row=>{
                    return row.is_admin_user == 1;
                });
                const rows = await UserModel.findUserByIds(userIds);
                const createdGroupResponse = result4[0];
                createdGroupResponse.adminId = adminId[0].user_id;
                createdGroupResponse.groupMembers = rows;
                res.status(200);
                res.send({
                    success:true,
                    result:createdGroupResponse 
                }); 
            }  
        }
        catch(e) {
            throw e;
        }
    }

    async deleteGroup(req, res){

        const groupid = req.params.id;
        await GroupModel.deleteGroupById(groupid);
        res.status(200).send({
            message : "Group deleted",
	        status : "success"
        });
    }
}

module.exports = Contact;