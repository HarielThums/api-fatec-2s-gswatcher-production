const Sequelize = require('sequelize')
const db = require('../config/databaseSeq')

const User = require('../models/User')

const connection = new Sequelize(db)

User.init(connection)

module.exports = connection