<?php
session_start();

use App\Core\Controller;

class Saidas extends Controller
{

    public function calculaPreco($id) {

        $clienteSaida = $this->model("Saida");
        $dados = $clienteSaida->getDadosValorApagar($id);

        $entrada = new DateTime('09:00');
        $saida = new DateTime('18:00');
        $intervalo = $saida->diff($entrada);

        $precoModel = $this->model("Preco");
        $dadosPreco = $precoModel->listarTodos();

        $totalDias = $dados[0]->totalDiasEstacionado;
        $totalHoras = $dados[0]->totalHorasEstacionado;

        $precoUmaHora = $dadosPreco[0]->umaHora;
        $precoDemaisHoras = $dadosPreco[0]->demaisHoras;

        if ($totalDias < 0) {
            $valorPagar = ($precoDemaisHoras * (idate('H', strtotime($totalHoras))) + $precoUmaHora);
        } else {
            $valorPagar = ($precoDemaisHoras * $totalDias * 24) + $precoUmaHora;
        }

        return $valorPagar;
    }

    public function update($id)
    {

        $json = file_get_contents("php://input");

        $clienteModel = $this->model("Saida");

        if (!$clienteModel) {
            http_response_code(404);
            echo json_encode(["erro" => "Cliente não encontrado"]);
            exit();
        }

        $clienteModel->id = $id;
        $clienteModel->valorPago = $this->calculaPreco($id);


        if ($clienteModel->saidaCliente()) {
            http_response_code(204);
        } else {
            http_response_code(500);
            echo json_encode(["erro" => "Problemas ao atualizar o cliente"]);
        }
    }
}
