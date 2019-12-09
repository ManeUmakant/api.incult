"use strict";

const HttpStatus = require('http-status-codes');
const Message91Service = require('../../services/Message91Service');
const UserModel = require('../../models/UserModel');
let jwt = require('jsonwebtoken');
const config = require('../../config/config');
class Auth{

   healtchCheck(req, res) {
        res.status(200).send({
            success:true,
            message:"Running..."
        });
   } 
    
   async generateOtp(req, res){

        let number = req.headers.number;
        if(number) {
            let msessage91Service = new Message91Service();
            msessage91Service.number = number;
            await msessage91Service.sendOtp();
            if(msessage91Service.otpResult) 
                res.status(HttpStatus.OK).send({success:true, message:`Otp has been sent to ${number}`});
            else res.status(HttpStatus.SERVICE_UNAVAILABLE).send({success:false, message:'error'});    
        }
        else res.status(HttpStatus.BAD_REQUEST).send();
    }

    async verifyOtp(req, res){

        const {number, otp } = req.headers;
      /*   let token = Auth.generateToken(number);
        res.send(token); */
        if(number && otp) {
            let msessage91Service = new Message91Service();
            msessage91Service.number = number;
            msessage91Service.otp = otp;
            await msessage91Service.validateOtp();
            if(msessage91Service.otpResult) {
                UserModel.findUserByPhone(number,(err1, rows)=>{
                    if(err1) throw err1;        
                    if(rows.length === 0) {
                        let obj = {};
                        obj.number = number;
                        UserModel.createUser(obj, (err2, rows)=>{
                            if(err2) throw err2;
                            UserModel.findUserById(rows.insertId, (err3, user)=>{
                                if(err3) throw err3;
                                let userObj = {};
                                userObj.success = true;
                                userObj.userId = rows.insertId;
                                userObj.token = Auth.generateToken(number);
                                userObj.profile = user[0];
                                res.status(HttpStatus.OK).send(userObj);
                            }); 
                        });
                    }
                    else {
                        let userObj = {};
                        userObj.success = true;
                        userObj.userId = rows[0].user_id;
                        userObj.token = Auth.generateToken(number);
                        userObj.profile = rows[0];
                        res.status(HttpStatus.OK).send(userObj);
                    }    
                });
            }
            else res.status(HttpStatus.NOT_FOUND).send({success:false, message:msessage91Service.error});    
        }
        else res.status(HttpStatus.BAD_REQUEST).send({});
    }

    static generateToken(number) {
        return jwt.sign({number: number}, config.auth.jwdSecret,{ expiresIn: '24h'});             
    }

}

module.exports = Auth;