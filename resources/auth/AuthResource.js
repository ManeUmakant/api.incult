"use strict";

const AuthRouter = require('express').Router();
const Auth = require('./Auth');


const auth = new Auth();
AuthRouter
.get('/healthCheck', auth.healtchCheck)
.get('/generateOtp', auth.generateOtp)
.get('/verifyOtp', auth.verifyOtp);

module.exports = AuthRouter;

