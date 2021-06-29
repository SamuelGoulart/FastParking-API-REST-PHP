<?php

require("../vendor/autoload.php");

$app = new \App\Core\Router();

header('Access-Control-Allow-Origin: http://127.0.0.1:5500');

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type");
header('content-Type: application/json');

