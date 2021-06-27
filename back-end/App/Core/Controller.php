<?php

namespace App\Core;

class Controller {

    //recebe o model que vai ser utilizado pelo controller
    //instância e retorna a instância pronta para o uso
    public function model($model){
        require_once "../App/Models/".$model.".php";
        return new $model;
    }

    //recebe a view que vai ser renderizado e passa para o template
    //passa também os dados para a view
    public function view($view, $data = []){
        require_once "../App/Views/template.php";
    }

}