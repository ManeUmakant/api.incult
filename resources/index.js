"use strict";

var express = require('express');
var router = express.Router();

/**
 *Router configuration
 *@param:api endpoint
 *@param:file name
 * */ 

router.use('', require('./auth/AuthResource'));
router.use('', require('./user/UserResource'));
router.use('', require('./contacts/ContactResource'));
router.use('', require('./group/GroupResource'));
router.use('', require('./cult/CultResources'));
router.use('', require('./chats/ChatsResources'));


module.exports = router;