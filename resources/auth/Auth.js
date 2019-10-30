"use strict";

const HttpStatus = require('http-status-codes');
const Message99Service = require('../../services/Message99Service');

class Auth{
    
   async generateOtp(req, res){

        let number = req.headers.number;
        if(number) {
            let msessage99Service = new Message99Service();
            msessage99Service.number = number;
            await msessage99Service.sendOtp();
            if(msessage99Service.otpResult) 
                res.status(HttpStatus.OK).send({success:true, message:`Otp has been sent to ${number}`});
            else res.status(HttpStatus.SERVICE_UNAVAILABLE).send({success:false, message:'error'});    
        }
        else res.status(HttpStatus.BAD_REQUEST).send();
    }

    async verifyOtp(req, res){

        const {number, otp } = req.headers;
        if(number && otp) {
            let msessage99Service = new Message99Service();
            msessage99Service.number = number;
            msessage99Service.otp = otp;
            await msessage99Service.validateOtp();
            if(msessage99Service.otpResult)
            res.status(HttpStatus.OK).send({success:true});
            else res.status(HttpStatus.NOT_FOUND).send({success:false, message:this.error});    
        }
        else res.status(HttpStatus.BAD_REQUEST).send({});
    }

    createProfile(req, res){
        res.status(HttpStatus.CREATED);
        res.send("success");
    }
}

module.exports = Auth;