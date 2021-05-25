// #############################################################################
//                                     HEADER
// #############################################################################
// Produced by Cluster8
// Objective: this function verify, create and populate the database
const db = require('../config/database')


async function saveTableContent(input) {
        let { rows } = await db.query(`select * from `+input+`;`);
        return rows;
}


module.exports = saveTableContent;