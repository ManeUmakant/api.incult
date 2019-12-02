"use strict";

const GroupModel = {};
const db = require('../config/db');

 GroupModel.createGroup = (groupObj,done) =>{
    const conn = db.getInstance();
    const { grp_name, grp_desc, grp_icon } = groupObj;
    const query = `INSERT INTO chat_group (grp_id, grp_name, grp_desc, grp_icon) 
    VALUES (NULL, '${grp_name}', '${grp_desc}', '${grp_icon}' )`;
    conn.query(query, done);
}

GroupModel.groupMembersAssoc = (adminId,grpId, groupMembers, done) => {
    
    const conn = db.getInstance();
    var query = `INSERT INTO chat_group_user_assoc 
    (id, grp_id, user_id, is_admin_user) VALUES (NULL, '${grpId}', '${adminId}', '1'),`;
    for(let grpMemberId of groupMembers) {
        query += ` (NULL, '${grpId}', '${grpMemberId}', '0'),`;   
    }
    query = query.substring(0, query.length - 1);
    return conn.query(query, done);   
}

GroupModel.findGroupById = (groupId, done) => {
    const query = `select * from chat_group where grp_id='${groupId}' `;
    const conn = db.getInstance();
    return conn.query(query, done);
}


module.exports = GroupModel;
