"use strict";

const HttpStatus = require('http-status-codes');
const Message91Service = require('../../services/Message91Service');
const UserModel = require('../../models/UserModel');
const TokenMiddleware = require('../../util/TokenMiddleware');
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
        if(number && otp) {
            let msessage91Service = new Message91Service();
            msessage91Service.number = number;
            msessage91Service.otp = otp;
            await msessage91Service.validateOtp();
            if(msessage91Service.otpResult) {
                let rows = await UserModel.findUserByPhone(number);
                let userObj = {};
                userObj.success = true;
                if(rows.length === 0) {
                    let createdRow = await UserModel.createUser({number});
                    let userId = createdRow.insertId;
                    let userProfile = await UserModel.findUserById(userId);
                    userObj.userId = userId;
                    userObj.token = TokenMiddleware.generateToken(number);
                    userObj.profile = userProfile[0];
                }
                else {
                    userObj.userId = rows[0].user_id;
                    userObj.token = TokenMiddleware.generateToken(number);
                    userObj.profile = rows[0]
                }
                res.status(HttpStatus.OK).send(userObj);
            }
            else res.status(HttpStatus.NOT_FOUND).send({success:false, message:msessage91Service.error});    
        }
        else res.status(HttpStatus.BAD_REQUEST).send({});
    }
}

module.exports = Auth;