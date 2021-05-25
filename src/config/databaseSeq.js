require('dotenv').config()

//Sequelize
module.exports = {
    'username': "oorvnhwgsbnimx",
    'password': "97894f68450f0f062be9e48b11edcb9c80fc0957f2bbc6a9c84b7296071f0bdb",
    'database': "dd4l04u3h53877",
    'host': "ec2-54-197-100-79.compute-1.amazonaws.com",
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true, // This will help you. But you will see nwe error
          rejectUnauthorized: false // This line will fix new error
        }
    },
    define: {
        timestamp: true, // created_at, update_at
        underscored: true, //formato das tabelas snake case
    }
}