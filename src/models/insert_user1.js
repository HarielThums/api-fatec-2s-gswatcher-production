// #############################################################################
//                                     HEADER
// #############################################################################
// Produced by Cluster8
const db = require('../config/database')

    async function insert_user1() {		
        query_populate = "INSERT INTO tbl_USUARIO (NOME, SOBRENOME, EMAIL, SENHA, FOTO) VALUES ('Paulo', 'Luan', 'paulo_luan@gsw.com', '123', 'https://media-exp1.licdn.com/dms/image/C4D03AQF0rY18r6i0kw/profile-displayphoto-shrink_200_200/0/1588683156710?e=1623888000&v=beta&t=tc7Hl-YS9B1-k6wI8q-CCSfiNBksqJGrsyxxiwtlOzQ');";
        	await db.query(query_populate)     
    }

module.exports = insert_user1;