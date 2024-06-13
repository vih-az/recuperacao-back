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