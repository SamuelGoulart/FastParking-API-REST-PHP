<?php
session_start();

use App\Core\Controller;

class Clientes extends Controller
{

    public function index()
    {
        $clienteModel = $this->model("Cliente");
        $dados = $clienteModel->listarTodos();

        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }

    public function find($id)
    {
        $clienteModel = $this->model("Cliente");
        $clienteModel = $clienteModel->buscarPorId($id);

        if ($clienteModel) {

        } else {
            http_response_code(404);

            $erro = ["erro" => "Cliente não encontrado"];

            echo json_encode($erro, JSON_UNESCAPED_UNICODE);
        }
    }

    public function store()
    {
        $json = file_get_contents("php://input");

        $novoCliente = json_decode($json);

        $clienteModel = $this->model("Cliente");
        $clienteModel->nome = $novoCliente->nome;
        $clienteModel->placa = $novoCliente->placa;

        $clienteModel = $clienteModel->inserir();
        if ($clienteModel) {
            http_response_code(201);
            echo json_encode($clienteModel);
        } else {
            http_response_code(500);
            echo json_encode(["erro" => "Problemas ao inserir cliente"]);
        }
    }

    public function delete($id)
    {
        $clienteModel = $this->model("Cliente");

        $clienteModel = $clienteModel->buscarPorId($id);

        if (!$clienteModel) {
            http_response_code(404);
            echo json_encode(["erro" => "Cliente não encontrado"]);
            exit;
        }

        if ($clienteModel->deletar()) {
            http_response_code(204);
        } else {
            http_response_code(500);
            echo json_encode(["erro" => "Problemas ao excluir esse cliente"]);
        }
    }

    public function calculaPreco($id)
    {

        $clienteSaida = $this->model("Cliente");
        $dados = $clienteSaida->getDadosValorApagar($id);

        $precoModel = $this->model("Preco");
        $dadosPreco = $precoModel->listarTodos();

        $totalDias = $dados[0]->totalDiasEstacionado;
        $totalHoras = $dados[0]->totalHorasEstacionado;

        $precoUmaHora = $dadosPreco[0]->umaHora;
        $precoDemaisHoras = $dadosPreco[0]->demaisHoras;

        if ($totalDias == 0) {
            if (strtotime($totalHoras)  <= strtotime("1:00:00")) {
                $valorPagar = $precoUmaHora;
            } else {
                $valorPagar = $precoDemaisHoras * (idate('H', strtotime($totalHoras))) + $precoUmaHora;
            }
        }

        return $valorPagar;
    }

    public function update($id)
    {
        $json = file_get_contents("php://input");

        $clienteEditar = json_decode($json);

        $clienteModel = $this->model("Cliente");

        if (!$clienteModel) {
            http_response_code(404);
            echo json_encode(["erro" => "Cliente não encontrado"]);
            exit;
        }


        $clienteModel->id = $id;
        $clienteModel->nome = $clienteEditar->nome;
        $clienteModel->placa = $clienteEditar->placa;
        $clienteModel->valorPago = $this->calculaPreco($id);


        if ($clienteModel->atualizar()) {
            http_response_code(204);

        } else {
            http_response_code(500);
            echo json_encode(["erro" => "Problemas ao atualizar o cliente"]);
        }
    }


}
