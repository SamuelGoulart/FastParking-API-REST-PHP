<?php

use App\Core\Model;

class Vaga {

    public $numeroTotalVagas;
    public $numeroVagasDisponivel;

    public function listarTodos() {
        $sql = " SELECT * FROM tblVagas ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $resultado = $stmt->fetchAll(\PDO::FETCH_OBJ);

            return $resultado;
        } else {
            return [];
        }
    }

    public function inserir() {
        $sql = " INSERT INTO tblVagas (numeroTotalVagas, numeroVagasDisponivel) VALUES  (?, ?)  ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->numeroTotalVagas);
        $stmt->bindValue(2, $this->numeroTotalVagas);
        if ($stmt->execute()) {
            $this->id = Model::getConn()->lastInsertId();
            return $this;
        } else {
            return false;
        }
    }

    public function atualizar() {

        if (empty($this->numeroTotalVagas)) {

            $sql = " UPDATE tblVagas SET numeroVagasDisponivel = ? WHERE idVaga = ? ";
            $stmt = Model::getConn()->prepare($sql);
            $stmt->bindValue(1, $this->numeroVagasDisponivel);
            $stmt->bindValue(2, 1);

        }else{
            
            $sql = " UPDATE tblVagas SET numeroTotalVagas = ? WHERE idVaga = ? ";
            $stmt = Model::getConn()->prepare($sql);
            $stmt->bindValue(1, $this->numeroTotalVagas);
            $stmt->bindValue(2, 1);

        }

        return $stmt->execute();

    }
}