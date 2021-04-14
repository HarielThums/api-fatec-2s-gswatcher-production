const router = require('express-promise-router')()
const controller = require('../controller/controller');

// >> Definindo as rotas.
    router.get('/devs', controller.listAll_TBL_DEV)

    router.get('/devs/:id', controller.findDevByID)

    router.get('/projetos', controller.listAll_Projects)

    // router.get('/projetos/:id', controller.listAll_Task_per_project) // Rota substituida.

    router.get('/tasks', controller.listAll_Task)

    router.get('/tasks/:id', controller.listAll_Task_project)

    router.get('/tasks_detalhes', controller.listAll_Task_detalhes)

    router.get('/git', controller.listAll_git)

    router.get('/status', controller.listAll_Status)

    // router.put('/populating', controller.populating)

module.exports = router