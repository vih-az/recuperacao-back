const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const pegarTarefaUsuario = async function(){
    try{
        let sql = `select * from tarefasUsuario`
    let resultadoTarefaUsuario = await prisma.$queryRawUnsafe(sql)
    return resultadoTarefaUsuario
    }catch(error){
        return false
    }
}
const atualizarTarefaUsuario = async function(tarefasUsuario, idTarefasUsuario){
    try{
        let sql = `update tarefasUsuario set tarefasId = "${tarefasUsuario.tarefasId}", usuarioId = "${tarefasUsuario.usuarioId}" where idTarefasUsuario = ${idTarefasUsuario}`
        let resultadoTarefaUsuario = await prisma.$executeRawUnsafe(sql)
        return resultadoTarefaUsuario
    }catch(error){
        return false
    }
}
const deletarTarefaUsuario = async function(idTarefasUsuario){
    try{
        let sql = `delete from tarefasUsuario where idTarefasUsuario = ${idTarefasUsuario}`
        let resultadoTarefaUsuario = await prisma.$executeRawUnsafe(sql)
        return resultadoTarefaUsuario
    }catch(error){
        return false
    }
}
const colocarTarefaUsuario = async function(tarefasUsuario){
    try{
        let sql = `insert into tarefasUsuario(tarefasId, usuarioId)values("${tarefasUsuario.tarefasId}", "${tarefasUsuario.usuarioId}")`
    let resultadoTarefaUsuario = await prisma.$executeRawUnsafe(sql)
    if(resultadoTarefaUsuario){
        return true
    }else{
        return false
    }
}catch(error){
    return false
}
}
const buscarTarefaUsuarioPeloId = async function(idTarefasUsuario){
    try{
        let sql = `select * from tarefasUsuario where idTarefasUsuario = ${idTarefasUsuario}`
    let resultadoTarefaUsuario = await prisma.$queryRawUnsafe(sql)
    return resultadoTarefaUsuario
    }catch(error){
        return false
    }
}
const retornarIdDoUltimoTarefaUsuarioInserido = async function(){
    try{
        let sql = `select idTarefasUsuario from tarefasUsuario order by idTarefasUsuario desc limit 1`
    let resultadoTarefaUsuario = await prisma.$queryRawUnsafe(sql)
    return resultadoTarefaUsuario
    }catch(error){
        return false
    }
}
const tarefasPeloIdDoUsuario = async function(idUsuario){
    try{
        let sql = `select tarefas.tituloTarefas, tarefas.descricaoTarefa, tarefas.dataInicio, tarefas.dataFim, tarefas.statusT from tarefasUsuario inner join tarefas on tarefasUsuario.tarefasId=tarefas.idTarefas inner join usuario on tarefasUsuario.usuarioId=usuario.idUsuario where usuario.idUsuario=${idUsuario}`
    let resultadoTarefasPeloIdDoUsuario = await prisma.$queryRawUnsafe(sql)
    return resultadoTarefasPeloIdDoUsuario
    }catch(error){
        return false
    }
}
module.exports={
    pegarTarefaUsuario,
    atualizarTarefaUsuario,
    deletarTarefaUsuario,
    colocarTarefaUsuario,
    buscarTarefaUsuarioPeloId,
    retornarIdDoUltimoTarefaUsuarioInserido,
    tarefasPeloIdDoUsuario
}