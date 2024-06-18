const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS')

    app.use(cors())

    next()
})

const bodyParserJSON = bodyParser.json()
/*****************************************/
const usuarioController = require('./controller/usuarioController.js')
const tarefasController = require('./controller/tarefasController.js')
/*****************************************/
app.get("/v1/recuperacao/usuario", cors(), async function(request, response, next){
    let resultadoUsuarios = await usuarioController.pegarUsuario()
    response.status(resultadoUsuarios.status_code)
    response.json(resultadoUsuarios)
})
app.put("/v1/recuperacao/editarUsuario/:id", cors(), bodyParserJSON, async function(request, response, next){
    let idUsuario = request.params.id
    let usuario = request.body
    let contentType = request.headers["content-type"]
    let resultadoUsuario = await usuarioController.atualizarUsuario(usuario, idUsuario, contentType)
    response.status(resultadoUsuario.status_code)
    response.json(resultadoUsuario)
})
app.delete("/v1/recuperacao/deletarUsuario/:id", cors(), async function(request, response, next){
    let idUsuario = request.params.id
    let resultadoUsuario = await usuarioController.deletarUsuario(idUsuario)
    response.status(resultadoUsuario.status_code)
    response.json(resultadoUsuario)
})
app.post("/v1/recuperacao/postarUsuario/", cors(), bodyParserJSON, async function(request, response, next){
    let usuario = request.body
    let contentType = request.headers["content-type"]
    const resultadoUsuario = await usuarioController.inserirUsuario(usuario, contentType)
    response.status(resultadoUsuario.status_code)
    response.json(resultadoUsuario)
})
/*****************************************/
app.get("/v1/recuperacao/tarefa", cors(), async function(request, response, next){
    let resultadoTarefas = await tarefasController.pegarTarefas()
    response.status(resultadoTarefas.status_code)
    response.json(resultadoTarefas)
})
app.put("/v1/recuperacao/editarTarefa/:id", cors(), bodyParserJSON, async function(request, response, next){
    let idTarefa = request.params.id
    let tarefa = request.body
    let contentType = request.headers["content-type"]
    let resultadoTarefa = await tarefasController.atualizarTarefas(tarefa, idTarefa, contentType)
    response.status(resultadoTarefa.status_code)
    response.json(resultadoTarefa)
})
app.delete("/v1/recuperacao/deletarTarefa/:id", cors(), async function(request, response, next){
    let idTarefa = request.params.id
    let resultadoTarefa = await tarefasController.deletarTarefas(idTarefa)
    response.status(resultadoTarefa.status_code)
    response.json(resultadoTarefa)
})
app.post("/v1/recuperacao/postarTarefa/", cors(), bodyParserJSON, async function(request, response, next){
    let tarefa = request.body
    let contentType = request.headers["content-type"]
    const resultadoTarefa = await tarefasController.inserirTarefas(tarefa, contentType)
    response.status(resultadoTarefa.status_code)
    response.json(resultadoTarefa)
})
app.get("/v1/recuperacao/tarefaPeloId/:id", cors(), async function(request, response, next){
    let idTarefas = request.params.id
    const resultadoTarefa = await tarefasController.pegarTarefaPeloId(idTarefas)
    response.status(resultadoTarefa.status_code)
    response.json(resultadoTarefa)
})
app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições')
})