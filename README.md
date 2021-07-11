# Sistema FastParking API REST PHP
 
 
## Tarefas para criar a API REST

- [x] Analisar a aplicação já criada anteriormente e extrair os parâmetros para criação do back-end:
- [x] Quais recursos criar (rotas/end-points), estruturar no POSTMAN.
- [x] Quais Controllers e Models criar.
- [x] Estruturar as informações que trafegarão em cada recurso.
- [x] Implementar os Controllers e Models.
- [X] Configurar o CORS.
- [X] Criar um repositório no GITHUB para o back-end. 
- [X] Publicar o projeto back-end no https://br.000webhost.com/


## Rotas / End-points
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
/relatorios?dataInicio=aaaa-mm-dd<br>&dataFinal=aaa-mm-dd  | GET    |Busca de clientes por intervalo de datas
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

