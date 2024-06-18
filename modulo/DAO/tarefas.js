const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const buscarTarefas = async function(){
    try{
        let sql = `select * from tarefas`
    let resultadoTarefas = await prisma.$queryRawUnsafe(sql)
    return resultadoTarefas
    }catch(error){
        return false
    }
}
const atualizarTarefas = async function(tarefas, idTarefas){
    try{
        let sql = `update tarefas set tituloTarefas = "${tarefas.tituloTarefas}", descricaoTarefa = "${tarefas.descricaoTarefa}", dataInicio = "${tarefas.dataInicio}", dataFim = "${tarefas.dataFim}", statusT = "${tarefas.statusT}" where idTarefas = ${idTarefas}`
        let resultadoTarefas = await prisma.$executeRawUnsafe(sql)
        return resultadoTarefas
    }catch(error){
        return false
    }
}
const deletarTarefas = async function(idTarefas){
    try{
        let sql = `delete from tarefas where idTarefas = ${idTarefas}`
        let resultadoTarefas = await prisma.$executeRawUnsafe(sql)
        return resultadoTarefas
    }catch(error){
        return false
    }
}
const colocarTarefas = async function(tarefas){
    try{
        let sql = `insert into tarefas(tituloTarefas, descricaoTarefa, dataInicio, dataFim, statusT)values("${tarefas.tituloTarefas}", "${tarefas.descricaoTarefa}", "${tarefas.dataInicio}", "${tarefas.dataFim}", "${tarefas.statusT}")`
    let resultadoTarefas = await prisma.$executeRawUnsafe(sql)
    if(resultadoTarefas){
        return true
    }else{
        return false
    }
}catch(error){
    return false
}
}
const buscarTarefasPeloId = async function(idTarefas){
    try{
        let sql = `select * from tarefas where idTarefas = ${idTarefas}`
    let resultadoTarefas = await prisma.$queryRawUnsafe(sql)
    return resultadoTarefas
    }catch(error){
        return false
    }
}
const retornarIdDaUltimaTarefasInserida = async function(){
    try{
        let sql = `select idTarefas from tarefas order by idTarefas desc limit 1`
    let resultadoTarefas = await prisma.$queryRawUnsafe(sql)
    return resultadoTarefas
    }catch(error){
        return false
    }
}
module.exports={
    buscarTarefas,
    atualizarTarefas,
    deletarTarefas,
    colocarTarefas,
    buscarTarefasPeloId,
    retornarIdDaUltimaTarefasInserida
}