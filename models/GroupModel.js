"use strict";

const GroupModel = {};
const QueryExecutor = require('../util/QueryExecutor');

 GroupModel.createGroup = async (groupObj) =>{
    const { grp_name, grp_desc, grp_icon } = groupObj;
    const query = `INSERT INTO chat_group (grp_id, grp_name, grp_desc, grp_icon) 
    VALUES (NULL, '${grp_name}', '${grp_desc}', '${grp_icon}' )`;
    const result = await QueryExecutor.execute(query);
    return result;
}

GroupModel.groupMembersAssoc = async (adminId, grpId, groupMembers) => {
    var query = `INSERT INTO chat_group_user_assoc 
    (id, grp_id, user_id, is_admin_user) VALUES (NULL, '${grpId}', '${adminId}', '1'),`;
    for(let grpMemberId of groupMembers) 
        query += ` (NULL, '${grpId}', '${grpMemberId}', '0'),`;
    query = query.substring(0, query.length - 1);
    const result = await QueryExecutor.execute(query);
    return result;  
}

GroupModel.findGroupById = async (groupId) => {
    const query = `select * from chat_group where grp_id='${groupId}' `;
    const result = await QueryExecutor.execute(query);    
    return result;
}

GroupModel.deleteGroupById = async (groupId) => {
    const query = `delete from chat_group where grp_id='${groupId}' `;
    const removeGroupMemberAssoc = `delete from chat_group_user_assoc where grp_id='${groupId}'`;
    await QueryExecutor.execute(query);
    await QueryExecutor.execute(removeGroupMemberAssoc);    
}

GroupModel.updateGroupInfo = async (groupId,payload) =>  {
    const { grp_name, grp_icon } = payload;
    let query = `UPDATE chat_group SET grp_name='${grp_name}' `;
    if(grp_icon) query += ` ,grp_icon = '${grp_icon}'`;
    query += ` WHERE grp_id = ${groupId}`;
    const result = await QueryExecutor.execute(query);
    return result;
}

GroupModel.findUsersByGroupId =  async (groupId) => {
    const query = `SELECT user_id, is_admin_user FROM chat_group_user_assoc WHERE grp_id=${groupId}`;
    const result = await QueryExecutor.execute(query);
    return result;
}

module.exports = GroupModel;
