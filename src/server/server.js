const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const dados = require('../models/initialize_db')
const cors = require("cors");
require('../database')

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(express.static('public'))
app.use(cors(corsOptions));
app.use(fileUpload());

//Config
// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// database start - Initial dataset
const main = require('../models/upload_data')
main(dados)

// Rotas da API;
const AuthRoute = require('../routes/auth_routes')
const productRoute = require('../routes/product_routes')
const route = require('../routes/index')

app.use(route)
app.use('/auth', AuthRoute)
app.use('/api/', productRoute)

module.exports = app