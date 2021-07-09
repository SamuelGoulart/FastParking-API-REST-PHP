<?php
session_start();

use App\Core\Controller;

class Vagas extends Controller {

    public function index() {
        $vagaModel = $this->model("Vaga");
        $dados = $vagaModel->listarTodos();
        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }

    public function store(){
        $json = file_get_contents("php://input");
        $inserirVagas = json_decode($json);

        $vagaModel = $this->model("Vaga");
        $vagaModel->numeroTotalVagas = $inserirVagas->numeroTotalVagas;

        if($vagaModel->inserir()){
            http_response_code(201);

            echo json_encode($vagaModel);

        }else{
            http_response_code(500);

            echo json_encode(["erro" => "Problemas ao inserir as numero de vagas"]);
        }
    }

    public function update($id){

        $json = file_get_contents("php://input");

        $vagaEditar = json_decode($json);

        $vagaModel = $this->model("Vaga");

        if(!$vagaModel){
            http_response_code(404);
            echo json_encode(["erro" => "Vaga não encontrado"]);
            exit;
        }
            
        $vagaModel->id = $id;
        $vagaModel->numeroVagasDisponivel = $vagaEditar->numeroVagasDisponivel;
           
        if($vagaModel->atualizar()){
            http_response_code(204);

        }else{
            http_response_code(500);
            echo json_encode(["erro" => "Problemas ao atualizar o número de vagas."]);
        }
    }


}