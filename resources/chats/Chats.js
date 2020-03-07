"use strict";

const ChatsModel = require('../../models/ChatsModel');

class Cult {

    insertChat(req, res) {
        ChatsModel.insertChat(req.body,(err, result) => {
            if(err) res.status(500).send({success:false, error: new Error(err).stack});
            ChatsModel.findChatById(result.insertId,(err, result) => {
                if(err) res.status(500).send({success:false, error: new Error(err).stack});
                res.status(200).send({
                   success:true,
                   cult:result
                });
            });
        });
    }

    getChatById(req, res) {
        ChatsModel.findChatById(req.params.id,(err, result) => {
            if(err) res.status(500).send({success:false, error: new Error(err).stack});
            res.status(200).send({
               success:true,
               cult:result
            });
        });
    }

    getCultMessagesByRoomIdAndUserId = (req, res) => {
        ChatsModel.getCultMessagesByRoomIdAndUserId(req.params,(err, result) => {
            if(err) res.status(500).send({success:false, error: new Error(err).stack});
            res.status(200).send({
               success:true,
               cult:result
            });
        });
    }

}

module.exports = Cult;