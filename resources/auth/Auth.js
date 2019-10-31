"use strict";

const HttpStatus = require('http-status-codes');
const Message91Service = require('../../services/Message91Service');
const UserModel = require('../../models/UserModel');

class Auth{

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
                UserModel.findUserByPhone(number,(err, rows)=>{
                    if(err) throw err;        
                    if(rows.length == 0) {
                        let obj = {};
                        obj.number = number;
                        UserModel.createUser(obj, (err, rows)=>{
                            res.status(HttpStatus.OK).send({success:true});
                        });
                    }
                    else res.status(HttpStatus.OK).send({success:true});
                });
            }
            else res.status(HttpStatus.NOT_FOUND).send({success:false, message:msessage91Service.error});    
        }
        else res.status(HttpStatus.BAD_REQUEST).send({});
    }

    createProfile(req, res){
        res.status(HttpStatus.CREATED);
        res.send("success");
    }
}

module.exports = Auth;