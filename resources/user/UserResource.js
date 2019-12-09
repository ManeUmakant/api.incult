"use strict";

const UserRouter = require('express').Router();
const User = require('./User');
const TokenMiddleware = require('../../util/TokenMiddleware');
const { userValidationRules, validate } = require('./validators');

const user = new User();
UserRouter
.post('/uploadProfilePhoto/:id',  user.uploadProfilePhoto)
.post('/createProfile/:id', userValidationRules(),validate,user.createProfile)
.put('/updateProfile/:id', TokenMiddleware.checkToken, userValidationRules(),validate,user.createProfile)
.get('/getUserProfile/:id', user.getUserProfile);


module.exports = UserRouter;