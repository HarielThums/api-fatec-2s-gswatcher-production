const Pool = require('pg').Pool
require('./database')

const populating_db = function(input){
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// Populating TBL_SISTEMA
query_populate_sistema = `
INSERT INTO tbl_sistema (sistema_id, sistema_nome) VALUES (1, 'Jira');
INSERT INTO tbl_sistema (sistema_id, sistema_nome) VALUES (2, 'Trello');`
pool.query(query_populate_sistema)

// Populating TBL_DEV
const sl_dev = input.tbl_dev;
for (var i = 0, l = sl_dev.length; i < l; i++) {

  query_populate_dev = "INSERT INTO tbl_dev (DEV_ID, NOME, SOBRENOME, EMAIL, FOTO) VALUES ('"+sl_dev[i].id+"', '"+sl_dev[i].first_name+"', '"+sl_dev[i].last_name+"', '"+sl_dev[i].email+"', '"+sl_dev[i].avatar+"');";
  pool.query(query_populate_dev)
}

// Populating TBL_PROJETO
var sl_project = input.tbl_project;

let projeto = sl_project.map(sl_project => {
  let properties = { 
    "id":0, 
    "nome": sl_project
  };
   return properties;});

for (var i = 0, l = sl_project.length; i < l; i++) {
  var id = i+1
  projeto[i].id=id
  query_populate_project = `
  INSERT INTO tbl_projeto (projeto_id, projeto_nome) 
  VALUES (`+projeto[i].id+`, '`+projeto[i].nome+`');
  `;
  pool.query(query_populate_project)
}

// Populating TBL_STATUS
var sl_status = input.tbl_status;

let status = sl_status.map(sl_status => {
  let properties = { 
    "id":0, 
    "nome": sl_status
  };
   return properties;});

for (var i = 0, l = sl_status.length; i < l; i++) {

  var id = i+1
  status[i].id=id
  query_populate_status = `
  INSERT INTO tbl_status (status_id, status_nome) 
  VALUES (`+status[i].id+`, '`+status[i].nome+`');
  `;
  pool.query(query_populate_status)
 }

// Populating TBL_TASK_DETALHES
var sl_dados = input.dados_tratados;

let status_detalhes = sl_dados.map(sl_dados => {
  let properties = { 
    "id":0, 
    "status_nome": sl_dados.status,
    "status_id":0,
    "inicio": sl_dados.startedAt,
    "termino": sl_dados.finished,
    //"task_id":sl_dados.id,
    "horas": sl_dados.amountHours
  };
   return properties;});

 for (var i = 0, l = sl_dados.length; i < l; i++) {
  
  var id = i+1

  status_detalhes[i].id = id

  let auxliary = status.find(status => status.nome === status_detalhes[i].status_nome);

  status_detalhes[i].status_id = auxliary.id;

  query_populate_task_detalhes = `  
  INSERT INTO tbl_task_detalhes (task_detalhes_id, task_status_id, inicio, termino, horas) 
  VALUES (`+status_detalhes[i].id+`, `+status_detalhes[i].status_id+`, '`+status_detalhes[i].inicio+`', `+status_detalhes[i].termino+`, `+status_detalhes[i].horas+`);
  `;
  pool.query(query_populate_task_detalhes)
 }


// Populating TBL_TASK
let task = sl_dados.map(sl_dados => {
  let properties = { 
    "id":sl_dados.id, 
    "dev_id": sl_dados.user.id,
    "projeto_id":0,
    "projeto_nome": sl_dados.project,
    "task_detalhes": 0,
    "nome": sl_dados.cardDescription
  };
   return properties;});


for (var i = 0, l = sl_dados.length; i < l; i++) {
  
  var id = i+1
  task[i].task_detalhes = id

  let auxiliary = projeto.find(projeto => projeto.nome === task[i].projeto_nome);

  task[i].projeto_id = auxiliary.id;

  query_populate_task = `  
  INSERT INTO tbl_task (task_id, dev_id, projeto_id, task_detalhes, nome) 
  VALUES ('`+task[i].id+`', '`+task[i].dev_id+`', `+task[i].projeto_id+`, `+task[i].task_detalhes+`, '`+task[i].nome+`');
  `;
  pool.query(query_populate_task)
}

// Populating TBL_GIT
let git = sl_dados.map(sl_dados => {
  let properties = { 
    "hash":sl_dados.gitMetadata.hash, 
    "id": sl_dados.id,
    "branch": sl_dados.gitMetadata.branch
  };
   return properties;});


for (var i = 0, l = sl_dados.length; i < l; i++) {
  
  query_populate_git = `  
  INSERT INTO tbl_git (hash, task_id, branch) 
  VALUES ('`+git[i].hash+`', '`+git[i].id+`', '`+git[i].branch+`');
  `;
  pool.query(query_populate_git)
}


var a = 'populated'
return a;
}

module.exports = populating_db;