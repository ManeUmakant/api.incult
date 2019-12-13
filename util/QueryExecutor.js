const db = require('../config/db');
const util = require('util');
const conn = db.getInstance();

class QueryExecutor{

    static async execute(sqlQuery) {
        try {
            const query = util.promisify(conn.query).bind(conn);
            const result = await query(sqlQuery);
            return result;
        }catch(e) {
            throw e;
        }
    }
    
}

module.exports = QueryExecutor;