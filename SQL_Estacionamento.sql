create database dbEstacionamento;

use dbEstacionamento;

create table tblPrecos(
     idPreco int auto_increment not null,
     umaHora decimal(10,2) not null,
     demaisHoras decimal(10,2) not null,
     
     unique key(idPreco),
     primary key(idPreco)
);

create table tblClientes(
   idCliente int auto_increment not null,
   nome varchar(45) not null,
   placa varchar(10) not null,
   dataEntrada date not null,
   dataSaida date,
   horaEntrada time not null,
   horaSaida time,
   motivoExclusao varchar(255),
   status tinyint,
   valorPago decimal(10,2),

   unique key(idCliente),
   primary key(idCliente)
);

create table tblVagas(
    idVaga int auto_increment not null,
    numeroTotalVagas int not null,
    numeroVagasDisponivel int not null,
    
     unique key(idVaga),
     primary key(idVaga)
);
