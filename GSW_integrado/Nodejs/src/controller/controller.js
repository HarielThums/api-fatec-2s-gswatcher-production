const db = require('../config/database')

// TESTE
exports.TESTE = async (req, res) => {
  const input = req.params.id
  const response = await db.query(
    `select * from tbl_projeto 
    inner join tbl_task on tbl_task.projeto_id = tbl_projeto.projeto_id
    inner join tbl_task_detalhes on tbl_task.task_detalhes = tbl_task_detalhes.task_detalhes_id
    inner join tbl_status on tbl_task_detalhes.task_status_id = tbl_status.status_id
    where tbl_projeto.projeto_id = '${input}' and tbl_status.status_nome = 'DONE'`,
    );
    res.status(200).send(response.rows);
  }; 
// TESTE
exports.TESTE2 = async (req, res) => {
  const input = req.params.id
  const response = await db.query(
    `select count(*) from tbl_projeto 
    inner join tbl_task on tbl_task.projeto_id = tbl_projeto.projeto_id
    inner join tbl_task_detalhes on tbl_task.task_detalhes = tbl_task_detalhes.task_detalhes_id 
    inner join tbl_status on tbl_task_detalhes.task_status_id = tbl_status.status_id
    where tbl_projeto.projeto_id = '${input}'
    group by tbl_status.status_nome`,
    );
    res.status(200).send(response.rows);
  }; 
// TESTE
exports.TESTE3 = async (req, res) => {
  const input = req.params.id
  const response = await db.query(
    `select * from tbl_projeto 
    inner join tbl_task on tbl_task.projeto_id = tbl_projeto.projeto_id
    inner join tbl_task_detalhes on tbl_task.task_detalhes = tbl_task_detalhes.task_detalhes_id
    inner join tbl_status on tbl_task_detalhes.task_status_id = tbl_status.status_id
    where tbl_projeto.projeto_id = '${input}'`,
    );
    res.status(200).send(response.rows);
  }; 

// buscando todos os devs
exports.listAll_TBL_DEV = async (req, res) => {
    const response = await db.query(
      'SELECT * FROM TBL_DEV ORDER BY nome ASC',
    );
    res.status(200).send(response.rows);
  };

// buscando dev por id
exports.findDevByID = async (req,res) => {
    const dev_id = req.params.id
    const response = await db.query(`SELECT * FROM TBL_DEV WHERE dev_id = '${dev_id}'`)
    res.status(200).send(response.rows)
}

// buscando todos os projetos
exports.listAll_Projects = async (req, res) => {
    const response = await db.query(
        `SELECT P.projeto_nome,(SELECT P.projeto_id),(SELECT COUNT(T.projeto_id) FROM tbl_task T WHERE T.projeto_id = P.projeto_id) AS total_de_task FROM tbl_projeto P GROUP BY P.projeto_id`,
      );
      res.status(200).send(response.rows);
    };

// buscando todos as tasks
exports.listAll_Task = async (req, res) => {
    const response = await db.query(
       'SELECT * FROM tbl_task ORDER BY task_id ASC',
      );
      res.status(200).send(response.rows);
    };    

// buscando todos as tasks por project
exports.listAll_Task_project = async (req, res) => {
  const proj = req.params.id
  const response = await db.query( 
     `SELECT * FROM tbl_task WHERE projeto_id = ${proj}`,
    );
    
    res.status(200).send(response.rows)
  };

// buscando todos os detalhes das tasks
exports.listAll_Task_detalhes = async (req, res) => {
  const response = await db.query(
     'SELECT * FROM tbl_task_detalhes ORDER BY task_detalhes_id ASC',
    );
    res.status(200).send(response.rows);
  };  

// buscando dados git das tasks
exports.listAll_git = async (req, res) => {
  const response = await db.query(
     'SELECT * FROM tbl_git ORDER BY task_id ASC',
    );
    res.status(200).send(response.rows);
  };    

// buscando todos os status
exports.listAll_Status = async (req, res) => {
  const response = await db.query(
     'SELECT * FROM tbl_status',
    );
    res.status(200).send(response.rows);
  };    
  
// Buscando quantas tasks tem um project // Rota desnecessaria, dado incluido na rota /projetos
/*
exports.listAll_Task_per_project = async (req, res) => {
  const proj = req.params.id
  const response = await db.query( 
    `select count(*) from tbl_task where projeto_id = ${proj}`,
    );
    
    res.status(200).send(response.rows)
  };

*/

// Populating update
/*
exports.Populating = async (req, res) => {
  const response = await db.query(
     "UPDATE"
    );
    res.status(200).send({message: 'Product updated!'});
  };
*/