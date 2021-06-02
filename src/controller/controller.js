const db = require('../config/database')

// TESTE
exports.TESTE = async (req, res) => {
  const id = req.params.id
  const response = await db.query(
    `select * from tbl_projeto 
    inner join tbl_task on tbl_task.projeto_id = tbl_projeto.projeto_id
    inner join tbl_task_detalhes on tbl_task.task_detalhes = tbl_task_detalhes.task_detalhes_id
    inner join tbl_status on tbl_task_detalhes.task_status_id = tbl_status.status_id
    where tbl_projeto.projeto_id = '${id}' and tbl_status.status_nome = 'DONE'`,
    );
    res.status(200).send(response.rows);
  }; 

// TESTE
exports.TESTE2 = async (req, res) => {
  const id = req.params.id
  const hrs = req.query.hrs
  const project = req.query.proj

  const response = await db.query(
    `select tbl_projeto.projeto_id, tbl_projeto.projeto_nome, tbl_task.task_id,tbl_task.dev_id,
     tbl_task.nome, tbl_task_detalhes.inicio, tbl_task_detalhes.termino, tbl_task_Detalhes.horas,
      tbl_status.status_id, tbl_status.status_nome from tbl_projeto 
    inner join tbl_task on tbl_task.projeto_id = tbl_projeto.projeto_id
    inner join tbl_task_detalhes on tbl_task.task_detalhes = tbl_task_detalhes.task_detalhes_id
    inner join tbl_status on tbl_task_detalhes.task_status_id = tbl_status.status_id
    where tbl_task.dev_id = '${id}'`,
    );
    
    if (hrs != undefined || project != undefined){
      if (hrs == 'null') {
        let hrsNull = await response.rows.filter(hr => hr.horas == null) 
        if (project != undefined){
          let proj = await hrsNull.filter(proj => proj.projeto_id == project)
          res.status(200).send(proj)
        } else {
          res.status(200).send(hrsNull)
        }
      } else if (hrs == 'notnull') {
        let hrsNull = await response.rows.filter(hr => hr.horas != null)
        if (project != undefined){
          let proj = await hrsNull.filter(proj => proj.projeto_id == project)
          res.status(200).send(proj)
        } else {
          res.status(200).send(hrsNull)
        }
      } else if (project != undefined){
        let proj = await response.rows.filter(proj => proj.projeto_id == project)
        res.status(200).send(proj)
      }
    } else res.status(200).send(response.rows)
  }; 

// TESTE
exports.TESTE3 = async (req, res) => {
  const id = req.params.id
  const response = await db.query(
    `select tbl_projeto.projeto_id, tbl_projeto.projeto_nome, tbl_task.task_id,tbl_task.dev_id,
     tbl_task.nome, tbl_task_detalhes.inicio, tbl_task_detalhes.termino, tbl_task_Detalhes.horas,
      tbl_status.status_id, tbl_status.status_nome from tbl_projeto 
    inner join tbl_task on tbl_task.projeto_id = tbl_projeto.projeto_id
    inner join tbl_task_detalhes on tbl_task.task_detalhes = tbl_task_detalhes.task_detalhes_id
    inner join tbl_status on tbl_task_detalhes.task_status_id = tbl_status.status_id
    where tbl_projeto.projeto_id = '${id}'`,
    );
    res.status(200).send(response.rows);
  }; 

// buscando todos os devs
exports.listAll_TBL_DEV = async (req, res) => {
    const response = await db.query(
      `SELECT D.nome, D.Sobrenome , D.email , D.foto, D.dev_id ,(SELECT COUNT(T.dev_id) 
      FROM tbl_task T WHERE T.dev_id = D.dev_id) AS total_de_task FROM tbl_dev D GROUP BY D.dev_id`,
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
        `SELECT P.projeto_nome,(SELECT P.projeto_id),(SELECT COUNT(T.projeto_id) 
        FROM tbl_task T WHERE T.projeto_id = P.projeto_id) AS total_de_task FROM tbl_projeto P GROUP BY P.projeto_id`,
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


  //POST route
  exports.singlefile = async (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    // accessing the file
    global.myFile = req.files.file;

    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });

}


exports.main_chart = async (req, res) => {
  const saveTableContent = require('../models/saveTableContent')
  const count_completas = require('../models/count_completas')
  const count_incompletas = require('../models/count_incompletas')

        const tbl_projeto = await saveTableContent('tbl_projeto')

        let output = tbl_projeto.map(tbl_projeto => {
        let properties = {
        "projeto_nome":tbl_projeto.projeto_nome,
        "tasks_completas": 0,
        "tasks_incompletas": 0,
        };
        return properties;});

        for (var i = 0, l = tbl_projeto.length; i < l; i++) {
            output[i].tasks_completas = await count_completas(tbl_projeto[i].projeto_nome);
            output[i].tasks_incompletas = await count_incompletas(tbl_projeto[i].projeto_nome);
        }

    res.status(200).send(output);
  }; 

  exports.chart_dev = async (req, res) => {
    const id = req.params.id
    const saveTableContent = require('../models/saveTableContent')
    const count_completas = require('../models/count_completas_devs')
    const count_incompletas = require('../models/count_incompletas_devs')

        const tbl_projeto = await saveTableContent('tbl_projeto')

        let output = tbl_projeto.map(tbl_projeto => {
        let properties = {
        "projeto_nome":tbl_projeto.projeto_nome,
        "tasks_completas": 0,
        "tasks_incompletas": 0,
        };
        return properties;});

        for (var i = 0, l = tbl_projeto.length; i < l; i++) {
            output[i].tasks_completas = await count_completas(tbl_projeto[i].projeto_nome, id);
            output[i].tasks_incompletas = await count_incompletas(tbl_projeto[i].projeto_nome, id);
        }

    res.status(200).send(output);
  }; 


  exports.uploadButton = async (req, res) => {
    try{
      const funcDados = require('../models/treating_data')    
      dados = await funcDados(myFile.name);

      const CreateTables = require('../models/create_tables')
      await CreateTables();

      const CheckTablesNull = require('../models/check_tables_null')
      const insertUSER = require('../models/insert_user1')
      let check = await CheckTablesNull('tbl_usuario');
      if (check)
        await insertUSER();

      const Insert_data = require('../models/insert_data')
      await Insert_data(dados);

      const Save_data = require('../models/save_data')
      let values = await Save_data();

      const insertRECARGA = require('../models/insert_RECARGA')
      await insertRECARGA(values.tbl_projeto,values.tbl_status,values.tbl_sistema, dados.dados_tratados);

      res.status(200).send({message:"The data was saved sucessfully!"});

    } catch (error) {
        return res.status(400).send({ error: 'Cannot save data, try again' })
    }
  
  };






