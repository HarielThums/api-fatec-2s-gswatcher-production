require('dotenv').config()

//Sequelize
module.exports = {
    'username': global.process.env.DATABASE_USERNAME,
    'password': global.process.env.DATABASE_PASSWORD,
    'database': global.process.env.DATABASE_DATABASE,
    'host': global.process.env.DATABASE_HOST,
    dialect: 'postgres',
    define: {
        timestamp: true, // created_at, update_at
        underscored: true, //formato das tabelas snake case
    }
}