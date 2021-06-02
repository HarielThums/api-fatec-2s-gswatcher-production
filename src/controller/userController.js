const User = require('../models/User')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
const mailer = require('../modules/mailer')


function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, // token expira a cada 24 horas
    }) // segredo criado com hash md5 armazenado no json em config.
}

exports.register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        if (await User.findOne({ where: { email } }))
            return res.status(403).send({ error: 'User already exists' })

        // criptografando password no pré save...
        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashPassword })

        user.password = undefined // para a senha não voltar no corpo da requisição

        return res.send({
            user,
            token: generateToken({ id: user.id })
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Registration failed' })
    }
}

exports.authenticate = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (!user)
            return res.status(404).send({ error: 'User not found' })

        // comparando senha que o user está tentando com a que está armazenada no db
        if (!await bcrypt.compare(password, user.password))
            return res.status(401).send({ error: 'Invalid password' })

        user.password = undefined // para a senha não voltar no corpo da requisição

        res.send({
            email,
            token: generateToken({ id: user.id })
        }) // não havendo erro, login success
    } catch (error) {
        return res.status(500).send({ error: 'Authenticate failed' })
    }
}

exports.forgot_password = async (req, res) => {
    try {

        const { email } = req.body

        const user = await User.findOne({ where: { email } })

        if (!user)
            return res.status(400).send({ error: 'User not found' })

        const token = await crypto.randomBytes(20).toString('hex') // gerando token hex que será enviado via email

        const now = await new Date()
        now.setHours(now.getHours() + 1) // Definindo tempo de 1 hora para limitar duração do token

        await user.update({ passwordResetToken: token, passwordResetExpires: now }, { where: { email } })

        mailer.sendMail({
            to: email,
            from: '"ContatoGSWatcher" <teste@contato.com>',
            subject: "GSWatcher: Reset password",
            template: '/forgot_password',
            context: { token },
        }, (err) => {
            if (err)
                return res.status(400).send({ error: 'Cannot send forgot password email' })

            return res.send({ success: 'Please, Check your email' })
        })
    } catch (error) {
        res.status(400``).send({ error: 'Erro on forgot password, try again' })
    }
}


exports.reset_password = async (req, res) => {
    try {
        const { email, token, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (!user)
            return res.status(400).send({ error: 'User not found' })

        if (token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Token invalid' })

        const now = new Date()
        if (now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired, generate a new one' })

        const hashPassword = await bcrypt.hash(password, 10)

        await user.update({ password: hashPassword }, { where: { email } })

        res.send({ success: 'Password changed' })
    } catch (error) {
        return res.status(400).send({ error: 'Cannot reset password, try again' })
    }
}
