const ChatsRouter = require('express').Router();
const Chats = require('./Chats');
const TokenMiddleware = require('../../util/TokenMiddleware');

let chats = new Chats();
//TokenMiddleware.checkToken
ChatsRouter.post('/insertChat', chats.insertChat);
ChatsRouter.get('/getChatById/:id', chats.getChatById);
ChatsRouter.get('/getCultMessagesByRoomIdAndUserId/:userId/:roomId', chats.getCultMessagesByRoomIdAndUserId);

module.exports = ChatsRouter;