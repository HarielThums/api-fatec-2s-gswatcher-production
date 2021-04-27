const Pool = require('pg').Pool
require('./database')

const creating_tables = function(){
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const query_create_dev = `
CREATE TABLE IF NOT EXISTS TBL_DEV (
    DEV_ID varchar PRIMARY KEY,
    NOME varchar NOT NULL,
    SOBRENOME varchar not NULL,
    EMAIL varchar not NULL,
    FOTO varchar not NULL
);

CREATE TABLE IF NOT EXISTS TBL_PROJETO (
    PROJETO_ID int PRIMARY KEY,
  PROJETO_NOME varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS TBL_SISTEMA (
    SISTEMA_ID int PRIMARY KEY,
  SISTEMA_NOME varchar NOT NULL
);


CREATE TABLE IF NOT EXISTS TBL_STATUS (
    STATUS_ID int PRIMARY KEY,
    STATUS_NOME varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS TBL_TASK_DETALHES (
    TASK_DETALHES_ID int PRIMARY KEY,
    TASK_STATUS_ID int REFERENCES TBL_STATUS(STATUS_ID),
    INICIO varchar not NULL,
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
`;
pool.query(query_create_dev)

var a = 'created'
return a;
}

module.exports = creating_tables;