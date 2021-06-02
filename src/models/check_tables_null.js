// #############################################################################
//                                     HEADER
// #############################################################################
// Produced by Cluster8
const db = require('../config/database')

    async function check_tables_null(table) {
        let user_test = false;
        let query_usernull = "select count(*) from "+table+";";
        let {rows} = await db.query(query_usernull);
        if (rows[0].count === '0')
        	user_test = true;
        return user_test
    }
 

module.exports = check_tables_null;