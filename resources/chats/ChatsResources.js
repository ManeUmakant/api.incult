const ChatsRouter = require('express').Router();
const Chats = require('./Chats');
const TokenMiddleware = require('../../util/TokenMiddleware');

let chats = new Chats();
//TokenMiddleware.checkToken
ChatsRouter.post('/insertChat', TokenMiddleware.checkToken, chats.insertChat);
ChatsRouter.get('/getChatById/:id', TokenMiddleware.checkToken, chats.getChatById);
ChatsRouter.get('/getCultMessagesByRoomIdAndUserId/:userId/:roomId', TokenMiddleware.checkToken, chats.getCultMessagesByRoomIdAndUserId);

module.exports = ChatsRouter;