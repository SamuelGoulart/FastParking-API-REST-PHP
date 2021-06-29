<?php

session_start();

use App\Core\Controller;

class Auth {
    
    public static function login() {
        $json = file_get_contents("php://input");

        $loginUsuario = json_decode($json);

     
    }

    public static function logout(){

    }

    public static function estaAutenticado(){

        return true;
    }
}