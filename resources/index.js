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
router.use('', require('./contacts/ContactResource'))

module.exports = router;