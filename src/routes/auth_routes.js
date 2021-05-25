const router = require('express-promise-router')()
const userController = require('../controller/userController')

router.post('/register', userController.register)

router.post('/authenticate', userController.authenticate)

router.put('/forgot_password', userController.forgot_password)

router.put('/reset_password', userController.reset_password)

module.exports = router