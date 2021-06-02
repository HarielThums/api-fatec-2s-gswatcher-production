// #############################################################################
//                                     HEADER
// #############################################################################
// Produced by Cluster8
const db = require('../config/database')

    async function save_data(){
        const tbl_dev = await saveTableContent('tbl_dev')
        const tbl_projeto = await saveTableContent('tbl_projeto')
        const tbl_status = await saveTableContent('tbl_status')
        const tbl_sistema = await saveTableContent('tbl_sistema')    
        return {tbl_projeto, tbl_status, tbl_sistema}
    }  


    async function saveTableContent(input) {
        let { rows } = await db.query(`select * from `+input+`;`);
        return rows;
    }

module.exports = save_data;