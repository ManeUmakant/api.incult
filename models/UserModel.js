"use strict";
const UserModel = {};
const QueueExecutor = require('../util/QueryExecutor');

 UserModel.findUserById = async (userId) =>{
    try {
        const result = await QueueExecutor.execute(`select * from users where user_id=${userId}`);
        return result;
    }catch(e) {
        throw e;
    }   
}

UserModel.findUserByIds = async (userIds) => {
    const query = `select * from users where user_id in ('${userIds}') `; 
    const result = QueueExecutor.execute(query);
    return result;  
};

UserModel.findUserByPhone = async (number) =>{

    const query = `select * from users where user_phone=${number}`;
    const result = await QueueExecutor.execute(query);
    return result;
}

UserModel.createUser = async (obj) =>{

    if(!obj.number) obj.number = 'NULL';
    if(!obj.userName) obj.userName = 'NULL';
    if(!obj.userEmail) obj.userEmail = 'NULL';
    const query = `INSERT INTO users (user_name, user_email, user_phone) VALUES (${obj.userName}, ${obj.userEmail}, ${obj.number})`;
    const result = await QueueExecutor.execute(query);
    return result;
}

UserModel.updateUserAvatar = async (obj) =>{
    let query = `UPDATE users SET user_avatar = '${obj.avatarPath}' WHERE user_id = ${obj.userId}`;
    await QueueExecutor.execute(query);
}

UserModel.updateUserProfile =   async (obj) => {
     let query = `UPDATE users SET user_name = '${obj.userName}', user_email='${obj.userEmail}'  WHERE user_id = ${obj.userId}`;
    try {
        const result = await QueueExecutor.execute(query);
        return result;
    }catch(e) {
        throw e;
    }
}

module.exports = UserModel;
