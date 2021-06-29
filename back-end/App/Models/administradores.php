<?php

use App\Core\Model;

class Administradores {

    public $id;
    public $nome;
    public $senha;

    public function loginUsuario() {

        $sql = " SELECT * FROM tblUsuarios WHERE nome = ?, senha = ? ";
        $stmt = Model::getConn()->prepare($sql);
       

        if ($stmt->execute()) {
            $resultado = $stmt->fetchAll(\PDO::FETCH_OBJ);
            return $resultado;

        } else {
            $erros = "Usuário e/ou senha inválidos";
            return $erros;
        }
    }
}
