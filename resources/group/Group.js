"use strict";

const GroupModel = require('../../models/GroupModel');
const UserModel = require('../../models/UserModel');
const GroupUtil = require('../../util/GroupUtil');
const fs = require('fs');
const FileUploader = require('../../util/FileUploader');
const HttpStatus = require('http-status-codes');


class Contact {

    createGroup(req, res) {

        const { body } = req;
        // const { adminId,grp_name } = body;
        // if(req.files) {
        //     var uploadPath = `uploads/group_dps/${adminId}_${grp_name}`;
        //     if (!fs.existsSync(uploadPath)) { console.log('ss'); fs.mkdirSync(uploadPath);}
        //     else {
        //         let files = fs.readdirSync(uploadPath);
        //         for(let file of files) fs.unlinkSync(`${uploadPath}/${file}`);
        //     }
        //     const fileObj = req.files.grp_icon;
        //     FileUploader.uploadFile(uploadPath, fileObj);
        //     body.grp_icon = uploadPath + '/' + fileObj.name;
        // }
         GroupModel.createGroup(body, (err, result) => {
            if(err) throw err;
            let { groupMembers } = body;
            groupMembers = groupMembers;
            GroupModel.groupMembersAssoc(
                body.adminId,
                result.insertId,
                groupMembers,
                (err, result3) => {
                if(err) throw err;
                const grpId = result.insertId; 
                GroupModel.findGroupById(grpId, (err, result4)=>{
                   
                    let { adminId } = body;
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

    uploadGroupIcon(req, res) {

         const grpId = req.params.id;
         if(req.files && grpId) {
             var uploadPath = `uploads/group_dps/${grpId}`;
             if (!fs.existsSync(uploadPath)) {
                 console.log('ss');
                 fs.mkdirSync(uploadPath);
             }
             else {
                 let files = fs.readdirSync(uploadPath);
                 for (let file of files) fs.unlinkSync(`${uploadPath}/${file}`);
             }
             const fileObj = req.files.grp_icon;
             FileUploader.uploadFile(uploadPath, fileObj);
             const grp_icon = uploadPath + '/' + fileObj.name;
             GroupModel.updateGroupIcon(grp_icon, grpId);
             res.status(HttpStatus.OK).send({
                     success:true,
                     message:"Group icon uploaded"
             });
         }
         else {
             res.status(HttpStatus.BAD_REQUEST).send({
                 message:"Bad Request"
             })
         }

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