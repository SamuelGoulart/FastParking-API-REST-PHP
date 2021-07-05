<?php
session_start();

use App\Core\Controller;

class Relatorios extends Controller
{
    public function index()
    {
        $relatorioModel = $this->model("Relatorio");
        $dados = $relatorioModel->intervaloDeDatas();

        echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    }

    public function find(){
        
        $datas = filter_input(INPUT_GET, 'dataInicio', FILTER_SANITIZE_STRING);

        $relatorioModel = $this->model("Relatorio");
        $relatorioModel->dataInicio = $datas;
        // $relatorioModel->dataFinal = $relatorioDatas->dataFinal;

        if ($relatorioModel->intervaloDeDatas()) {

        } else {
        http_response_code(404);

        $erro = ["erro" => "Nenhum cliente encontrada na data especificada!"];

        echo json_encode($erro, JSON_UNESCAPED_UNICODE);
        }
    }
}
