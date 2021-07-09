<?php

namespace App\Core;

class Controller {
    
    public function model($model){
        require_once "../App/Models/".$model.".php";
        return new $model;
    }
}