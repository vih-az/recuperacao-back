const dao = require("../modulo/DAO/tarefas.js")
const config = require("../model/config.js")
const pegarTarefas = async function(){
  try{
    let tarefasJSON = {}
  const resultadoTarefas = await dao.buscarTarefas()
  if(resultadoTarefas){
    if(resultadoTarefas.length > 0){
      tarefasJSON.tarefas = resultadoTarefas
      tarefasJSON.quantidade = resultadoTarefas.length
      tarefasJSON.status_code = 200
      return tarefasJSON
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
const atualizarTarefas = async function(tarefas, idTarefas, contentType){
  try{
    let tarefasJSON = {}
  if(String(contentType).toLowerCase() == 'application/json'){
    if(idTarefas == " " || idTarefas == undefined || isNaN(idTarefas)){
      return dao.ERROR_INVALID_ID
    }else{
      const tarefasPeloId = await dao.buscarTarefasPeloId(idTarefas)
      if(tarefasPeloId){
        if(tarefasPeloId.length > 0){
          if(tarefas.tituloTarefas == " " || tarefas.tituloTarefas == undefined || tarefas.tituloTarefas.length > 20 ||
          tarefas.descricaoTarefa == " " || tarefas.descricaoTarefa == undefined || tarefas.descricaoTarefa.length > 200 ||
          tarefas.dataInicio == " " || tarefas.dataInicio == undefined || tarefas.dataInicio.length > 10 ||
          tarefas.dataFim == " " || tarefas.dataFim == undefined || tarefas.dataFim.length > 10 ||
          tarefas.statusT == " " || tarefas.statusT == undefined || tarefas.statusT.length > 10){
            return config.ERROR_REQUIRED_FIELDS}else{
              let resultadoTarefas = await dao.atualizarTarefas(tarefas, idTarefas)
              if(resultadoTarefas){
                tarefasJSON.status = config.SUCESS_EDITED_ITEM.status
                tarefasJSON.status_code = config.SUCESS_EDITED_ITEM.status_code
                tarefasJSON.message = config.SUCESS_EDITED_ITEM.message
                return tarefasJSON
              }else{
                return config.ERROR_INTERNAL_SERVER_DB
              }
            }
          }
        }if(tarefasPeloId == false){
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
const deletarTarefas = async function(idTarefas){
  try{
    if(idTarefas == " " || idTarefas == undefined || isNaN(idTarefas)){
      return config.ERROR_INVALID_ID
    }else{
      const tarefasPeloId = await dao.buscarTarefasPeloId(idTarefas)
      if(tarefasPeloId){
        if(tarefasPeloId.length > 0){
          const tarefas = await dao.deletarTarefas(idTarefas)
          if(tarefas){
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
const inserirTarefas = async function(tarefas, contentType){
  try{
    let tarefasJSON = {}
  if(String(contentType).toLowerCase() == 'application/json'){
          if(tarefas.tituloTarefas == " " || tarefas.tituloTarefas == undefined || tarefas.tituloTarefas.length > 200 ||
          tarefas.descricaoTarefa == " " || tarefas.descricaoTarefa == undefined || tarefas.descricaoTarefa.length > 20 ||
          tarefas.dataInicio == " " || tarefas.dataInicio == undefined || tarefas.dataInicio.length > 10 ||
          tarefas.dataFim == " " || tarefas.dataFim == undefined || tarefas.dataFim.length > 10 ||
          tarefas.statusT == " " || tarefas.statusT == undefined || tarefas.statusT.length > 10){
            return config.ERROR_REQUIRED_FIELDS}else{
              let resultadoTarefa = await dao.colocarTarefas(tarefas)
              if(resultadoTarefa){
                let tarefasId = await dao.retornarIdDaUltimaTarefasInserida()
                tarefasJSON.status = config.SUCESS_EDITED_ITEM.status
                tarefasJSON.status_code = config.SUCESS_EDITED_ITEM.status_code
                tarefasJSON.message = config.SUCESS_EDITED_ITEM.message
                tarefasJSON.tarefas = tarefas
                tarefasJSON.tarefas.id = tarefasId[0].idTarefas
                return tarefasJSON
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
const pegarTarefaPeloId = async function(idTarefas){
    try{
      let tarefaJSON = {}
    
        if (idTarefas == '' || idTarefas == undefined || isNaN(idTarefas)) {
            return config.ERROR_INVALID_ID
        } else {
            let tarefa = await dao.buscarTarefasPeloId(idTarefas)
    
            if (tarefa) {
                if (tarefa.length > 0) {
                    tarefaJSON.tarefa = tarefa
                    tarefaJSON.status_code = 200
    
                    return tarefaJSON 
    
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
module.exports={
    pegarTarefas,
    atualizarTarefas,
    deletarTarefas,
    inserirTarefas,
    pegarTarefaPeloId
}