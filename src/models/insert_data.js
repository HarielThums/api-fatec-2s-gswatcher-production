// #############################################################################
//                                     HEADER
// #############################################################################
// Produced by Cluster8
const db = require('../config/database')

    async function insert_data(input){
        Promise.all([insertDEV(input), insertPROJETO(input), insertSTATUS(input),insertSISTEMA(input)])
    }
  
    async function insertDEV(input) {

        const sl_dev = input.tbl_dev;

        // Loop through each element of data required to be included on DB. 
        for (var i = 0, l = sl_dev.length; i < l; i++) {
            let test;
            let variable = sl_dev[i];
            (async () => {
                test = await verify(variable)
                await insert_data(test, variable);
            })();

        	// At first, verify if this ID already exists on DB:
        	async function verify(variable) {
        		query_verify = "select exists(select 1 from tbl_dev where dev_id='"+variable.id+"');"
        		let { rows } = await db.query(query_verify)
        		let test = rows[0].exists;
        		return test;
        	}

        	// Include data on DB only if the same ID does not exists yet on DB:
        	async function insert_data(test, variable) {
        		if (!test){
        			query_populate = "INSERT INTO tbl_dev (DEV_ID, NOME, SOBRENOME, EMAIL, FOTO) VALUES ('"+variable.id+"', '"+variable.first_name+"', '"+variable.last_name+"', '"+variable.email+"', '"+variable.avatar+"');";
        			await db.query(query_populate)
        		}
        	}
        }
    }

    async function insertPROJETO(input) {

        // Treating projects data: 
        var projeto = input.tbl_project;

        // Loop through each element of data required to be included on DB. 
        for (var i = 0, l = projeto.length; i < l; i++) {

        	let test;
        let variable = projeto[i];

        (async () => {
        test = await verify(variable)
        await insert_data(test, variable);
        	})();

        	// At first, verify if this name already exists on DB:
        	async function verify(variable) {
        		query_verify = "select exists(select 1 from tbl_projeto where projeto_nome='"+variable+"');"
        		let { rows } = await db.query(query_verify)
        		let test = rows[0].exists;
        		return test;
        	}

        	// Include data on DB only if the same ID does not exists yet on DB:
        	async function insert_data(test, variable) {
        		if (!test){
        			query_populate = "INSERT INTO tbl_projeto (PROJETO_NOME) VALUES ('"+variable+"');";
        			await db.query(query_populate)
        		}
        	}
        }
    }


    async function insertSTATUS(input) {

        // Treating projects data: 
        let status = input.tbl_status;

        // Loop through each element of data required to be included on DB. 
        for (var i = 0, l = status.length; i < l; i++) {

        	let test;
            let variable = status[i];


            (async () => {
                test = await verify(variable)
                await insert_data(test, variable);
            })();

        	// At first, verify if this name already exists on DB:
        	async function verify(variable) {
        		query_verify = "select exists(select 1 from tbl_status where status_nome='"+variable+"');"
        		let { rows } = await db.query(query_verify)
        		let test = rows[0].exists;
        		return test;
        	}

        	// Include data on DB only if the same ID does not exists yet on DB:
        	async function insert_data(test, variable) {
        		if (!test){
        			query_populate = "INSERT INTO tbl_status (STATUS_NOME) VALUES ('"+variable+"');";
        			await db.query(query_populate)
        		}
        	}
        }
    }


    async function insertSISTEMA(input) {

        // Treating projects data: 
        var sistema = input.tbl_sistema;

        // Loop through each element of data required to be included on DB. 
        for (var i = 0, l = sistema.length; i < l; i++) {

        	let test;
            let variable = sistema[i];


            (async () => {
                test = await verify(variable)
                await insert_data(test, variable);
        	})();

        	// At first, verify if this name already exists on DB:
        	async function verify(variable) {
        		query_verify = "select exists(select 1 from tbl_sistema where sistema_nome='"+variable+"');"
        		let { rows } = await db.query(query_verify)
        		let test = rows[0].exists;
        		return test;
        	}

        	// Include data on DB only if the same ID does not exists yet on DB:
        	async function insert_data(test, variable) {
        		if (!test){
        			query_populate = "INSERT INTO tbl_sistema (SISTEMA_NOME) VALUES ('"+variable+"');";
        			await db.query(query_populate)
        		}
        	}
        }
    }
    

module.exports = insert_data;