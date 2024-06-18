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
