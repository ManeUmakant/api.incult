"use strict";

const { db } = require('../config/config');
const mysql = require('mysql');

var conn = (function () {
  var instance;
  function createInstance() {

      const { HOST, USERNAME, PASSWORD, DBNAME } = db;
      const connection = mysql.createConnection({
            host: HOST,
            user: USERNAME,
            password: PASSWORD,
            database: DBNAME
      });
     connection.connect();
     return connection;
  }

  return {
      getInstance: function () {
          if (!instance) {
              instance = createInstance();
          }
          return instance;
      }
  };
})();

module.exports = conn;
