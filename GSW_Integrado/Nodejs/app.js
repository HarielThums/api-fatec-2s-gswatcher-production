const app = require('./src/server/server'), port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor rodando na url: localhost:${port}.`)
})