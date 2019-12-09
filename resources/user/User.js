"use strict";
const fs = require('fs');
const UserModel = require('../../models/UserModel');
const FileUploader = require('../../util/FileUploader');
const CommonUtil = require('../../util/CommonUtil');
class User {

    async uploadProfilePhoto(req, res){

        const userId = req.params.id;
        let rows = await UserModel.findUserById(userId);
        if(rows.length === 0) return  res.status(404).send();
        var uploadPath = "uploads/" + userId
        , path = __dirname + "/../../" + uploadPath
        if (!fs.existsSync(path)) fs.mkdirSync(path);   
        else CommonUtil.removeFilesFromDir(path);
         /* {
            let files = fs.readdirSync(path);
            for(let file of files) fs.unlinkSync(`${path}/${file}`);
        } */
        const fileObj = req.files.filename;
        FileUploader.uploadFile(path, fileObj);
        let obj = {};
        obj.avatarPath = `${uploadPath}/${fileObj.name}`;
        obj.userId = userId;
        await UserModel.updateUserAvatar(obj);
        rows[0].user_avatar = obj.avatarPath;
        res.status(200).send({
            success:true,
            profile:rows[0]
        });
    }

    async createProfile(req, res){

        try {
            const { id } = req.params;
            const rows = await UserModel.findUserById(id);
            if(rows.length === 0) return  res.status(404).send();
            let profileBody = {};
            const { user_name, user_email } = req.body;
            profileBody.userId = id;
            profileBody.userName = user_name;
            profileBody.userEmail = user_email;
            await UserModel.updateUserProfile(profileBody);
            rows[0].user_name = user_name;
            rows[0].user_email = user_email;
            res.status(200).send({
                success:true,
                profile:rows[0]
            });
        }
        catch(e) {
            res.status(500).send({error:new Error(e).stack});
        }
    }

    async getUserProfile(req, res){
        try {
            let result = await UserModel.findUserById(req.params.id);
            res.status(200).send({
                success:true,
                profile:result
            });
        }
        catch(e) {
            res.status(500).send({success:false, error: new Error(err).stack});
        }   
    }
    
}


module.exports = User;