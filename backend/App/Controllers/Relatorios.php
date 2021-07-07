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

}
