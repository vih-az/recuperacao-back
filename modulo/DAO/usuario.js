const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const pegarUsuario = async function(){
    try{
        let sql = `select * from usuario`
    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)
    return resultadoUsuario
    }catch(error){
        return false
    }
}
const atualizarUsuario = async function(usuario, idUsuario){
    try{
        let sql = `update usuario set nomeUsuario = "${usuario.nomeUsuario}", emailUsuarios = "${usuario.emailUsuarios}", senhaUsuario = "${usuario.senhaUsuario}" where idUsuario = ${idUsuario}`
        let resultadoUsuario = await prisma.$executeRawUnsafe(sql)
        return resultadoUsuario
    }catch(error){
        return false
    }
}
const deletarUsuario = async function(idUsuario){
    try{
        let sql = `delete from usuario where idUsuario = ${idUsuario}`
        let resultadoUsuario = await prisma.$executeRawUnsafe(sql)
        return resultadoUsuario
    }catch(error){
        return false
    }
}
const colocarUsuario = async function(usuario){
    try{
        let sql = `insert into usuario(nomeUsuario, emailUsuarios, senhaUsuario)values("${usuario.nomeUsuario}", "${usuario.emailUsuario}", "${usuario.senhaUsuario}")`
    let resultadoUsuario = await prisma.$executeRawUnsafe(sql)
    if(resultadoUsuario){
        return true
    }else{
        return false
    }
}catch(error){
    return false
}
}
const buscarUsuarioPeloId = async function(idUsuario){
    try{
        let sql = `select * from usuario where idUsuario = ${idUsuario}`
    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)
    return resultadoUsuario
    }catch(error){
        return false
    }
}
const retornarIdDoUltimoUsuarioInserido = async function(){
    try{
        let sql = `select idUsuario from usuario order by idUsuario desc limit 1`
    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)
    return resultadoUsuario
    }catch(error){
        return false
    }
}
module.exports={
    pegarUsuario,
    atualizarUsuario,
    deletarUsuario,
    colocarUsuario,
    retornarIdDoUltimoUsuarioInserido,
    buscarUsuarioPeloId
}