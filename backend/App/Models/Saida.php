<?php

use App\Core\Model;

class Saida {

    public $id;
    public $valorPago;

    public function retornaDataHora() {
        date_default_timezone_set("America/Sao_Paulo");
        $data_Hora = new DateTime();
        $dataAtual = $data_Hora->format('Y-m-d');
        $horaAtual = $data_Hora->format('H:i');
        return array($dataAtual, $horaAtual);
    }
    
    public function getDataHoraDeEntrada($id) {

        $sql = " SELECT dataEntrada, horaEntrada from tblClientes WHERE idCliente = ? ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $resultado = $stmt->fetchAll(\PDO::FETCH_OBJ);
            return $resultado;
        } else {
            return "Cliente não encontrado";
        }
    }

    public function saidaCliente() {
        
        $sql = " UPDATE tblClientes SET dataSaida = ?, horaSaida = ?, status = ?, valorPago = ? WHERE idCliente = ? ";
        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->retornaDataHora()[0]);
        $stmt->bindValue(2, $this->retornaDataHora()[1]);
        $stmt->bindValue(3, 1);
        $stmt->bindValue(4, $this->valorPago);
        $stmt->bindValue(5, $this->id);
        return $stmt->execute();
    }
}