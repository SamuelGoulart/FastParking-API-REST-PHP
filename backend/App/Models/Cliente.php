<?php

use App\Core\Model;

class Cliente {

    public $id;
    public $nome;
    public $placa;
    public $dataEntrada;
    public $dataSaida;
    public $horaEntrada;
    public $horaSaida;
    public $status;
    public $motivoExclusao;

    public function retornaDataHora() {
        date_default_timezone_set("America/Sao_Paulo");
        $data_Hora = new DateTime();
        $dataAtual = $data_Hora->format('Y-m-d');
        $horaAtual = $data_Hora->format('H:i');
        return array($dataAtual, $horaAtual);
    }

    public function listarTodos() {

        $sql = " SELECT * FROM tblClientes ";

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

        $sql = " INSERT INTO tblClientes 
                (nome, placa, dataEntrada, horaEntrada, status) 
                VALUES (?, ucase(?), ?, ?, ? ) ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->nome);
        $stmt->bindValue(2, $this->placa);
        $stmt->bindValue(3, $this->retornaDataHora()[0]);
        $stmt->bindValue(4, $this->retornaDataHora()[1]);
        $stmt->bindValue(5, 0);

        if ($stmt->execute()) {
            $this->id = Model::getConn()->lastInsertId();
            return $this;
        } else {
            return false;
        }
    }

    public function atualizar() {

        if (!empty($this->nome)) {
            $sql = " UPDATE tblClientes SET 
            nome = ?, placa = ? WHERE idCliente = ? ";
            $stmt = Model::getConn()->prepare($sql);
            $stmt->bindValue(1, $this->nome);
            $stmt->bindValue(2, $this->placa);
            $stmt->bindValue(3, $this->id);
        } else {

            $sql = " UPDATE tblClientes SET dataSaida = ? , horaSaida = ?, motivoExclusao = ?, status = 10 where idCliente = ? ";
            $stmt = Model::getConn()->prepare($sql);
            $stmt->bindValue(1, $this->retornaDataHora()[0]);
            $stmt->bindValue(2, $this->retornaDataHora()[1]);
            $stmt->bindValue(3, $this->motivoExclusao);
            $stmt->bindValue(4, $this->id);
        }

        return $stmt->execute();
    }
}
