"use strict";
const config = require('../config/config');
const axios = require('axios');

class Message91Service {

    async sendOtp(){
        try{
            const { message91Service } = config;
            const url = `${message91Service.serviceUrl}/otp?sender=${message91Service.sender}&mobile=${this.number}&authkey=${message91Service.authKey}`;
            let result = await axios.post(url);
            const { data } = result;
            console.log('data', data);
            this.otpResult = data.type === 'success';
        }
        catch(e){
            this.error = new Error(e).stack;
            this.otpResult = false;
        }
    }

    async validateOtp(){

        try{
            const { message91Service } = config;
            const url = `${message91Service.serviceUrl}/otp/verify?otp=${this.otp}&mobile=${this.number}&authkey=${message91Service.authKey}`;
            let result = await axios.post(url);
            const { data } = result;
            this.otpResult = data.message === 'OTP verified success' && data.type === 'success';
            if(!this.otpResult) this.error = data.message;
        }
        catch(e){
            console.log(e);
            this.error = new Error(e).stack;
            this.otpResult = false;
        }
    }
    
}

module.exports = Message91Service;