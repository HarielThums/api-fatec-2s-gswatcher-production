// #############################################################################
//                                     HEADER
// #############################################################################
// Produced by Cluster8
const db = require('../config/database')

    async function create_tables() {

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
        await db.query(create_table_query);
    }

module.exports = create_tables;