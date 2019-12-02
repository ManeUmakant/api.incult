const GroupRouter = require('express').Router();
const Group = require('./Group');

let group = new Group();
GroupRouter.post('/createGroup', group.createGroup);

module.exports = GroupRouter;


