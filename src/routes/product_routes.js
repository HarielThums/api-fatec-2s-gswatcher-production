const router = require('express-promise-router')()
const controller = require('../controller/controller');
const authMiddleware = require('../middlewares/auth')

// Middleware
    // router.use(authMiddleware)

// >> Definindo as rotas.
    router.get('/devs', controller.listAll_TBL_DEV)

    router.get('/devs/:id', controller.findDevByID)

    router.get('/projetos', controller.listAll_Projects)

    router.get('/tasks', controller.listAll_Task)

    router.get('/tasks/:id', controller.listAll_Task_project)

    router.get('/tasks_detalhes', controller.listAll_Task_detalhes)

    router.get('/status', controller.listAll_Status)

    router.get('/git', controller.listAll_git)

    router.get('/teste/:id', controller.TESTE)
    router.get('/teste2/:id', controller.TESTE2)
    router.get('/teste3/:id', controller.TESTE3)

    // Upload button routes
    router.post('/upload_json',controller.singlefile)
    router.get('/uploadButton',controller.uploadButton)
    
    // charts routes:
    router.get('/main_chart',controller.main_chart)
    router.get('/chart_dev/:id',controller.chart_dev)

module.exports = router