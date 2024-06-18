create database recuperacaoMarcel;
use recuperacaoMarcel;
create table tarefas(
     idTarefas int not null auto_increment primary key,
     tituloTarefas varchar(20) not null,
     descricaoTarefa varchar(200) not null,
     dataInicio date not null,
     dataFim date,
     statusT varchar(10) not null
);
create table usuario(
     idUsuario int not null auto_increment primary key,
     nomeUsuario varchar(200) not null,
     emailUsuarios varchar(20) not null,
     senhaUsuario varchar(10) not null
);
create table tarefasUsuario(
     idTarefasUsuario int not null auto_increment primary key,
     tarefasId int,
     usuarioId int,
     foreign key(tarefasId) references tarefas(idTarefas),
     foreign key(usuarioId) references usuario(idUsuario)
);
 insert into tarefas(tituloTarefas, descricaoTarefa, dataInicio, dataFim, statusT)values("teste", "teste", "2024-03-01", null, "a fazer");
 select * from tarefas;
 insert into tarefasUsuario(
 tarefasId, usuarioId)values
 (2,3),
 (3,3);
 select * from tarefasUsuario;
 select tarefas.tituloTarefas, tarefas.descricaoTarefa, tarefas.dataInicio, tarefas.dataFim, tarefas.statusT, usuario.nomeUsuario, usuario.emailUsuarios, usuario.senhaUsuario from tarefasUsuario inner join tarefas on tarefasUsuario.tarefasId = tarefas.idTarefas inner join usuario on tarefasUsuario.usuarioId = usuario.idUsuario;
 select tarefas.tituloTarefas, tarefas.descricaoTarefa, tarefas.dataInicio, tarefas.dataFim, tarefas.statusT from tarefasUsuario inner join tarefas on tarefasUsuario.tarefasId=tarefas.idTarefas inner join usuario on tarefasUsuario.usuarioId=usuario.idUsuario where usuario.idUsuario= 3;
 delete from tarefasUsuario where idTarefasUsuario = 8;