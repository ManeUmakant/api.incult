"use strict";

const CultModel = require('../../models/CultModel');

class Cult {

    createCult(req, res) {
        
        CultModel.createCult(req.body,(err, result) => {
            if(err) res.status(500).send({success:false, error: new Error(err).stack});
            CultModel.findCultById(result.insertId,(err, result) => {
                if(err) res.status(500).send({success:false, error: new Error(err).stack});
                res.status(200).send({
                   success:true,
                   cult:result
                });
            });
        });
    }

    getCult(req, res) {
        CultModel.findCultById(req.params.id,(err, result) => {
            if(err) res.status(500).send({success:false, error: new Error(err).stack});
            res.status(200).send({
               success:true,
               cult:result
            });
        });
    }

    getCultByUserId(req, res) {
        CultModel.getCultByUserId(req.params,(err, result) => {
            if(err) res.status(500).send({success:false, error: new Error(err).stack});
            res.status(200).send({
               success:true,
               cult:result
            });
        });
    }

}

module.exports = Cult;