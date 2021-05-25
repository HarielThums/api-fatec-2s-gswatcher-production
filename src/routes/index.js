const express = require('express')
const router = require('express-promise-router')()

router.get('/', (req,res) => {
    res.status(200).send({
        success: 'true',
        message: 'Node.js, Express, and Postgres API',
        version: '1.0.0'
    })
})

module.exports = router