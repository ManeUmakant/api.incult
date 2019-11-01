"use strict";

const UserRouter = require('express').Router();
const User = require('./User');
const TokenMiddleware = require('../../util/TokenMiddleware');

const user = new User();
UserRouter
.post('/createProfile/:id', TokenMiddleware.checkToken, user.createUserProfile)
.get('/getUserProfile/:id', TokenMiddleware.checkToken, user.getUserProfile);


module.exports = UserRouter;

