const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')


class User extends Model {
    static init(connection){
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            passwordResetToken: DataTypes.STRING,
            passwordResetExpires: DataTypes.DATE,
        },{
            sequelize: connection
        })
    }
}

module.exports = User