<?php
session_start();

use App\Core\Controller;

class Saidas extends Controller {
    
    public function retornaDataHora() {
        date_default_timezone_set("America/Sao_Paulo");
        $data_Hora = new DateTime();
        $dataAtual = $data_Hora->format('Y-m-d');
        $horaAtual = $data_Hora->format('H:i');
        return array($dataAtual, $horaAtual);
    }

    public function calcularPreco($id) {

        date_default_timezone_set("America/Sao_Paulo");

        $clienteSaida = $this->model("Saida");
        $data_Hora_Entrada = $clienteSaida->getDataHoraDeEntrada($id);

        $precoModel = $this->model("Preco");
        $dadosPreco = $precoModel->listarTodos();

        $horaEntrada = new DateTime($data_Hora_Entrada[0]->horaEntrada);
        $horaSaida = new DateTime($this->retornaDataHora()[1]);

        $dataEntrada = new DateTime($data_Hora_Entrada[0]->dataEntrada);
        $dataSaida = new DateTime($this->retornaDataHora()[0]);

        $qtdHorasEstacionado = $horaSaida->diff($horaEntrada);
        $qtdDiasEstacionado = $dataSaida->diff($dataEntrada);

        if ($qtdDiasEstacionado->d == 0) {

            $valorPagar = ($dadosPreco[0]->demaisHoras * $qtdHorasEstacionado->h + $dadosPreco[0]->umaHora);

        } else {
            $valorPagar = ($dadosPreco[0]->demaisHoras * $qtdDiasEstacionado->d * 24) + $dadosPreco[0]->umaHora;
        }

        return $valorPagar;
    }
    
    public function update($id) {

        $clienteModel = $this->model("Saida");
    
        if (!$clienteModel) {
            http_response_code(404);
            echo json_encode(["erro" => "Cliente não encontrado"]);
            exit();
        }

        $clienteModel->id = $id;
        $clienteModel->valorPago = $this->calcularPreco($id);

        if ($clienteModel->saidaCliente()) {
            http_response_code(204);
        } else {
            http_response_code(500);
            echo json_encode(["erro" => "Problemas ao atualizar o cliente"]);
        }
    }
}
