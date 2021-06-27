<?php

use App\Core\Model;

class Preco {

    public $id;
    public $umaHora;
    public $demaisHoras;

    public function listarTodos() {
        $sql = " SELECT * FROM tblPrecoEstacionamento ";

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

        $sql = " INSERT INTO tblPrecoEstacionamento (umaHora, demaisHoras) VALUES (?, ?) ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->umaHora);
        $stmt->bindValue(2, $this->demaisHoras);
        if ($stmt->execute()) {
            $this->id = Model::getConn()->lastInsertId();
            return $this;
        } else {
            return false;
        }
    }

    public function atualizar() {

        $sql = " UPDATE tblPrecoEstacionamento SET
                  umaHora = ?, demaisHoras = ? WHERE idPrecoEstacionamento = ? ";
        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->umaHora);
        $stmt->bindValue(2, $this->demaisHoras);
        $stmt->bindValue(3, $this->id);
        return $stmt->execute();
    }
}