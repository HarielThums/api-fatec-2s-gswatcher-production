const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config();

//Conexão com BD;
const pool = new Pool({
    connectionString: "postgres://oorvnhwgsbnimx:97894f68450f0f062be9e48b11edcb9c80fc0957f2bbc6a9c84b7296071f0bdb@ec2-54-197-100-79.compute-1.amazonaws.com:5432/dd4l04u3h53877?ssl=true",
  })

  pool.on('connect', () => {
      //console.log('Base de dados conectado!')
  })

  module.exports = {
      query: (text, params) => pool.query(text, params)
  }