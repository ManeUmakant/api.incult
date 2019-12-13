const GroupRouter = require('express').Router();
const Group = require('./Group');
const TokenMiddleware = require('../../util/TokenMiddleware');

let group = new Group();
GroupRouter.post('/createGroup', TokenMiddleware.checkToken ,group.createGroup)
.put('/updateGroup/:id',TokenMiddleware.checkToken ,group.updateGroup)
.delete('/deleteGroup/:id',TokenMiddleware.checkToken,group.deleteGroup);

module.exports = GroupRouter;


