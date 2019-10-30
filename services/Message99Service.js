"use strict";
const config = require('../config/config');
const axios = require('axios');

class Message99Service {

    async sendOtp(){
        try{
            const { message99Service } = config;
            const url = `${message99Service.serviceUrl}/otp?sender=${message99Service.sender}&mobile=${this.number}&authkey=${message99Service.authKey}`;
            let result = await axios.post(url);
            const { data } = result;
            this.otpResult = data.type === 'success';
        }
        catch(e){
            this.error = new Error(e).stack;
            this.otpResult = false;
        }
    }

    async validateOtp(){

        try{
            const { message99Service } = config;
            const url = `${message99Service.serviceUrl}/otp/verify?otp=${this.otp}&mobile=${this.number}&authkey=${message99Service.authKey}`;
            let result = await axios.post(url);
            const { data } = result;
            this.otpResult = data.message === 'otp_verified' && data.type === 'success';
        }
        catch(e){
            this.error = new Error(e).stack;
            this.otpResult = false;
        }
    }
    
}

module.exports = Message99Service;