<?php

use App\Core\Model;

class Relatorio
{
    public $dataInicio;
    // public $dataFinal;

    public function intervaloDeDatas()
    {
        $sql = " SELECT * FROM tblClientes WHERE dataSaida = '2021-07-06' ";
        $stmt = Model::getConn()->prepare($sql);
        // $stmt->bindValue(1, $this->dataInicio);
        // $stmt->bindValue(2, $this->dataFinal);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $resultado = $stmt->fetchAll(\PDO::FETCH_OBJ);
            return $resultado;
        } else {
            return [];
        }
    }
}
