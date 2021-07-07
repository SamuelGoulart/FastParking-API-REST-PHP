<?php

use App\Core\Model;

class Saida  {
    public $id;
    public $valorPago;
    
    public function atualizar(){
            $sql = " UPDATE tblClientes SET dataSaida = current_date(), horaSaida = curtime(), status = 1, valorPago = ? WHERE idCliente = ? ";
            $stmt = Model::getConn()->prepare($sql);
            $stmt->bindValue(1, $this->valorPago);
            $stmt->bindValue(2, $this->id);
            $stmt->execute();
    }
}