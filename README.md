# Sistema FastParking API REST PHP
 
 
## Tarefas para criar a API REST

- [x] Analisar a aplicação já criada anteriormente e extrair os parâmetros para criação do back-end:
- [x] Quais recursos criar (rotas/end-points), estruturar no POSTMAN.
- [x] Quais Controllers e Models criar.
- [x] Estruturar as informações que trafegarão em cada recurso.
- [x] Implementar os Controllers e Models.
- [X] Configurar o CORS.
- [X] Criar um repositório no GITHUB para o back-end. 
- [ ] Publicar o projeto back-end no https://br.000webhost.com/


## Recursos Rotas / End-points
**Rotas / End-Points** | **Método de requisição**    |**Função da rota**
-----------            |-------------                |---------  
/clientes              | POST                        |Inserção de novos clientes
/clientes              | GET                         |Listar os clientes
/clientes:id           | GET                         |Pegar o cliente pelo id
/clientes:id           | PUT                         |Atualizar o cliente pelo id
/clientes:id           | DELETE                      |Deletar o cliente
/precos                | POST                        |Inserção dos preços
/precos                | GET                         |Listar os preços
/precos                | PUT                         |Atualizar os preços

## Informações que trafegarão em cada recurso
``` bash
 /clientes
    {
      "idCliente: 1"
      "nome": "Ciclano",
      "placa": "WSA-8574",
      "dataEntrada": "2021-06-26",
      "dataSaida: "2021-06-26""
      "horaEntrada": "14:32:00",
      "horaSaida": "17:15:00",
      "status": 1,
      "valorPago"
   }
```

``` bash
 /precos
  {
    "umaHora": "15.00",
    "demaisHoras": "5.50"
  }
```

## Controllers e Models
**Título**          | Controllers e Models             
--------------------|-                                           
Controllers          | Clientes e Precos                           
Models               | Cliente e Preco                            

