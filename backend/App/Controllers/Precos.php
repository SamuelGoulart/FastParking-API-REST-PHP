<?php
session_start();

use App\Core\Controller;

class Precos extends Controller {

    public function index() {
        $precoModel = $this->model("Preco");
        $dados = $precoModel->listarTodos();
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }

    function validarCampos($precos) {
        $erros = [];

        if (!isset($precos->umaHora) || $precos->umaHora == "") {
            http_response_code(400);
            $erros[] = json_encode(["erro" => "O campo de preço de uma hora é obrigatório"]);
        }

        if (!isset($precos->demaisHoras) || $precos->demaisHoras == "") {
            http_response_code(400);
            $erros[] = json_encode(["erro" => "O campo de preço das demais horas é obrigatório"]);
        }
        return $erros;
    }

    public function store(){
        $json = file_get_contents("php://input");
        $inserirPrecos = json_decode($json);

        $erros = $this->validarCampos($inserirPrecos);
        
        if (count($erros) > 0) {
            foreach($erros as $erro){
                echo $erro;
            }
            exit();
        }

        $precoModel = $this->model("Preco");
        $precoModel->umaHora = $inserirPrecos->umaHora;
        $precoModel->demaisHoras = $inserirPrecos->demaisHoras;

        if($precoModel->inserir()){
            http_response_code(201);

            echo json_encode($precoModel);

        }else{
            http_response_code(500);

            echo json_encode(["erro" => "Problemas ao inserir os preços"]);
        }
    }

    public function update($id){

        $json = file_get_contents("php://input");
        $precoEditar = json_decode($json);

        $erros = $this->validarCampos($precoEditar);
        
        if (count($erros) > 0) {
            foreach($erros as $erro){
                echo $erro;
            }
            exit();
        }

        $precoModel = $this->model("Preco");

        if(!$precoModel){
            http_response_code(404);
            echo json_encode(["erro" => "Preço não encontrado"]);
            exit;
        }
            
        $precoModel->id = $id;
        $precoModel->umaHora = $precoEditar->umaHora;
        $precoModel->demaisHoras = $precoEditar->demaisHoras;
           
        if($precoModel->atualizar()){
            http_response_code(204);

        }else{
            http_response_code(500);
            echo json_encode(["erro" => "Problemas ao atualizar os preços."]);
        }
    }


}