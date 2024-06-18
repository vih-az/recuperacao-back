const dao = require("../modulo/DAO/tarefaUsuario.js")
const config = require("../model/config.js")
const pegarTarefaUsuario = async function(){
  try{
    let tarefaUsuarioJSON = {}
  const resultadoTarefaUsuario = await dao.pegarTarefaUsuario()
  if(resultadoTarefaUsuario){
    if(resultadoTarefaUsuario.length > 0){
      tarefaUsuarioJSON.tarefaUsuario = resultadoTarefaUsuario
      tarefaUsuarioJSON.quantidade = resultadoTarefaUsuario.length
      tarefaUsuarioJSON.status_code = 200
      return tarefaUsuarioJSON
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
const atualizarTarefaUsuario = async function(tarefaUsuario, idTarefaUsuario, contentType){
  try{
    let tarefaUsuarioJSON = {}
  if(String(contentType).toLowerCase() == 'application/json'){
    if(idTarefaUsuario == " " || idTarefaUsuario == undefined || isNaN(idTarefaUsuario)){
      return dao.ERROR_INVALID_ID
    }else{
      const tarefaUsuarioPeloId = await dao.buscarTarefaUsuarioPeloId(idTarefaUsuario)
      if(tarefaUsuarioPeloId){
        if(tarefaUsuarioPeloId.length > 0){
          if(tarefaUsuario.tarefasId == " " || tarefaUsuario.tarefasId == undefined || isNaN(tarefaUsuario.tarefasId) ||
          tarefaUsuario.usuarioId == " " || tarefaUsuario.usuarioId == undefined || isNaN(tarefaUsuario.usuarioId)){
            return config.ERROR_REQUIRED_FIELDS}else{
              let tarefaUsuarioU = await dao.atualizarTarefaUsuario(tarefaUsuario, idTarefaUsuario)
              if(tarefaUsuarioU){
                tarefaUsuarioJSON.status = config.SUCESS_EDITED_ITEM.status
                tarefaUsuarioJSON.status_code = config.SUCESS_EDITED_ITEM.status_code
                tarefaUsuarioJSON.message = config.SUCESS_EDITED_ITEM.message
                return tarefaUsuarioJSON
              }else{
                return config.ERROR_INTERNAL_SERVER_DB
              }
            }
          }
        }if(tarefaUsuarioPeloId == false){
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
const deletarTarefaUsuario = async function(idTarefaUsuario){
  try{
    if(idTarefaUsuario == " " || idTarefaUsuario == undefined || isNaN(idTarefaUsuario)){
      return config.ERROR_INVALID_ID
    }else{
      const tarefaUsuarioPeloId = await dao.buscarTarefaUsuarioPeloId(idTarefaUsuario)
      if(tarefaUsuarioPeloId){
        if(tarefaUsuarioPeloId.length > 0){
          const tarefaUsuarioD = await dao.deletarTarefaUsuario(idTarefaUsuario)
          if(tarefaUsuarioD){
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
const inserirTarefaUsuario = async function(tarefaUsuario, contentType){
  try{
    let tarefaUsuarioJSON = {}
  if(String(contentType).toLowerCase() == 'application/json'){
          if(tarefaUsuario.tarefaId == " " || tarefaUsuario.tarefaId == undefined || isNaN(tarefaUsuario.tarefaId) ||
          tarefaUsuario.usuarioId == " " || tarefaUsuario.usuarioId == undefined || isNaN(tarefaUsuario.usuarioId)){
            return config.ERROR_REQUIRED_FIELDS}else{
              let usuarioC = await dao.colocarTarefaUsuario(tarefaUsuario)
              if(usuarioC){
                let usuarioId = await dao.retornarIdDoUltimoTarefaUsuarioInserido()
                tarefaUsuarioJSON.status = config.SUCESS_CREATED_ITEM.status
                tarefaUsuarioJSON.status_code = config.SUCESS_CREATED_ITEM.status_code
                tarefaUsuarioJSON.message = config.SUCESS_CREATED_ITEM.message
                tarefaUsuarioJSON.usuario = tarefaUsuario
                tarefaUsuarioJSON.usuario.id = usuarioId[0].idTarefaUsuario
                return tarefaUsuarioJSON
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
const pegarTarefaUsuarioPeloId = async function(idTarefaUsuario){
    try{
      let tarefaUsuarioJSON = {}
    
        if (idTarefaUsuario == '' || idTarefaUsuario == undefined || isNaN(idTarefaUsuario)) {
            return config.ERROR_INVALID_ID
        } else {
            let tarefaUsuario = await dao.buscarTarefaUsuarioPeloId(idTarefaUsuario)
    
            if (tarefaUsuario) {
                if (tarefaUsuario.length > 0) {
                    tarefaUsuarioJSON.tarefaUsuario = tarefaUsuario
                    tarefaUsuarioJSON.status_code = 200
    
                    return tarefaUsuarioJSON 
    
                } else {
                    return config.ERROR_NOT_FOUND 
                }
    
            } else {
                return config.ERROR_INTERNAL_SERVER_DB 
            }
        }
    }catch(error){
        return config.ERROR_INTERNAL_SERVER
    }
}
const tarefaPeloIdDoUsuario = async function(idUsuario){
    try{
        let tarefaPeloIdJSON = {}
    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return config.ERROR_INVALID_ID
    } else {
        let tarefaPeloId = await dao.buscarTarefaUsuarioPeloId(idUsuario)

        if (tarefaPeloId) {
            if (tarefaUsuario.length > 0) {
                tarefaPeloIdJSON.tarefaUsuario = tarefaPeloId
                tarefaPeloIdJSON.status_code = 200

                return tarefaPeloIdJSON 

            } else {
                return config.ERROR_NOT_FOUND 
            }

        } else {
            return config.ERROR_INTERNAL_SERVER_DB 
        }
    }
}catch(error){
    return config.ERROR_INTERNAL_SERVER
}
}