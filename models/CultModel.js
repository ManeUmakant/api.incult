"use strict";

const CultModel = {};
const db = require('../config/db');

CultModel.createCult = (cultObj,done) =>{
    const conn = db.getInstance();
    const { cult_name, cult_user_id, cult_desc,cult_image } = cultObj;
    const query = `INSERT INTO cult (cult_id, cult_name,cult_user_id, cult_desc, cult_image) 
    VALUES (NULL, '${cult_name}','${cult_user_id}','${cult_desc}', '${cult_image}' )`;
    conn.query(query, done);
}

CultModel.findCultById = (id, done) => {
    const conn = db.getInstance();
    conn.query(`select * from cult where cult_id=?`,[id], done);
}

module.exports = CultModel;
