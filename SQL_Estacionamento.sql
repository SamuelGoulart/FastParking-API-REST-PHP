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
   status tinyint not null,
   valorPago decimal(10,2),
   idPreco int not null,
   
	constraint FK_Precos_Clientes
    foreign key(idPreco)
    references tblPrecos (idPreco),
    
   unique key(idCliente),
   primary key(idCliente)
);

