const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dados = require('../models/dados')
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

//Config
// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// database start
const creating_tables = require('../config/creating_tables')
const populating = require('../config/populating_db')

// criando tabelas do banco. ( passo 1 )
// const resposta = creating_tables()
// console.log(resposta)

// populando banco com dados do JSON. ( passo 2 )
// const resposta = populating(dados)
// console.log(resposta)

// Rotas da API;
const index = require('../routes/index')
const productRoute = require('../routes/product_routes')

app.use(index)
app.use('/api/', productRoute)

module.exports = app
