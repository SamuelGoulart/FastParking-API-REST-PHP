# Sistema FastParking API REST PHP + <br> Consumo com JavaScript
 
 <h2>📕 Indice</h2>

<ul>
  <li>Tecnologias</li>
  <li>Sobre o projeto</li>
  <li>Clone do projeto</li>
  <li>Tarefas para criação da API</li>
  <li>Rotas / End-points / Método de requisição / Função da rota</li>

</ul>

## 🧪 Tecnologias utilizadas
<ul>
  <li>HTML - CSS</li>
  <li>JavaScript Puro</li>
  <li>PHP - PDO - MVC - API REST</li>
   <li>Sem utilização de Framework</li>
</ul>

## 💻 Projeto

O Sistema FastParking, faz o controle rotativo, impressão de recibo de entrada e saída, tem relatório entre intervalo de datas é relatório do dia, sendo possível saber o faturamento entre o intervalo de datas é do dia em questão.  

Projeto desenvolvido durante o curso de técnico em desenvolvimento de sistemas na SENAI <br>
Em integração entre as matérias de Programação web Front-end (PWFE) é Programação web Back-end (PWBE)

## 🚀 Clone do projeto.

```bash
git clone https://github.com/SamuelGoulart/FastParking-API-REST-PHP
```

### 💾 Criação do Banco de Dados
O arquivo para criar a estrutura do banco é o SQL_estacionamento.sql<br>
Também está em backend/App/Models/database/SQL_estacionamento.sql

O arquivo para configuração da conexão com o banco de dados está em:<br>
backend\App\Core\Model.php

Caso queira configuar o vhosts é o hosts, assim não será preciso motivar a url nos arquivos de javaScript<br>
Acesse C:/xampp/apache/conf/extra/httpd-vhosts.conf <br>
Copie e cole na últimas linhas dentro do httpd-vhosts.conf
```bash
<VirtualHost *:80>
    ServerAdmin sgoulart@api.fastParking.com.br
    DocumentRoot "C:\xampp\htdocs\FastParking-API-REST-PHP\backend"
    ServerName api.fastparking.com.br
    ErrorLog "logs/api.fastParking.com.br.log"
    CustomLog "logs/api.fastParking.com.br-access.log" common
</VirtualHost>
```

Acesse C:/Windows/System32/drivers/etc/hosts <br>
Copie e cole na últimas linhas dentro do hosts
```bash
127.0.0.1  api.fastParking.com.br
```
É preciso reiniciar o xampp, para funcionar!

## Tarefas para criar a API REST

- [x] Analisar a aplicação já criada anteriormente e extrair os parâmetros para criação do back-end:
- [x] Quais recursos criar (rotas/end-points), estruturar no POSTMAN.
- [x] Quais Controllers e Models criar.
- [x] Estruturar as informações que trafegarão em cada recurso.
- [x] Implementar os Controllers e Models.
- [X] Configurar o CORS.
- [X] Criar um repositório no GITHUB para o back-end. 
- [X] Publicar o projeto back-end no https://br.000webhost.com/


## Rotas / End-points / Método de requisição / Função da rota
**Rotas**              | **Método de requisição**    |**Função da rota**
-----------            |-------------                |---------  
/clientes              | POST                        |Inserção de novos clientes
/clientes              | GET                         |Listar os clientes
/clientes:id           | PUT                         |Atualizar o cliente pelo id
/precos                | POST                        |Inserção dos preços
/precos                | GET                         |Listar os preços
/precos                | PUT                         |Atualizar os preços
/saidas:id             | PUT                         |Gera a saída pelo id
/relatorios?dataInicio=aaaa-mm-dd  | GET             |Busca de clientes por uma data específica
/relatorios?dataInicio=aaaa-mm-dd&dataFinal=aaa-mm-dd  | GET    |Busca de clientes por intervalo de datas
/vagas                 | POST                        |Inserção do número total de vagas do estacionamento
/vagas                 | GET                         |Listar o número total de vagas do estacionamento
/vagas                 | PUT                         |Atualizar o número total de vagas do estacionamento




## Informações que trafegarão em cada recurso
``` bash
 /clientes
    {
      "idCliente: 1"
      "nome": "Ciclano",
      "placa": "WSA-8574",
      "dataEntrada": "2021-06-26",
      "dataSaida": "2021-06-26",
      "horaEntrada": "14:32:00",
      "horaSaida": "17:15:00",
      "status": 1,
      "valorPago: 10.00"
   }
```

``` bash
 /precos
  {
    "umaHora": "15.00",
    "demaisHoras": "5.50"
  }
  
```
``` bash
  /saida:id
```

## Controllers e Models
**Título**          | Controllers e Models             
--------------------|-                                           
Controllers          | Clientes, Precos, saidas, relatorios e vagas                           
Models               | Cliente, Preco, saida, relatorio e vaga                            

