const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config();

//Conexão com BD;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  })

  pool.on('connect', () => {
      //console.log('Base de dados conectado!')
  })

  module.exports = {
      query: (text, params) => pool.query(text, params)
  }