const Pool = require('pg').Pool
require('../config/database')

// EXEMPLO PARA TRANFORMAR FUNÇÃO EM ROTA:
// buscando todos os devs
// exports.listAll_TBL_DEV = async (req, res) => {
//     const response = await db.query(
//       'SELECT * FROM TBL_DEV ORDER BY nome ASC',
//     );
//     res.status(200).send(response.rows);
//   };

const main = function(input){

  //Input for tbl_task and tbl_task_detalhes:
  const sl_dados = input.dados_tratados;  

  // CALLING FUNCTIONS TO BE EXECUTED ON DB:
  let pool;
  (async () => {

  	//Connect to DB:
    pool = new Pool({
    connectionString: process.env.DATABASE_URL
    })
    await console.log('Connected to DB')

    // FOR DEBUG:
    // REMOVE THE COMMENT TO DROP ALL DB TABLES
    //await dropTables();


   	// CREATE ALL DB TABLES
   	await CreateTables();

   	// FOR DEBUG:
    // REMOVE THE COMMENT TO CLEAR ALL DB TABLES
    //await ClearTables();
    //await console.log('cleared')

   	// INSERT USER PAULO, ONLY IF TBL_USUARIO IS EMPTY	
    check = await CheckTablesNull('tbl_usuario');
  	if (check)
		insertPAULO();

    // INSERT DATA ON TABLE TBL_DEV, TBL_PROJETO, TBL_STATUS, TBL_SISTEMA:
    await Insert_data()
    let values = await Save_data()


    await insertRECARGA(values.tbl_projeto,values.tbl_status,values.tbl_sistema);
    

    // REMOVE THE COMMENT TO SHOW TABLE ON PROMPT (pass the table's name as input) 
    //await showRows(tbl_dev);
  })();


  async function Insert_data(){
    Promise.all([insertDEV(), insertPROJETO(), insertSTATUS(),insertSISTEMA()])
  }


async function Save_data(){
    const tbl_dev = await saveTableContent('tbl_dev')
    const tbl_projeto = await saveTableContent('tbl_projeto')
    const tbl_status = await saveTableContent('tbl_status')
    const tbl_sistema = await saveTableContent('tbl_sistema')    
  return {tbl_projeto, tbl_status, tbl_sistema}
  }


  async function CreateTables() {

    let create_table_query = `
    CREATE TABLE IF NOT EXISTS TBL_DEV (
	    DEV_ID varchar PRIMARY KEY,
	    NOME varchar NOT NULL,
	    SOBRENOME varchar not NULL,
	    EMAIL varchar not NULL,
	    FOTO varchar not NULL
    );

    CREATE TABLE IF NOT EXISTS TBL_PROJETO (
	    PROJETO_ID serial PRIMARY KEY,
	    PROJETO_NOME varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS TBL_SISTEMA (
	    SISTEMA_ID serial PRIMARY KEY,
	    SISTEMA_NOME varchar NOT NULL
    );


    CREATE TABLE IF NOT EXISTS TBL_STATUS (
        STATUS_ID serial PRIMARY KEY,
        STATUS_NOME varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS TBL_TASK_DETALHES (
        TASK_DETALHES_ID serial PRIMARY KEY,
        TASK_STATUS_ID int REFERENCES TBL_STATUS(STATUS_ID),
        INICIO timestamptz not NULL,
        TERMINO bool not NULL,
        HORAS real
    );

    CREATE TABLE IF NOT EXISTS TBL_TASK (
      TASK_ID varchar PRIMARY KEY,
      DEV_ID varchar REFERENCES TBL_DEV(DEV_ID),
      PROJETO_ID int REFERENCES TBL_PROJETO(PROJETO_ID),
      TASK_DETALHES int REFERENCES TBL_TASK_DETALHES(TASK_DETALHES_ID),
      NOME varchar not NULL
    );

    CREATE TABLE IF NOT EXISTS TBL_GIT (
        HASH varchar PRIMARY KEY,
	    TASK_ID varchar REFERENCES TBL_TASK(TASK_ID),
	    BRANCH varchar not NULL
    );

    CREATE TABLE IF NOT EXISTS TBL_USUARIO (
	    USUARIO_ID serial PRIMARY KEY,
	    NOME varchar NOT NULL,
	    SOBRENOME varchar not NULL,
	    EMAIL varchar not NULL,
	    SENHA varchar not NULL,
	    FOTO varchar not NULL
    );

    CREATE TABLE IF NOT EXISTS TBL_USUARIO (
	    USUARIO_ID varchar PRIMARY KEY,
	    NOME varchar NOT NULL,
	    SOBRENOME varchar not NULL,
	    EMAIL varchar not NULL,
	    SENHA varchar not NULL,
	    FOTO varchar not NULL
    );
        CREATE TABLE IF NOT EXISTS TBL_RECARGA (
	    RECARGA_ID serial PRIMARY KEY,
	    TASK_ID varchar REFERENCES TBL_TASK(Task_ID),
	    TASK_DETALHES_ID int REFERENCES TBL_TASK_DETALHES(TASK_DETALHES_ID),
	    SISTEMA_ID int REFERENCES TBL_SISTEMA(SISTEMA_ID),
	    USUARIO_ID int REFERENCES TBL_USUARIO(USUARIO_ID),
      	DEV_ID varchar REFERENCES TBL_DEV(DEV_ID),
      	PROJETO_ID int REFERENCES TBL_PROJETO(PROJETO_ID),
      	DATA_RECARGA timestamptz not NULL
    );    
    `
    await pool.query(create_table_query);
  }

  async function ClearTables() {
    await pool.query(`delete from tbl_recarga;
					  delete from tbl_usuario;
    				  delete from tbl_git;
                      delete from tbl_sistema;
                      delete from tbl_task;
                      delete from tbl_task_detalhes;
                      delete from tbl_projeto;                    
                      delete from tbl_status;
                      delete from tbl_dev;
                      `);
  }


  async function dropTables() {
    await pool.query(`drop table tbl_recarga;
					  drop table tbl_usuario;
					  drop table tbl_git;
                      drop table tbl_sistema;
                      drop table tbl_task;
                      drop table tbl_task_detalhes;
                      drop table tbl_projeto;                    
                      drop table tbl_status;
                      drop table tbl_dev;
                      `);
  }

    async function CheckTablesNull(table) {
    	let user_test = false;
    	let query_usernull = "select count(*) from "+table+";";
    	let {rows} = await pool.query(query_usernull);
    	if (rows[0].count === '0')
    		user_test = true;
    	return user_test
    }

	async function insertPAULO() {		
		query_populate = "INSERT INTO tbl_USUARIO (NOME, SOBRENOME, EMAIL, SENHA, FOTO) VALUES ('Paulo', 'Luan', 'paulo_luan@gsw.com', '123', 'https://media-exp1.licdn.com/dms/image/C4D03AQF0rY18r6i0kw/profile-displayphoto-shrink_200_200/0/1588683156710?e=1623888000&v=beta&t=tc7Hl-YS9B1-k6wI8q-CCSfiNBksqJGrsyxxiwtlOzQ');";
      	await pool.query(query_populate)     
	}



  async function insertDEV() {

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
      		let { rows } = await pool.query(query_verify)
      		let test = rows[0].exists;
      		return test;
      	}

      	// Include data on DB only if the same ID does not exists yet on DB:
      	async function insert_data(test, variable) {
      		if (!test){
      			query_populate = "INSERT INTO tbl_dev (DEV_ID, NOME, SOBRENOME, EMAIL, FOTO) VALUES ('"+variable.id+"', '"+variable.first_name+"', '"+variable.last_name+"', '"+variable.email+"', '"+variable.avatar+"');";
      			await pool.query(query_populate)
      		}
  		}
    }
  }


async function insertPROJETO() {

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
      		let { rows } = await pool.query(query_verify)
      		let test = rows[0].exists;
      		return test;
      	}

      	// Include data on DB only if the same ID does not exists yet on DB:
      	async function insert_data(test, variable) {
      		if (!test){
      			query_populate = "INSERT INTO tbl_projeto (PROJETO_NOME) VALUES ('"+variable+"');";
      			await pool.query(query_populate)
      		}
  		}
    }
  }



async function insertSTATUS() {

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
      		let { rows } = await pool.query(query_verify)
      		let test = rows[0].exists;
      		return test;
      	}

      	// Include data on DB only if the same ID does not exists yet on DB:
      	async function insert_data(test, variable) {
      		if (!test){
      			query_populate = "INSERT INTO tbl_status (STATUS_NOME) VALUES ('"+variable+"');";
      			await pool.query(query_populate)
      		}
  		}
    }
  }



async function insertSISTEMA() {

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
      		let { rows } = await pool.query(query_verify)
      		let test = rows[0].exists;
      		return test;
      	}

      	// Include data on DB only if the same ID does not exists yet on DB:
      	async function insert_data(test, variable) {
      		if (!test){
      			query_populate = "INSERT INTO tbl_sistema (SISTEMA_NOME) VALUES ('"+variable+"');";
      			await pool.query(query_populate)
      		}
  		}
    }
}


async function insertRECARGA(tbl_projeto,tbl_status,tbl_sistema) {

  let recarga = sl_dados.map(sl_dados => {
    let properties = {
      "task_id":sl_dados.id,
      "task_detalhes_ID": 0,
      "sistema_nome": sl_dados.sistema,
      "sistema_id": 0,
      "status_nome": sl_dados.status,
      "status_id":0,
      "usuario_id":1,
      "dev_id":sl_dados.user.id,
      "projeto_nome": sl_dados.project,
      "projeto_id":0,
      "inicio": sl_dados.startedAt,
      "termino": sl_dados.finished,
      "horas": sl_dados.amountHours,
      "card_nome": sl_dados.cardDescription
    };
    return properties;});
  
// Loop through each element of data required to be included on DB. 
  for (var i = 0, l = sl_dados.length; i < l; i++) {  

    //find the status_id based on status name:
    let auxliary = tbl_status.find(tbl_status => tbl_status.status_nome === recarga[i].status_nome);
    recarga[i].status_id = auxliary.status_id;

    //find the project_id based on project name:
    let auxliary2 = tbl_projeto.find(tbl_projeto => tbl_projeto.projeto_nome === recarga[i].projeto_nome);
    recarga[i].projeto_id = auxliary2.projeto_id;

    //find the system_id based on system name:
    let auxliary3 = tbl_sistema.find(tbl_sistema => tbl_sistema.sistema_nome === recarga[i].sistema_nome);
    recarga[i].sistema_id = auxliary3.sistema_id;



    let test;
    let variable = recarga[i];

    (async () => {

      //Verify if the task ID already exist on DB:
      test = await verifyID(variable.task_id)

    if(test){

      test2 = await verifySTATUS(variable.task_id, variable.status_nome)
      if(!test2){

        variable.task_detalhes_ID = await insert_data_TASKDETALHES(variable.status_id, variable.inicio, variable.termino, variable.horas);
        await insert_data_RECARGA(variable.task_id, variable.task_detalhes_ID, variable.sistema_id, variable.usuario_id, variable.dev_id, variable.projeto_id);
        await alter_table_TASK(variable.task_id, variable.task_detalhes_ID);     
      }
    }    
    else{
      variable.task_detalhes_ID = await insert_data_TASKDETALHES(variable.status_id, variable.inicio, variable.termino, variable.horas);
      await insert_data_TASK(variable.task_id, variable.dev_id, variable.projeto_id, variable.task_detalhes_ID, variable.card_nome);
      await insert_data_RECARGA(variable.task_id, variable.task_detalhes_ID, variable.sistema_id, variable.usuario_id, variable.dev_id, variable.projeto_id);       
    }           
    })();

  // At first, verify if the task ID already exists on DB:
    async function verifyID(variable) {
        query_verify = "select exists(select 1 from tbl_recarga where task_id='"+variable+"');"
        let { rows } = await pool.query(query_verify)
        let test = rows[0].exists;
        return test;
      }

   // Only if the Task_ID exists on DB, verify if it has the same status:
    async function verifySTATUS(variable, variable2) {
        query_verify = `select status_nome from tbl_status where status_id=
        (select task_status_id from tbl_task_detalhes where task_detalhes_id=
        (select task_detalhes from tbl_task where task_id='`+variable+`'));`
        let { rows } = await pool.query(query_verify)
        let status_verif = rows[0].status_nome;
        (status_verif === variable2)? test = true: test = false;
        return test;
      }

      //Insert data on tbl_task_detalhes
      async function insert_data_TASKDETALHES(task_status_id, inicio, termino, horas){

      //transform into data variables:
        let date_var = new Date()
        date_var = JSON.stringify(inicio);      

        query_populate_task_detalhes = `  
        INSERT INTO tbl_task_detalhes (task_status_id, inicio, termino, horas) 
        VALUES (`+task_status_id+`, '`+date_var+`', `+termino+`, `+horas+`) RETURNING task_detalhes_id;
      `;
      let {rows} = await pool.query(query_populate_task_detalhes);
      return rows[0].task_detalhes_id;
      }

      //Insert data on tbl_task:
      async function insert_data_TASK(task_id, dev_id, projeto_id, task_detalhes, nome){     

        query_populate_task = `  
        INSERT INTO tbl_task (task_id, dev_id, projeto_id, task_detalhes, nome) 
        VALUES ('`+task_id+`', '`+dev_id+`',`+projeto_id+`, `+task_detalhes+`, '`+nome+`');
      `;
      await pool.query(query_populate_task);
      }

      //Insert data on tbl_recarga:
      async function insert_data_RECARGA(task_id, task_detalhes_id, sistema_id, usuario_id, dev_id, projeto_id){    

        query_populate_recarga = `  
        INSERT INTO tbl_recarga (task_id, task_detalhes_id, sistema_id, usuario_id, dev_id, projeto_id, data_recarga) 
        VALUES ('`+task_id+`',`+task_detalhes_id+`,`+sistema_id+`,`+usuario_id+`, '`+dev_id+`',`+projeto_id+`, now());
      `;
        await pool.query(query_populate_recarga);
      }


      //Insert data on tbl_recarga:
      async function alter_table_TASK(task_id, task_detalhes_id){    

        query_alter_task = `  
        UPDATE tbl_task
        SET task_detalhes = `+task_detalhes_id+`
        WHERE task_id =  '`+task_id+`';
      `;
        await pool.query(query_alter_task);
      }
  }}

async function showRows(input) {
    let { rows } = await pool.query(`select * `+input+`;`);
    for (const row of rows) {
      console.log(row);
    }
}
  

async function saveTableContent(input) {
  let { rows } = await pool.query(`select * from `+input+`;`);
  return rows;
}


var a = 'data-saved'
  return a;
}

module.exports = main;