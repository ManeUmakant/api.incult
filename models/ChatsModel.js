"use strict";

const ChatModel = {};
const db = require('../config/db');

ChatModel.insertChat = (cultObj,done) => {
    const conn = db.getInstance();
    const { from_user_id, message,message_type, media_url,media_size } = cultObj;
    const query = `INSERT INTO user_chats (chat_id, from_user_id, message, message_type,media_url,media_size) 
    VALUES (NULL, '${from_user_id}','${message}', '${message_type}' , '${media_url}', '${media_size}' )`;
    conn.query(query, done);
}

ChatModel.findChatById = (id, done) => {
    const conn = db.getInstance();
    conn.query(`select * from user_chats where chat_id=?`,[id], done);
}

ChatModel.getChatsByUserId = (id, done) => {
    const conn = db.getInstance();
    conn.query(`select * from user_chats where chat_id=?`,[id], done);
}

ChatModel.getCultMessagesByRoomIdAndUserId = (params, done) => {
    const conn = db.getInstance();
    conn.query(`SELECT message from user_chats
    JOIN cult on (from_user_id=cult_user_id)
    where from_user_id = ? and cult_id = ?;`,[params.userId, params.roomId], done);
}

module.exports = ChatModel;
