const db = require('../config/database')

    async function count_incompletas(variable, dev_id) {
        query = `select count (*) from tbl_task 
                    inner join tbl_task_detalhes on tbl_task_detalhes.task_detalhes_id = tbl_task.task_detalhes
                    inner join tbl_projeto on tbl_task.projeto_id = tbl_projeto.projeto_id
                    where tbl_projeto.projeto_nome = '`+variable+`' and
                    tbl_task.dev_id = '`+dev_id+`' and
                    tbl_task_detalhes.termino = false;`
        let { rows } = await db.query(query)
        let resp = rows[0].count;
        return resp;
    }


module.exports =count_incompletas;