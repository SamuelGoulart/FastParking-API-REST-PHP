<?php

use App\Core\Model;

class Relatorio {
    public $dataInicio;
    public $dataFinal;

    public function intervaloDeDatas() {

        if (!empty($this->dataFinal)) {

            $sql = " SELECT * FROM tblClientes WHERE dataSaida BETWEEN ? AND ? ";
            $stmt = Model::getConn()->prepare($sql);
            $stmt->bindValue(1, $this->dataInicio);
            $stmt->bindValue(2, $this->dataFinal);
            $stmt->execute();
        

        } else {
            
            $sql = " SELECT * FROM tblClientes where dataSaida = ? ";
            $stmt = Model::getConn()->prepare($sql);
            $stmt->bindValue(1, $this->dataInicio);
            $stmt->execute();

        }

        if ($stmt->rowCount() > 0) {
            $resultado = $stmt->fetchAll(\PDO::FETCH_OBJ);
            return $resultado;
        } else {
            return [];
        }
    }
}
