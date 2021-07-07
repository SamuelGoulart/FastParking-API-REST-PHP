<?php
session_start();

use App\Core\Controller;

class Relatorios extends Controller
{
    public function index()
    {

        $relatorioModel = $this->model("Relatorio");
        
        $dataI = filter_input(INPUT_GET, 'dataInicio', FILTER_SANITIZE_STRING);
        $dataF = filter_input(INPUT_GET, 'dataFinal', FILTER_SANITIZE_STRING);
        $relatorioModel->dataInicio = $dataI;
        $relatorioModel->dataFinal =  $dataF;

        $dados = $relatorioModel->intervaloDeDatas();
        

        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }

    public function find()
    {
        $relatorioModel = $this->model("Relatorio");


    
        if ($relatorioModel->intervaloDeDatas()) {

            // echo json_encode($relatorioModel, JSON_UNESCAPED_UNICODE);

        } else {
            http_response_code(404);

            $erro = ["erro" => "Nenhum cliente encontrada na data especificada!"];

            echo json_encode($erro, JSON_UNESCAPED_UNICODE);
        }
    }
}
