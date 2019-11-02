"use strict";

const UserRouter = require('express').Router();
const User = require('./User');
const TokenMiddleware = require('../../util/TokenMiddleware');
const { userValidationRules, validate } = require('./validators');

const user = new User();
UserRouter
.post('/uploadProfilePhoto/:id', TokenMiddleware.checkToken, user.uploadProfilePhoto)
.post('/createProfile/:id', TokenMiddleware.checkToken, userValidationRules(),validate,user.createProfile)
.get('/getUserProfile/:id', TokenMiddleware.checkToken, user.getUserProfile);


module.exports = UserRouter;

