"use strict";
const fs = require('fs');
const UserModel = require('../../models/UserModel');
const FileUploader = require('../../util/FileUploader');

class User {

    uploadProfilePhoto(req, res){

        const userId = req.params.id;
        UserModel.findUserById(userId, (err, rows)=> {
            if(err) throw err;
            if(rows.length === 0) return  res.status(404).send();    
            
            if(req.files) {
                const fileObj = req.files.user_avatar;
                const fileName = fileObj.name;
                if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return res.status(HttpStatus.BAD_REQUEST).send('Only image files are allowed!');
                }
                var uploadPath = "uploads/" + userId
                , path = __dirname + "/../../" + uploadPath
                if (!fs.existsSync(path)) fs.mkdirSync(path);   
                else {
                    let files = fs.readdirSync(path);
                    for(let file of files) fs.unlinkSync(`${path}/${file}`);
                }
                FileUploader.uploadFile(uploadPath, fileObj);
                let obj = {};
                obj.avatarPath = uploadPath + '/' + fileName;
                obj.userId = userId;
                UserModel.updateUserAvatar(obj);
                rows[0].user_avatar = obj.avatarPath;
                res.status(200).send({
                    success:true,
                    profile:rows[0]
                });
            }
            else {
                res.status(HttpStatus.BAD_REQUEST).send({
                    message:"Bad Request"
                })
            }   
        });
    }

    createProfile(req, res){

        let profileBody = {};
        const { id } = req.params;
        const { user_name, user_email,user_firebase_id } = req.body;
        profileBody.userId = id;
        profileBody.userName = user_name;
        profileBody.userEmail = user_email;
        profileBody.userFirebaseId = user_firebase_id;
        UserModel.findUserById(id, (err, rows)=>{
            if(err) throw err;
            if(rows.length === 0) return  res.status(404).send();
            UserModel.updateUserProfile(profileBody, (err)=>{
                if(err) throw err;
                rows[0].user_name = user_name;
                rows[0].user_email = user_email;
                rows[0].user_firebase_id = user_firebase_id;
                res.status(200).send({
                    success:true,
                    profile:rows[0]
                });
            });    
        });    

    }

    getUserProfile(req, res){
        UserModel.findUserById(req.params.id, (err, rows)=>{
            if(err) res.status(500).send({success:false, error: new Error(err).stack});
            else {
                res.status(200).send({
                    success:true,
                    profile:rows
                });
            }
        });    
    }
    
}


module.exports = User;