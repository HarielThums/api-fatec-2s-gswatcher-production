// #############################################################################
//                                     HEADER
// #############################################################################
// Produced by Cluster8
const db = require('../config/database')

    async function insert_RECARGA(tbl_projeto,tbl_status,tbl_sistema,sl_dados) {

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
                let { rows } = await db.query(query_verify)
                let test = rows[0].exists;
                return test;
            }

            // Only if the Task_ID exists on DB, verify if it has the same status:
            async function verifySTATUS(variable, variable2) {
                query_verify = `select status_nome from tbl_status where status_id=
                (select task_status_id from tbl_task_detalhes where task_detalhes_id=
                (select task_detalhes from tbl_task where task_id='`+variable+`'));`
                let { rows } = await db.query(query_verify)
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
                let {rows} = await db.query(query_populate_task_detalhes);
                return rows[0].task_detalhes_id;
            }

            //Insert data on tbl_task:
            async function insert_data_TASK(task_id, dev_id, projeto_id, task_detalhes, nome){   
                query_populate_task = `  
                INSERT INTO tbl_task (task_id, dev_id, projeto_id, task_detalhes, nome) 
                VALUES ('`+task_id+`', '`+dev_id+`',`+projeto_id+`, `+task_detalhes+`, '`+nome+`');
                `;
                await db.query(query_populate_task);
            }

            //Insert data on tbl_recarga:
            async function insert_data_RECARGA(task_id, task_detalhes_id, sistema_id, usuario_id, dev_id, projeto_id){    
                query_populate_recarga = `  
                INSERT INTO tbl_recarga (task_id, task_detalhes_id, sistema_id, usuario_id, dev_id, projeto_id, data_recarga) 
                VALUES ('`+task_id+`',`+task_detalhes_id+`,`+sistema_id+`,`+usuario_id+`, '`+dev_id+`',`+projeto_id+`, now());
                `;
                await db.query(query_populate_recarga);
            }


            //Insert data on tbl_recarga:
            async function alter_table_TASK(task_id, task_detalhes_id){    
                query_alter_task = `  
                UPDATE tbl_task
                SET task_detalhes = `+task_detalhes_id+`
                WHERE task_id =  '`+task_id+`';
                `;
                await db.query(query_alter_task);
            }
        }
    }

    
module.exports = insert_RECARGA;