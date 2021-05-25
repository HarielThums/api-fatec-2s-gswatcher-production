const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' })

    // bearer seguido do hash ( esse é o formato esperado do token )
    const parts = authHeader.split(' ')
    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error' })
    
    // scheme irá receber o bearer, e o token o restante
    const [ scheme, token ] = parts

    // verificando o bearer
    if (!/^Bearer$/.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err)
            return res.status(401).send({ error: 'Token invalid' })
        
        req.id = decoded.id // será usado pelos controllers

        return next() // end verify
    })
}