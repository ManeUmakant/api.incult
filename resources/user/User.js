"use strict";
const fs = require('fs');
const multer = require('multer');
const UserModel = require('../../models/UserModel');
class User {

    uploadProfilePhoto(req, res){

        const userId = req.params.id;
        
        UserModel.findUserById(userId, (err, rows)=>{
            if(err) throw err;
            if(rows.length === 0) return  res.status(404).send();
             
            var uploadPath = "uploads/" + userId
            , path = __dirname + "/../../" + uploadPath
            , fileName = "";

            if (!fs.existsSync(path)) fs.mkdirSync(path);   
            else {
                let files = fs.readdirSync(path);
                for(let file of files) fs.unlinkSync(`${path}/${file}`);
            }
            var Storage = multer.diskStorage({
                destination: function(req, file, callback) {
                    callback(null, path);
                },
                filename: function(req, file, callback) {
                    fileName = file.originalname;
                    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                        return callback(new Error('Only image files are allowed!'));
                    }
                    callback(null, file.originalname);
                }
            });
            var upload = multer({storage: Storage}).any();
            upload(req,res,function(err) {
                if(err) {
                    return res.status(400).send({
                        success:false,
                        error:new Error(err).stack
                    });
                } 
                else {
                    let obj = {};
                    obj.avatarPath = `${uploadPath}/${fileName}`;
                    obj.userId = userId;
                    UserModel.updateUserAvatar(obj);
                    rows[0].user_avatar = obj.avatarPath;
                    res.status(200).send({
                        success:true,
                        profile:rows[0]
                    });
                }
            });

        });
    }

    createProfile(req, res){

        let profileBody = {};
        const { id } = req.params;
        const { user_name, user_email } = req.body;
        profileBody.userId = id;
        profileBody.userName = user_name;
        profileBody.userEmail = user_email;
        UserModel.findUserById(id, (err, rows)=>{
            if(err) throw err;
            if(rows.length === 0) return  res.status(404).send();
            UserModel.updateUserProfile(profileBody, (err)=>{
                if(err) throw err;
                rows[0].user_name = user_name;
                rows[0].user_email = user_email;
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