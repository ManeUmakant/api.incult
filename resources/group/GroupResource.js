const GroupRouter = require('express').Router();
const Group = require('./Group');
const TokenMiddleware = require('../../util/TokenMiddleware');

let group = new Group();
GroupRouter.post('/createGroup', group.createGroup)
.put('/updateGroup/:id', group.updateGroup)
.delete('/deleteGroup/:id', group.deleteGroup);

module.exports = GroupRouter;


