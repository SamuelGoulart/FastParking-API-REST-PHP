<?php
session_start();

use App\Core\Controller;

class Clientes extends Controller {

    public function index() {

        $clienteModel = $this->model("Cliente");
        $dados = $clienteModel->listarTodos();
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }

    function validarCampos($cliente) {
        $erros = [];

        if (!isset($cliente->nome) || $cliente->nome == "") {
            http_response_code(400);
            $erros[] = json_encode(["erro" => "O campo nome é obrigatório"]);
        }

        if (!isset($cliente->placa) || $cliente->placa == "") {
            http_response_code(400);
            $erros[] = json_encode(["erro" => "O campo da placa é obrigatório"]);
        }
        return $erros;
    }

    public function store() {

        $json = file_get_contents("php://input");
        $novoCliente = json_decode($json);

        $erros = $this->validarCampos($novoCliente);

        if (count($erros) > 0) {
            foreach($erros as $erro){
                echo $erro;
            }
            exit();
        }

        $clienteModel = $this->model("Cliente");
        $clienteModel->nome = $novoCliente->nome;
        $clienteModel->placa = $novoCliente->placa;

        if ($clienteModel->inserir()) {
            http_response_code(201);
            echo json_encode($clienteModel);
        } else {
            http_response_code(500);
            echo json_encode(["erro" => "Problemas ao inserir cliente"]);
        }
    }

    public function update($id) {
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
        $clienteModel->motivoExclusao = $clienteEditar->motivoExclusao;

        if ($clienteModel->atualizar()) {
            http_response_code(204);

        } else {
            http_response_code(500);
            echo json_encode(["erro" => "Problemas ao atualizar o cliente"]);
        }
    }


}
