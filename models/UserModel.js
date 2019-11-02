"use strict";

const UserModel = {};
const db = require('../config/db');


const BASE_URL = __dirname;

 UserModel.findUserById = (userId,done) =>{
 
    const conn = db.getInstance();
    conn.query(`select * from users where user_id=?`,[userId], done);
}

UserModel.findUserByPhone = (number, done) =>{
    const conn = db.getInstance();
    conn.query(`select * from users where user_phone=?`,[number], done);
}

UserModel.createUser = (obj,done) =>{
    const conn = db.getInstance();
    if(!obj.number) obj.number = 'NULL';
    if(!obj.userName) obj.userName = 'NULL';
    if(!obj.userEmail) obj.userEmail = 'NULL';
    conn.query(`INSERT INTO users (user_name, user_email, user_phone) VALUES (${obj.userName}, ${obj.userEmail}, ${obj.number})`, done);
}

UserModel.updateUserAvatar = (obj,done) =>{
    const conn = db.getInstance();
    let query = `UPDATE users SET user_avatar = '${obj.avatarPath}' WHERE user_id = ${obj.userId}`;
    conn.query(query, done);
}

UserModel.updateUserProfile = (obj, cb) => {
    const conn = db.getInstance();
    let query = `UPDATE users SET user_name = '${obj.userName}', user_email='${obj.userEmail}'  WHERE user_id = ${obj.userId}`;
    conn.query(query, cb);
}

module.exports = UserModel;
