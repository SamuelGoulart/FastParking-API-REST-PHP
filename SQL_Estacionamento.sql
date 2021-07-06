drop database dbestacionamento;

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

UPDATE tblClientes SET motivoExclusao = 'Meu amigo', status = ''  where idCliente = 1;


UPDATE tblClientes SET dataSaida = '2021-06-30', horaSaida = '17:54', status = 1, valorPago = 25.50 WHERE idCliente = 2;
INSERT INTO tblClientes (nome, placa, dataEntrada, horaEntrada, status) 
				 VALUES ('Samuel', ucase('DsG-4871'), current_date(), curtime(),0);
select * from tblClientes;
select * from tblClientes order by idCliente desc;
select * from tblPrecos;

select horaEntrada, horaSaida, horaEntrada, horaSaida from tblClientes where idCliente = 2;
select * from tblPrecos;

select datediff('2021-05-28', '2021-06-29')*-1 as diferencaEntreDatas;

select * from tblClientes where dataSaida = '2021-07-04';

select timediff('15:05:04', '18:07:20') as difereca;

select concat('R$ ',((datediff('2021-05-28', '2021-06-29'))*20)*-1) as diferenca;


SELECT datediff(dataEntrada, curdate()) as totalDiasEstacionado, timediff(curtime(), horaEntrada) as totalHorasEstacionado from tblClientes WHERE idCliente = 25;

SELECT  datediff(dataEntrada, dataSaida) as subtracaoDatas,  timediff(horaSaida, horaEntrada) as subtracaoHoras from tblClientes WHERE idCliente = 2;

UPDATE tblClientes SET dataSaida = current_date(), horaSaida = curtime(), status = 1, valorPago = 10.50 WHERE idCliente = 9;

SELECT MONTH(DataEntrada) AS MesCadastro, YEAR(DataCadastro) AS AnoCadastro 

FROM tblClientes where dataSaida between '01.01.2013' and '31.01.2013' ;

SELECT * FROM tblClientes WHERE dataSaida BETWEEN '2021-06-01' AND '2021-07-04';
SELECT * FROM tbClientes WHERE dataSaida BETWEEN ? AND ? ;



