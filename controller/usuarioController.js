const dao = require("../modulo/DAO/usuario.js")
const config = require("../model/config.js")
const pegarUsuario = async function(){
  try{
    let usuarioJSON = {}
  const resultadoUsuario = await dao.pegarUsuario()
  if(resultadoUsuario){
    if(resultadoUsuario.length > 0){
      usuarioJSON.usuario = resultadoUsuario
      usuarioJSON.quantidade = resultadoUsuario.length
      usuarioJSON.status_code = 200
      return usuarioJSON
    }else{
      return config.ERROR_NOT_FOUND
    }
  }else{
    return config.ERROR_INTERNAL_SERVER_DB
  }
}catch(error){
  return config.ERROR_INTERNAL_SERVER
}
}
const atualizarUsuario = async function(usuario, idUsuario, contentType){
  try{
    let usuarioJSON = {}
  if(String(contentType).toLowerCase() == 'application/json'){
    if(idUsuario == " " || idUsuario == undefined || isNaN(idUsuario)){
      return dao.ERROR_INVALID_ID
    }else{
      const usuarioPeloId = await dao.buscarUsuarioPeloId(idUsuario)
      if(usuarioPeloId){
        if(usuarioPeloId.length > 0){
          if(usuario.nomeUsuario == " " || usuario.nomeUsuario == undefined || usuario.nomeUsuario.length > 200 ||
          usuario.emailUsuario == " " || usuario.emailUsuario == undefined || usuario.emailUsuario.length > 20 ||
          usuario.senhaUsuario == " " || usuario.senhaUsuario == undefined || usuario.senhaUsuario.length > 10){
            return config.ERROR_REQUIRED_FIELDS}else{
              let usuarioU = await dao.atualizarUsuario(usuario, idUsuario)
              if(usuarioU){
                usuarioJSON.status = config.SUCESS_EDITED_ITEM.status
                usuarioJSON.status_code = config.SUCESS_EDITED_ITEM.status_code
                usuarioJSON.message = config.SUCESS_EDITED_ITEM.message
                return usuarioJSON
              }else{
                return config.ERROR_INTERNAL_SERVER_DB
              }
            }
          }
        }if(usuarioPeloId == false){
          return config.ERROR_NOT_FOUND
        }
      }
    }else{
      return config.ERROR_CONTENT_TYPE
    }
  }catch(error){
    return config.ERROR_INTERNAL_SERVER
  }
}
const deletarUsuario = async function(idUsuario){
  try{
    if(idUsuario == " " || idUsuario == undefined || isNaN(idUsuario)){
      return config.ERROR_INVALID_ID
    }else{
      const usuarioPeloId = await dao.buscarUsuarioPeloId(idUsuario)
      if(usuarioPeloId){
        if(usuarioPeloId.length > 0){
          const usuario = await dao.deletarUsuario(idUsuario)
          if(usuario){
            return config.SUCESS_DELETED_ITEM
          }else{
            return config.ERROR_INTERNAL_SERVER_DB
          }
        }else{
          return config.ERROR_NOT_FOUND
        }
      }else{
        return config.ERROR_NOT_FOUND
      }
    }
  }catch(error){
    return config.ERROR_INTERNAL_SERVER
  }
}
const inserirUsuario = async function(usuario, contentType){
  try{
    let usuarioJSON = {}
  if(String(contentType).toLowerCase() == 'application/json'){
          if(usuario.nomeUsuario == " " || usuario.nomeUsuario == undefined || usuario.nomeUsuario.length > 200 ||
          usuario.emailUsuario == " " || usuario.emailUsuario == undefined || usuario.emailUsuario.length > 20 ||
          usuario.senhaUsuario == " " || usuario.senhaUsuario == undefined || usuario.senhaUsuario.length > 10){
            return config.ERROR_REQUIRED_FIELDS}else{
              let usuarioC = await dao.colocarUsuario(usuario)
              if(usuarioC){
                let usuarioId = await dao.retornarIdDoUltimoUsuarioInserido()
                usuarioJSON.status = config.SUCESS_CREATED_ITEM.status
                usuarioJSON.status_code = config.SUCESS_CREATED_ITEM.status_code
                usuarioJSON.message = config.SUCESS_CREATED_ITEM.message
                usuarioJSON.usuario = usuario
                usuarioJSON.usuario.id = usuarioId[0].idUsuario
                return usuarioJSON
              }else{
                return config.ERROR_INTERNAL_SERVER_DB
              }
            }
          }else{
            return config.ERROR_CONTENT_TYPE
          }
  }catch(error){
    return config.ERROR_INTERNAL_SERVER
  }
}
module.exports={
    pegarUsuario,
    atualizarUsuario,
    deletarUsuario,
    inserirUsuario
}